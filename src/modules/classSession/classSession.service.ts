import { PrismaClient, DayOfWeek, SessionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const findAll = async () => {
  return prisma.sessionClass.findMany({
    include: {
      schedule: {
        include: {
          teacherAssignment: {
            include: {
              teacher: true,
              subject: true,
              group: true,
            },
          },
        },
      },
      assistances: true,
    },
    orderBy: [
      { date: 'desc' },
    ],
  });
};

export const findById = async (id: number) => {
  return prisma.sessionClass.findUnique({
    where: { id },
    include: {
      schedule: {
        include: {
          teacherAssignment: {
            include: {
              teacher: true,
              subject: true,
              group: true,
            },
          },
        },
      },
      assistances: {
        include: {
          studentEnrollment: {
            include: {
              student: true,
            },
          },
        },
      },
    },
  });
};

export const findBySchedule = async (idSchedule: number) => {
  return prisma.sessionClass.findMany({
    where: { idSchedule },
    include: {
      schedule: true,
      assistances: true,
    },
    orderBy: [
      { date: 'desc' },
    ],
  });
};


export const findOrCreateActiveSession = async (
  idTeacherAssignment: number,
  weekDay: number,
  horaActual: string,
  fechaHoy: Date
) => {
  const schedule = await prisma.weekSchedule.findFirst({
    where: {
      idTeacherAssignment,
      weekDay,
      startTime: { lte: horaActual },
      finishTime: { gte: horaActual },
    },
  });

  if (!schedule) throw new Error('No hay clase activa en este momento');

  const startOfDay = new Date(fechaHoy);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(fechaHoy);
  endOfDay.setHours(23, 59, 59, 999);

  const existing = await prisma.sessionClass.findFirst({
    where: {
      idSchedule: schedule.id,
      date: { gte: startOfDay, lte: endOfDay },
    },
  });

  if (existing) return existing;

  return prisma.sessionClass.create({
    data: {
      idSchedule: schedule.id,
      date: fechaHoy,
      status: 'PROGRAMADA',
    }
    //rama de ángela
    //data: { idSchedule: schedule.id, date: fechaHoy, status: 'SCHEDULED' },
  });
};

export const create = async (data: {
  idSchedule: number;
  date: string; // "2024-09-01"
  status?: string;
  apointments?: string;
}) => {
  // Verificar que el schedule existe
  const scheduleExists = await prisma.weekSchedule.findUnique({
    where: { id: data.idSchedule },
  });

  if (!scheduleExists) {
    throw new Error('El horario no existe');
  }

  return prisma.sessionClass.create({
    data: {
      idSchedule: data.idSchedule,
      date: new Date(data.date),
      status: (data.status as SessionStatus) || 'SCHEDULED',
      apointments: data.apointments || null,
    },
    include: {
      schedule: {
        include: {
          teacherAssignment: {
            include: {
              teacher: true,
              subject: true,
              group: true,
            },
          },
        },
      },
    },
  });
};

export const update = async (
  id: number,
  data: {
    date?: string;
    status?: string;
    apointments?: string;
  }
) => {
  const exists = await prisma.sessionClass.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Sesión no encontrada');
  }

  return prisma.sessionClass.update({
    where: { id },
    data: {
      ...(data.date && { date: new Date(data.date) }),
      ...(data.status && { status: data.status as SessionStatus }),
      ...(data.apointments !== undefined && { apointments: data.apointments }),
    },
    include: {
      schedule: true,
      assistances: true,
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.sessionClass.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Sesión no encontrada');
  }

  return prisma.sessionClass.delete({
    where: { id },
  });
};

export const findOrCreateSessionForSubjectAndTeacher = async (
  idSubject: number,
  idTeacher: number
) => {
  const assignment = await prisma.teacherOnSubjectOnGroup.findFirst({
    where: { idSubject, idTeacher },
    include: {
      WeekSchedule: { take: 1 },
    },
  });

  if (!assignment) {
    throw new Error('No se encontró una asignación para ese profesor y asignatura');
  }

  let schedule = assignment.WeekSchedule[0];

  // Si el profesor no tiene horario configurado, creamos uno genérico
  // para poder registrar la asistencia sin depender del horario semanal
  if (!schedule) {
    schedule = await prisma.weekSchedule.create({
      data: {
        idTeacherAssignment: assignment.id,
        weekDay: 'MONDAY',
        startTime: '00:00',
        finishTime: '23:59',
      },
    });
  }

  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const existing = await prisma.sessionClass.findFirst({
    where: { idSchedule: schedule.id, date: todayDate },
  });

  if (existing) return existing;

  return prisma.sessionClass.create({
    data: {
      idSchedule: schedule.id,
      date: todayDate,
      status: 'SCHEDULED',
    },
  });
};
import { PrismaClient } from '@prisma/client';

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


export const findOrCreateActiveSession = async (idTeacherAssignment: number) => {
  /*
  const now = new Date();
  const weekDay = now.getDay() === 0 ? 7 : now.getDay();
  const horaActual = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const fechaHoy = new Date(now.getFullYear(), now.getMonth(), now.getDate());
*/

const weekDay = 1; // Lunes
const horaActual = '11:00';
const fechaHoy = new Date('2025-09-22'); // Un lunes cualquiera

  const schedule = await prisma.weekSchedule.findFirst({
    where: {
      idTeacherAssignment,
      weekDay,
      startTime: { lte: horaActual },
      finishTime: { gte: horaActual },
    },
  });

  if (!schedule) throw new Error('No hay clase activa en este momento');

  const existing = await prisma.sessionClass.findFirst({
    where: { idSchedule: schedule.id, date: fechaHoy },
  });

  if (existing) return existing;

  return prisma.sessionClass.create({
    data: { idSchedule: schedule.id, date: fechaHoy, status: 'PROGRAMADA' },
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
      status: data.status || 'PROGRAMADA',
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
      ...(data.status && { status: data.status }),
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
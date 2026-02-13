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
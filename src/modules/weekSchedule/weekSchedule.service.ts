import prisma from '../../config/prisma.js';
import { DayOfWeek } from '@prisma/client';

const VALID_DAYS = new Set<string>(Object.values(DayOfWeek));

export const findAll = async () => {
  return prisma.weekSchedule.findMany({
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' },
    ],
  });
};

export const findById = async (id: number) => {
  return prisma.weekSchedule.findUnique({
    where: { id },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
      sessions: {
        include: {
          assistances: true,
        },
      },
    },
  });
};

export const findByTeacherAssignment = async (idTeacherAssignment: number) => {
  return prisma.weekSchedule.findMany({
    where: { idTeacherAssignment },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' },
    ],
  });
};

export const findByTeacherId = async(idTeacher: number) => {
  return prisma.weekSchedule.findMany({
    where: { 
      teacherAssignment: {
        idTeacher
      }
     },
    include: {
      teacherAssignment:{
        include: {
          teacher: {
            select: {
              id: true
            }
          },
          subject: true,
          group: true
        }
      }
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' }
    ]

  });
};
export const findByWeekDay = async (weekDay: DayOfWeek) => {
  return prisma.weekSchedule.findMany({
    where: { weekDay },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: { startTime: 'asc' },
  });
};


export const findByStudentId = async (idStudent: number) => {
  return prisma.weekSchedule.findMany({
    where: {
      teacherAssignment: {
        subject: {
          studentEnrollments: {
            some: {
              idStudent: idStudent
            }
          }
        },
        group: {
          studentEnrollments: {
            some: {
              idStudent: idStudent
            }
          }
        }
      }
    },
    include: {
      teacherAssignment: {
        include: {
          subject: true,
          group: true
        }
      }
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' }
    ]
  });
};

export const create = async (data: {
  idTeacherAssignment: number;
  weekDay: string;
  startTime: string;
  finishTime: string;
}) => {
  if (!VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  const assignmentExists = await prisma.teacherOnSubjectOnGroup.findUnique({
    where: { id: data.idTeacherAssignment },
  });

  if (!assignmentExists) {
    throw new Error('La asignación de profesor no existe');
  }

  return prisma.weekSchedule.create({
    data: {
      idTeacherAssignment: data.idTeacherAssignment,
      weekDay: data.weekDay as DayOfWeek,
      startTime: data.startTime,
      finishTime: data.finishTime,
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};




export const update = async (
  id: number,
  data: {
    idTeacherAssignment?: number;
    weekDay?: string;
    startTime?: string;
    finishTime?: string;
  }
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.weekDay && !VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.weekDay && { weekDay: data.weekDay as DayOfWeek }),
      ...(data.startTime && { startTime: data.startTime }),
      ...(data.finishTime && { finishTime: data.finishTime }),
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};

export const patch = async (
  id: number,
  data: Partial<{
    idTeacherAssignment: number;
    weekDay: string;
    startTime: string;
    finishTime: string;
  }>
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.weekDay && !VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.weekDay && { weekDay: data.weekDay as DayOfWeek }),
      ...(data.startTime && { startTime: data.startTime }),
      ...(data.finishTime && { finishTime: data.finishTime }),
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  return prisma.weekSchedule.delete({
    where: { id },
  });
};
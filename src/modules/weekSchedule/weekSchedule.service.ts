import prisma from '../../config/prisma.js';
import { DayOfWeek } from '@prisma/client';

// Convertir de número (1-7) al Enum DayOfWeek para Prisma
const mapNumberToDayOfWeek = (day: number): DayOfWeek => {
  const map: Record<number, DayOfWeek> = {
    1: DayOfWeek.MONDAY,
    2: DayOfWeek.TUESDAY,
    3: DayOfWeek.WEDNESDAY,
    4: DayOfWeek.THURSDAY,
    5: DayOfWeek.FRIDAY,
    6: DayOfWeek.SATURDAY,
    7: DayOfWeek.SUNDAY,
  };
  return map[day] || DayOfWeek.MONDAY;
};

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
export const findByDiaSemana = async (diaSemana: number) => {
  return prisma.weekSchedule.findMany({
    where: { weekDay: mapNumberToDayOfWeek(diaSemana) },
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
  weekDay: number;
  startTime: string;
  finishTime: string;
}) => {
  // Validar que weekDay esté entre 1 y 7
  if (data.weekDay < 1 || data.weekDay > 7) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  // Verificar que la asignación de profesor existe
  const assignmentExists = await prisma.teacherOnSubjectOnGroup.findUnique({
    where: { id: data.idTeacherAssignment },
  });

  if (!assignmentExists) {
    throw new Error('La asignación de profesor no existe');
  }

  return prisma.weekSchedule.create({
    data: {
      idTeacherAssignment: data.idTeacherAssignment,
      weekDay: mapNumberToDayOfWeek(data.weekDay),
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
    diaSemana?: number;
    horaInicio?: string;
    horaFin?: string;
  }
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.diaSemana && (data.diaSemana < 1 || data.diaSemana > 7)) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.diaSemana && { weekDay: mapNumberToDayOfWeek(data.diaSemana) }),
      ...(data.horaInicio && { startTime: data.horaInicio }),
      ...(data.horaFin && { finishTime: data.horaFin }),
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
    diaSemana: number;
    horaInicio: string;
    horaFin: string;
  }>
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.diaSemana && (data.diaSemana < 1 || data.diaSemana > 7)) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.diaSemana && { weekDay: mapNumberToDayOfWeek(data.diaSemana) }),
      ...(data.horaInicio && { startTime: data.horaInicio }),
      ...(data.horaFin && { finishTime: data.horaFin }),
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
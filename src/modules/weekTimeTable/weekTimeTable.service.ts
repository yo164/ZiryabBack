import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return prisma.horarioSemanal.findMany({
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
      { diaSemana: 'asc' },
      { horaInicio: 'asc' },
    ],
  });
};

export const findById = async (id: number) => {
  return prisma.horarioSemanal.findUnique({
    where: { id },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
      sesiones: {
        include: {
          asistencias: true,
        },
      },
    },
  });
};

export const findByTeacherAssignment = async (idTeacherAssignment: number) => {
  return prisma.horarioSemanal.findMany({
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
      { diaSemana: 'asc' },
      { horaInicio: 'asc' },
    ],
  });
};

export const findByDiaSemana = async (diaSemana: number) => {
  return prisma.horarioSemanal.findMany({
    where: { diaSemana },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: { horaInicio: 'asc' },
  });
};

export const create = async (data: {
  idTeacherAssignment: number;
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}) => {
  // Validar que diaSemana esté entre 1 y 7
  if (data.diaSemana < 1 || data.diaSemana > 7) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  // Verificar que la asignación de profesor existe
  const assignmentExists = await prisma.teacherOnSubjectOnGroup.findUnique({
    where: { id: data.idTeacherAssignment },
  });

  if (!assignmentExists) {
    throw new Error('La asignación de profesor no existe');
  }

  return prisma.horarioSemanal.create({
    data,
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
  const exists = await prisma.horarioSemanal.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.diaSemana && (data.diaSemana < 1 || data.diaSemana > 7)) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  return prisma.horarioSemanal.update({
    where: { id },
    data,
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
  const exists = await prisma.horarioSemanal.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.diaSemana && (data.diaSemana < 1 || data.diaSemana > 7)) {
    throw new Error('El día de la semana debe estar entre 1 (Lunes) y 7 (Domingo)');
  }

  return prisma.horarioSemanal.update({
    where: { id },
    data,
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
  const exists = await prisma.horarioSemanal.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  return prisma.horarioSemanal.delete({
    where: { id },
  });
};
import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return prisma.group.findMany({
    include: {
      student: {
        include: {
          student: true,
          subject: true,
        },
      },
    },
  });
};

export const findById = async (id: number) => {
  return prisma.group.findUnique({
    where: { id },
    include: {
      student: {
        include: {
          student: true,
          subject: true,
        },
      },
    },
  });
};

export const create = async (data: {
  name: string;
  idCourse: number;
}) => {
  return prisma.group.create({
    data,
  });
};

export const update = async (
  id: number,
  data: {
    name?: string;
    idCourse?: number;
  }
) => {
  const exists = await prisma.group.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Grupo no encontrado');
  }

  return prisma.group.update({
    where: { id },
    data,
  });
};

export const patch = async (
  id: number,
  data: Partial<{
    name: string;
    idCourse: number;
  }>
) => {
  const exists = await prisma.group.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Grupo no encontrado');
  }

  return prisma.group.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.group.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Grupo no encontrado');
  }

  return prisma.group.delete({
    where: { id },
  });
};

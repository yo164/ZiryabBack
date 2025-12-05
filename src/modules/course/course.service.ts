import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return prisma.course.findMany({
    include: {
      subjects: true,
    },
  });
};

export const findById = async (id: number) => {
  return prisma.course.findUnique({
    where: { id },
    include: {
      subjects: true,
    },
  });
};

export const create = async (data: { name: string }) => {
  return prisma.course.create({
    data,
    include: {
      subjects: true,
    },
  });
};

export const update = async (
  id: number,
  data: {
    name?: string;
  }
) => {
  const exists = await prisma.course.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Curso no encontrado');
  }

  return prisma.course.update({
    where: { id },
    data,
    include: {
      subjects: true,
    },
  });
};

export const patch = async (
  id: number,
  data: Partial<{ name: string }>
) => {
  const exists = await prisma.course.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Curso no encontrado');
  }

  return prisma.course.update({
    where: { id },
    data,
    include: {
      subjects: true,
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.course.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Curso no encontrado');
  }

  return prisma.course.delete({
    where: { id },
  });
};

import prisma from '../../config/prisma.js';

export type SaveStudentPasswordInput = {
  idStudent: number;
  password: string;
  idTutor: number;
};

export const save = async (input: SaveStudentPasswordInput) => {
  return prisma.studentPassword.upsert({
    where: { idStudent: input.idStudent },
    update: {
      password: input.password,
      idTutor: input.idTutor,
    },
    create: {
      idStudent: input.idStudent,
      password: input.password,
      idTutor: input.idTutor,
    },
  });
};

export const findByStudent = async (idStudent: number) => {
  return prisma.studentPassword.findUnique({
    where: { idStudent },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      },
      tutor: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      },
    },
  });
};

export const findByTutor = async (idTutor: number) => {
  return prisma.studentPassword.findMany({
    where: { idTutor },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const updatePasswordByStudent = async (idStudent: number, password: string) => {
  return prisma.studentPassword.update({
    where: { idStudent },
    data: { password },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      },
      tutor: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      },
    },
  });
};

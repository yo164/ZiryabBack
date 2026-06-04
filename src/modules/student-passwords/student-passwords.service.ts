import prisma from '../../config/prisma.js';
import {
  decryptStoredPassword,
  encryptCredential,
} from '../../utils/credential-crypto.js';

export type SaveStudentPasswordInput = {
  idStudent: number;
  password: string;
  idTutor: number;
};

const withDecryptedPassword = <T extends { password: string }>(row: T): T => ({
  ...row,
  password: decryptStoredPassword(row.password),
});

export const save = async (input: SaveStudentPasswordInput) => {
  const encrypted = encryptCredential(input.password);
  const row = await prisma.studentPassword.upsert({
    where: { idStudent: input.idStudent },
    update: {
      password: encrypted,
      idTutor: input.idTutor,
    },
    create: {
      idStudent: input.idStudent,
      password: encrypted,
      idTutor: input.idTutor,
    },
  });
  return withDecryptedPassword(row);
};

export const findByStudent = async (idStudent: number) => {
  const row = await prisma.studentPassword.findUnique({
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
  return row ? withDecryptedPassword(row) : null;
};

export const findByTutor = async (idTutor: number) => {
  const rows = await prisma.studentPassword.findMany({
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
  return rows.map(withDecryptedPassword);
};

export const updatePasswordByStudent = async (idStudent: number, password: string) => {
  const encrypted = encryptCredential(password);
  const row = await prisma.studentPassword.update({
    where: { idStudent },
    data: { password: encrypted },
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
  return withDecryptedPassword(row);
};

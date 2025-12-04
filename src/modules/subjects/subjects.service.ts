import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return await prisma.subject.findMany({
    include: {
      course: true,
    },
  });
};

export const findById = async (id: number) => {
  return await prisma.subject.findUnique({
    where: { id },
    include: {
      course: true,
      teacher: {
        include: {
          teacher: true,
        },
      },
      student: {
        include: {
          student: true,
          group: true,
        },
      },
    },
  });
};

export const create = async (data: {
  name: string;
  idCourse: number;
}) => {
  return await prisma.subject.create({
    data,
    include: {
      course: true,
    },
  });
};

export const update = async (
  id: number,
  data: {
    name?: string;
    idCourse?: number;
  }
) => {
  const exists = await prisma.subject.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Asignatura no encontrada');
  }

  return await prisma.subject.update({
    where: { id },
    data,
    include: {
      course: true,
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.subject.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Asignatura no encontrada');
  }

  return await prisma.subject.delete({
    where: { id },
  });
};

export const findTeachersBySubjectId = async (subjectId: number) => {
  const result = await prisma.teacherOnSubject.findMany({
    where: { idSubject: subjectId },
    include: {
      teacher: true,
    },
  });

  return result.map((item) => item.teacher);
};

export const findStudentsBySubjectId = async (subjectId: number) => {
  const result = await prisma.studentOnSubjectonGroup.findMany({
    where: { idSubject: subjectId },
    include: {
      student: true,
      group: true,
    },
  });

  return result.map((item) => ({
    ...item.student,
    group: item.group,
    schoolYear: item.schoolYear,
  }));
};
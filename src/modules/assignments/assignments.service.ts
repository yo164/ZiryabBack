import prisma from '../../config/prisma.js';

/**
 * Lista todas las asignaciones profesor-asignatura-grupo (TeacherOnSubjectOnGroup).
 */
export const findAllAssignments = async () => {
  return prisma.teacherOnSubjectOnGroup.findMany({
    include: {
      group: true,
      subject: true,
      teacher: true,
    },
  });
};

/**
 * Asignaciones de un profesor en un año académico (tarjetas asignatura/grupo).
 */
export const findAssignmentsByTeacher = async (idTeacher: number, schoolYear: string) => {
  return prisma.teacherOnSubjectOnGroup.findMany({
    where: {
      idTeacher,
      schoolYear,
    },
    include: {
      subject: {
        select: {
          id: true,
          name: true,
          grade: true,
          course: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      group: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: [
      { subject: { course: { name: 'asc' } } },
      { subject: { grade: 'asc' } },
      { subject: { name: 'asc' } },
      { group: { name: 'asc' } },
    ],
  });
};

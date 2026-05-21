import prisma from '../../config/prisma.js';
import { EvaluationPeriod } from '@prisma/client';

export const findByStudentEnrollment = async (idStudentEnrollment: number) => {
  return prisma.grade.findMany({
    where: { idStudentEnrollment },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          surname: true,
        },
      },
    },
  });
};

/**
 * Devuelve las CourseGroups (ciclo+grupo+grado) de las que el profesor es tutor,
 * incluyendo las matrículas filtradas por curso y grado correctos.
 */
export const getTutoredGroups = async (idTeacher: number) => {
  const courseGroups = await prisma.courseGroup.findMany({
    where: { tutorId: idTeacher },
    include: {
      course: true,
      group: true,
    },
  });

  const result = await Promise.all(
    courseGroups.map(async (cg) => {
      const studentEnrollments = await prisma.studentOnSubjectOnGroup.findMany({
        where: {
          idGroup: cg.idGroup,
          subject: {
            idCourse: cg.idCourse,
            grade: cg.grade,
          },
        },
        include: {
          student: true,
          subject: true,
        },
      });

      return {
        id: cg.id,
        grade: cg.grade,
        course: cg.course,
        group: cg.group,
        studentEnrollments,
      };
    })
  );

  return result;
};

/**
 * Comprueba si el profesor es tutor de la CourseGroup indicada.
 */
export const isTutorOfCourseGroup = async (
  idTeacher: number,
  courseGroupId: number
) => {
  const cg = await prisma.courseGroup.findUnique({
    where: { id: courseGroupId },
  });
  return cg?.tutorId === idTeacher;
};

/**
 * Devuelve las notas de una CourseGroup para un periodo,
 * filtrando por idGroup + subject.idCourse + subject.grade.
 */
export const findByCourseGroupAndPeriod = async (
  courseGroupId: number,
  period: EvaluationPeriod
) => {
  const cg = await prisma.courseGroup.findUnique({
    where: { id: courseGroupId },
  });
  if (!cg) throw new Error('Clase no encontrada');

  const grades = await prisma.grade.findMany({
    where: {
      period,
      studentEnrollment: {
        idGroup: cg.idGroup,
        subject: {
          idCourse: cg.idCourse,
          grade: cg.grade,
        },
      },
    },
    include: {
      studentEnrollment: {
        include: {
          student: true,
          subject: true,
        },
      },
    },
  });

  return grades;
};

export const upsertGrade = async (
  idTeacher: number,
  data: {
    idStudentEnrollment: number;
    period: EvaluationPeriod;
    value?: number;
    observations?: string | null;
  }
) => {
  // Buscar la matrícula con su asignatura para localizar la CourseGroup
  const enrollment = await prisma.studentOnSubjectOnGroup.findUnique({
    where: { id: data.idStudentEnrollment },
    include: { subject: true },
  });

  if (!enrollment) {
    throw new Error('Matrícula no encontrada');
  }

  // Verificar que el profesor es tutor de la CourseGroup correspondiente
  const courseGroup = await prisma.courseGroup.findFirst({
    where: {
      idGroup: enrollment.idGroup,
      idCourse: enrollment.subject.idCourse,
      grade: enrollment.subject.grade,
    },
  });

  if (!courseGroup || courseGroup.tutorId !== idTeacher) {
    throw new Error('Solo el tutor del grupo puede introducir notas');
  }

  return prisma.grade.upsert({
    where: {
      idStudentEnrollment_period: {
        idStudentEnrollment: data.idStudentEnrollment,
        period: data.period,
      },
    },
    update: {
      value: data.value,
      observations: data.observations,
      idTeacher,
    },
    create: {
      idStudentEnrollment: data.idStudentEnrollment,
      period: data.period,
      value: data.value,
      observations: data.observations,
      idTeacher,
    },
  });
};

export const bulkUpsertGrades = async (
  idTeacher: number,
  grades: Array<{
    idStudentEnrollment: number;
    period: EvaluationPeriod;
    value?: number;
    observations?: string | null;
  }>
) => {
  const results = [];
  for (const gradeData of grades) {
    results.push(await upsertGrade(idTeacher, gradeData));
  }
  return results;
};

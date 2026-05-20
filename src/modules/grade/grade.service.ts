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

export const upsertGrade = async (
  idTeacher: number,
  data: {
    idStudentEnrollment: number;
    period: EvaluationPeriod;
    value?: number;
    observations?: string | null;
  }
) => {
  // Verificar que el profesor es tutor del grupo del alumno
  const enrollment = await prisma.studentOnSubjectOnGroup.findUnique({
    where: { id: data.idStudentEnrollment },
    include: {
      group: true,
    },
  });

  if (!enrollment) {
    throw new Error('Matrícula no encontrada');
  }

  if (enrollment.group.tutorId !== idTeacher) {
    console.error(`[GradeService] Teacher ${idTeacher} is not tutor of group ${enrollment.group.id} (Tutor: ${enrollment.group.tutorId})`);
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

export const findByGroupAndPeriod = async (idGroup: number, period: EvaluationPeriod) => {
  const grades = await prisma.grade.findMany({
    where: {
      period,
      studentEnrollment: {
        idGroup,
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
  console.log(`[GradeService] Found ${grades.length} grades for group ${idGroup} and period ${period}`);
  return grades;
};

export const isTutorOfGroup = async (idTeacher: number, idGroup: number) => {
  const group = await prisma.group.findUnique({
    where: { id: idGroup },
  });
  return group?.tutorId === idTeacher;
};

export const getTutoredGroups = async (idTeacher: number) => {
  const groups = await prisma.group.findMany({
    where: { tutorId: idTeacher },
    include: {
      studentEnrollments: {
        include: {
          student: true,
          subject: true,
        },
      },
    },
  });
  console.log(`[GradeService] Found ${groups.length} tutored groups for teacher ${idTeacher}`);
  return groups;
};

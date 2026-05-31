import { randomBytes } from 'crypto';
import prisma from '../../config/prisma.js';
import { logger } from '../../utils/logger.js';
import * as studentPasswordsService from '../student-passwords/student-passwords.service.js';

type RegistrationInput = {
  idStudent: number;
  idGroup: number;
  idSubject: number;
  schoolYear: string;
  password?: string;
};

const generateStudentPassword = () => randomBytes(8).toString('base64url');

const resolveTutorIdFromAssignment = async (registration: RegistrationInput) => {
  const subject = await prisma.subject.findUnique({
    where: { id: registration.idSubject },
    select: { idCourse: true, grade: true },
  });

  if (!subject) {
    throw new Error('Subject no encontrado para resolver tutor');
  }

  const tutorAssignment = await prisma.teacherOnSubjectOnGroup.findFirst({
    where: {
      idGroup: registration.idGroup,
      schoolYear: registration.schoolYear,
      isTutor: true,
      subject: {
        idCourse: subject.idCourse,
        grade: subject.grade,
      },
    },
    select: { idTeacher: true },
  });

  if (!tutorAssignment) {
    throw new Error('No se encontró tutor assignment para la clase');
  }

  return tutorAssignment.idTeacher;
};

export const create = async (data: { registrations: RegistrationInput[] }) => {
  const results = [];
  const savedCredentialStudents = new Set<number>();
  const generatedPasswords = new Map<number, string>();

  for (const reg of data.registrations) {
    const created = await prisma.studentOnSubjectOnGroup.create({
      data: {
        idStudent: reg.idStudent,
        idGroup: reg.idGroup,
        idSubject: reg.idSubject,
        schoolYear: reg.schoolYear,
      },
    });

    results.push(created);

    // Best effort: si falla la credencial no bloquea la matriculación.
    if (savedCredentialStudents.has(reg.idStudent)) {
      continue;
    }

    const plainPassword =
      reg.password ??
      generatedPasswords.get(reg.idStudent) ??
      generateStudentPassword();

    generatedPasswords.set(reg.idStudent, plainPassword);

    try {
      const idTutor = await resolveTutorIdFromAssignment(reg);
      await studentPasswordsService.save({
        idStudent: reg.idStudent,
        password: plainPassword,
        idTutor,
      });
      savedCredentialStudents.add(reg.idStudent);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      logger.error(
        `No se pudo guardar credencial para idStudent=${reg.idStudent} (best-effort): ${message}`,
      );
    }
  }

  return results;
};
// Service
/*export const create = async (data: { registrations: { idStudent: number, idGroup: number, idSubject: number, schoolYear: string }[]}) => {
  const results = [];

  for (const reg of data.registrations) {
    const created = await prisma.studentOnSubjectOnGroup.create({ data: reg });
    results.push(created);
  }

  return results;
};
*/
import prisma from '../../config/prisma.js';

export const findAll = async () => {
  return prisma.courseGroup.findMany({
    include: {
      course: { select: { id: true, name: true } },
      group:  { select: { id: true, name: true } },
      tutor:  { select: { id: true, name: true, surname: true } },
    },
    orderBy: [
      { course: { name: 'asc' } },
      { grade: 'asc' },
      { group:  { name: 'asc' } },
    ],
  });
};

export const findById = async (id: number) => {
  return prisma.courseGroup.findUnique({
    where: { id },
    include: {
      course: { select: { id: true, name: true } },
      group:  { select: { id: true, name: true } },
      tutor:  { select: { id: true, name: true, surname: true } },
    },
  });
};

export const upsert = async (idCourse: number, idGroup: number, grade: string) => {
  const course = await prisma.course.findUnique({ where: { id: idCourse } });
  if (!course) throw new Error('Ciclo no encontrado');
  const group = await prisma.group.findUnique({ where: { id: idGroup } });
  if (!group) throw new Error('Grupo no encontrado');
  const normalizedGrade = String(grade).replace(/º/g, '').trim();
  if (normalizedGrade !== '1' && normalizedGrade !== '2') {
    throw new Error('El grado debe ser "1" o "2"');
  }
  grade = normalizedGrade;

  return prisma.courseGroup.upsert({
    where: { idCourse_idGroup_grade: { idCourse, idGroup, grade } },
    update: {},
    create: { idCourse, idGroup, grade },
    include: {
      course: { select: { id: true, name: true } },
      group:  { select: { id: true, name: true } },
      tutor:  { select: { id: true, name: true, surname: true } },
    },
  });
};

/**
 * Devuelve los profesores que imparten en el ciclo+grupo+grado de una CourseGroup.
 * Solo aparecen profesores con al menos una asignación (TeacherOnSubjectOnGroup)
 * cuya asignatura pertenezca al ciclo correcto, el grupo correcto y el grado correcto.
 */
export const eligibleTutors = async (id: number) => {
  const cg = await prisma.courseGroup.findUnique({ where: { id } });
  if (!cg) throw new Error('Clase no encontrada');

  const assignments = await prisma.teacherOnSubjectOnGroup.findMany({
    where: {
      idGroup: cg.idGroup,
      subject: {
        idCourse: cg.idCourse,
        grade:    cg.grade,
      },
    },
    select: {
      teacher: {
        select: { id: true, name: true, surname: true },
      },
    },
    distinct: ['idTeacher'],
  });

  // Filtra nulos y elimina duplicados
  const seen = new Set<number>();
  return assignments
    .map((a) => a.teacher)
    .filter((t): t is { id: number; name: string; surname: string } => {
      if (!t || seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    })
    .sort((a, b) => a.surname.localeCompare(b.surname));
};

export const assignTutor = async (id: number, tutorId: number | null) => {
  const cg = await prisma.courseGroup.findUnique({ where: { id } });
  if (!cg) throw new Error('Clase no encontrada');

  if (tutorId !== null) {
    const teacher = await prisma.teacher.findUnique({ where: { id: tutorId } });
    if (!teacher) throw new Error('Profesor no encontrado');

    // Un tutor no puede serlo a la vez del otro grado del mismo ciclo+grupo
    const conflict = await prisma.courseGroup.findFirst({
      where: {
        idCourse: cg.idCourse,
        idGroup:  cg.idGroup,
        tutorId,
        id:       { not: id },   // excluir la fila actual
      },
    });
    if (conflict) {
      throw new Error(
        `Este profesor ya es tutor de ${conflict.grade}º del mismo ciclo y grupo. Un tutor no puede serlo de ambos cursos a la vez.`
      );
    }
  }

  return prisma.courseGroup.update({
    where: { id },
    data:  { tutorId },
    include: {
      course: { select: { id: true, name: true } },
      group:  { select: { id: true, name: true } },
      tutor:  { select: { id: true, name: true, surname: true } },
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.courseGroup.findUnique({ where: { id } });
  if (!exists) throw new Error('Clase no encontrada');
  return prisma.courseGroup.delete({ where: { id } });
};

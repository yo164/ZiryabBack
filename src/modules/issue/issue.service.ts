import type { IssueAudience, Prisma } from '@prisma/client';
import prisma from '../../config/prisma.js';

export interface CreateIssueData {
  audience: IssueAudience;
  title: string;
  body: string;
  attachmentUrl?: string;
  idGroup?: number;
  idCourse?: number;
  idSubject?: number;
  grade?: string;
  idTargetTeacher?: number;
  idTargetStudent?: number;
  isPublished?: boolean;
  publishAt?: string;
  expiresAt?: string;
}

export interface UpdateIssueData {
  audience?: IssueAudience;
  title?: string;
  body?: string;
  attachmentUrl?: string | null;
  idGroup?: number | null;
  idCourse?: number | null;
  idSubject?: number | null;
  grade?: string | null;
  idTargetTeacher?: number | null;
  idTargetStudent?: number | null;
  isPublished?: boolean;
  publishAt?: string | null;
  expiresAt?: string | null;
}

type NormalizedIssueScope = {
  idGroup: number | null;
  idCourse: number | null;
  idSubject: number | null;
  grade: string | null;
  idTargetTeacher: number | null;
  idTargetStudent: number | null;
};

const issueInclude = {
  admin: { select: { id: true, name: true, surname: true, email: true } },
  targetTeacher: { select: { id: true, name: true, surname: true, email: true } },
  targetStudent: { select: { id: true, name: true, surname: true, email: true } },
  group: { select: { id: true, name: true } },
  course: { select: { id: true, name: true } },
  subject: { select: { id: true, name: true, grade: true, idCourse: true } },
} as const;

const parseOptionalDate = (value?: string | null): Date | null | undefined => {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error('Fecha inválida');
  }
  return date;
};

const activePublicationFilter = (now: Date): Prisma.IssueWhereInput => ({
  isPublished: true,
  AND: [
    {
      OR: [{ publishAt: null }, { publishAt: { lte: now } }],
    },
    {
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
  ],
});

const isIssueCreator = (issue: { idAdmin: number }, adminId: number): boolean =>
  issue.idAdmin === adminId;

const parseGrade = (value?: string | null): string | null => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const grade = String(value).trim();
  if (grade !== '1' && grade !== '2') {
    throw new Error('grade (curso 1º/2º) debe ser "1" o "2"');
  }
  return grade;
};

const normalizeAudienceFks = (data: {
  audience: IssueAudience;
  idGroup?: number | null;
  idCourse?: number | null;
  idSubject?: number | null;
  grade?: string | null;
  idTargetTeacher?: number | null;
  idTargetStudent?: number | null;
}): NormalizedIssueScope => {
  const idGroup = data.idGroup ?? null;
  const idCourse = data.idCourse ?? null;
  const idSubject = data.idSubject ?? null;
  const grade = parseGrade(data.grade);
  const idTargetTeacher = data.idTargetTeacher ?? null;
  const idTargetStudent = data.idTargetStudent ?? null;

  switch (data.audience) {
    case 'CENTER':
    case 'ALL_TEACHERS':
    case 'ALL_STUDENTS':
      if (
        idGroup !== null ||
        idCourse !== null ||
        idSubject !== null ||
        grade !== null ||
        idTargetTeacher !== null ||
        idTargetStudent !== null
      ) {
        throw new Error(
          'Para audiencias globales no se permiten filtros de ámbito ni id de receptor',
        );
      }
      return {
        idGroup: null,
        idCourse: null,
        idSubject: null,
        grade: null,
        idTargetTeacher: null,
        idTargetStudent: null,
      };
    case 'TEACHER':
      if (
        !idTargetTeacher ||
        idGroup !== null ||
        idCourse !== null ||
        idSubject !== null ||
        grade !== null ||
        idTargetStudent !== null
      ) {
        throw new Error('TEACHER requiere idTargetTeacher y no admite otros filtros');
      }
      return {
        idGroup: null,
        idCourse: null,
        idSubject: null,
        grade: null,
        idTargetTeacher,
        idTargetStudent: null,
      };
    case 'STUDENT':
      if (
        !idTargetStudent ||
        idGroup !== null ||
        idCourse !== null ||
        idSubject !== null ||
        grade !== null ||
        idTargetTeacher !== null
      ) {
        throw new Error('STUDENT requiere idTargetStudent y no admite otros filtros');
      }
      return {
        idGroup: null,
        idCourse: null,
        idSubject: null,
        grade: null,
        idTargetTeacher: null,
        idTargetStudent,
      };
    case 'GROUP':
      if (
        !idGroup ||
        idCourse !== null ||
        idSubject !== null ||
        grade !== null ||
        idTargetTeacher !== null ||
        idTargetStudent !== null
      ) {
        throw new Error('GROUP requiere idGroup y no admite otros filtros');
      }
      return {
        idGroup,
        idCourse: null,
        idSubject: null,
        grade: null,
        idTargetTeacher: null,
        idTargetStudent: null,
      };
    case 'COURSE':
      if (
        !idCourse ||
        idGroup !== null ||
        idSubject !== null ||
        idTargetTeacher !== null ||
        idTargetStudent !== null
      ) {
        throw new Error(
          'COURSE requiere idCourse (ciclo) y opcionalmente grade (curso 1º/2º); no admite idGroup ni idSubject',
        );
      }
      return {
        idGroup: null,
        idCourse,
        idSubject: null,
        grade,
        idTargetTeacher: null,
        idTargetStudent: null,
      };
    case 'SUBJECT_GROUP':
      if (
        !idGroup ||
        !idSubject ||
        idCourse !== null ||
        grade !== null ||
        idTargetTeacher !== null ||
        idTargetStudent !== null
      ) {
        throw new Error(
          'SUBJECT_GROUP requiere idGroup e idSubject (el curso 1º/2º va en Subject.grade); no admite idCourse ni grade en el issue',
        );
      }
      return {
        idGroup,
        idCourse: null,
        idSubject,
        grade: null,
        idTargetTeacher: null,
        idTargetStudent: null,
      };
    default:
      throw new Error('Audiencia no soportada');
  }
};

const buildCourseAudienceOr = (
  courseGradePairs: { idCourse: number; grade: string }[],
): Prisma.IssueWhereInput[] => {
  const clauses: Prisma.IssueWhereInput[] = [];
  const courseIds = [...new Set(courseGradePairs.map((p) => p.idCourse))];

  for (const idCourse of courseIds) {
    clauses.push({ audience: 'COURSE', idCourse, grade: null });
  }

  const seen = new Set<string>();
  for (const pair of courseGradePairs) {
    const key = `${pair.idCourse}:${pair.grade}`;
    if (seen.has(key)) continue;
    seen.add(key);
    clauses.push({
      audience: 'COURSE',
      idCourse: pair.idCourse,
      grade: pair.grade,
    });
  }

  return clauses;
};

const buildStudentVisibilityOr = async (studentId: number): Promise<Prisma.IssueWhereInput[]> => {
  const enrollments = await prisma.studentOnSubjectOnGroup.findMany({
    where: { idStudent: studentId, status: 'ENROLLED' },
    select: {
      idGroup: true,
      idSubject: true,
      subject: { select: { idCourse: true, grade: true } },
    },
  });

  const or: Prisma.IssueWhereInput[] = [
    { audience: 'CENTER' },
    { audience: 'ALL_STUDENTS' },
    { audience: 'STUDENT', idTargetStudent: studentId },
  ];

  const groupIds = [...new Set(enrollments.map((e) => e.idGroup))];
  const courseGradePairs = enrollments.map((e) => ({
    idCourse: e.subject.idCourse,
    grade: e.subject.grade,
  }));

  if (groupIds.length > 0) {
    or.push({ audience: 'GROUP', idGroup: { in: groupIds } });
  }
  or.push(...buildCourseAudienceOr(courseGradePairs));
  if (enrollments.length > 0) {
    or.push({
      OR: enrollments.map((e) => ({
        audience: 'SUBJECT_GROUP' as const,
        idGroup: e.idGroup,
        idSubject: e.idSubject,
      })),
    });
  }

  return or;
};

const buildTeacherVisibilityOr = async (teacherId: number): Promise<Prisma.IssueWhereInput[]> => {
  const assignments = await prisma.teacherOnSubjectOnGroup.findMany({
    where: { idTeacher: teacherId },
    select: {
      idGroup: true,
      idSubject: true,
      subject: { select: { idCourse: true, grade: true } },
    },
  });

  const or: Prisma.IssueWhereInput[] = [
    { audience: 'CENTER' },
    { audience: 'ALL_TEACHERS' },
    { audience: 'ALL_STUDENTS' },
    { audience: 'TEACHER', idTargetTeacher: teacherId },
  ];

  const groupIds = [...new Set(assignments.map((a) => a.idGroup))];
  const courseGradePairs = assignments.map((a) => ({
    idCourse: a.subject.idCourse,
    grade: a.subject.grade,
  }));

  if (groupIds.length > 0) {
    or.push({ audience: 'GROUP', idGroup: { in: groupIds } });
  }
  or.push(...buildCourseAudienceOr(courseGradePairs));
  if (assignments.length > 0) {
    or.push({
      OR: assignments.map((a) => ({
        audience: 'SUBJECT_GROUP' as const,
        idGroup: a.idGroup,
        idSubject: a.idSubject,
      })),
    });
  }

  return or;
};

const buildActiveVisibilityWhere = async (
  requesterId: number,
  requesterRole: string,
  now: Date,
): Promise<Prisma.IssueWhereInput> => {
  const base = activePublicationFilter(now);

  if (requesterRole === 'ADMIN') {
    return base;
  }

  if (requesterRole === 'STUDENT') {
    const or = await buildStudentVisibilityOr(requesterId);
    return { AND: [base, { OR: or }] };
  }

  if (requesterRole === 'TEACHER') {
    const or = await buildTeacherVisibilityOr(requesterId);
    return { AND: [base, { OR: or }] };
  }

  throw new Error('Rol no soportado para listar anuncios');
};

const assertCanViewIssue = async (
  issue: {
    id: number;
    isPublished: boolean;
    publishAt: Date | null;
    expiresAt: Date | null;
    idAdmin: number;
  },
  requesterId: number,
  requesterRole: string,
) => {
  if (requesterRole === 'ADMIN' || isIssueCreator(issue, requesterId)) {
    return;
  }

  if (!issue.isPublished) {
    throw new Error('No autorizado para ver este anuncio');
  }

  const visible = await prisma.issue.findFirst({
    where: {
      id: issue.id,
      ...(await buildActiveVisibilityWhere(requesterId, requesterRole, new Date())),
    },
    select: { id: true },
  });

  if (!visible) {
    throw new Error('No autorizado para ver este anuncio');
  }
};

const assertCanModifyIssue = (
  issue: { idAdmin: number },
  requesterId: number,
  requesterRole: string,
) => {
  if (requesterRole === 'ADMIN' && isIssueCreator(issue, requesterId)) {
    return;
  }
  throw new Error('No autorizado para modificar este anuncio');
};

const assertScopeEntitiesExist = async (scope: NormalizedIssueScope) => {
  if (scope.idGroup) {
    const group = await prisma.group.findUnique({
      where: { id: scope.idGroup },
      select: { id: true },
    });
    if (!group) throw new Error('Grupo no encontrado');
  }
  if (scope.idCourse) {
    const course = await prisma.course.findUnique({
      where: { id: scope.idCourse },
      select: { id: true },
    });
    if (!course) throw new Error('Ciclo formativo no encontrado');
  }
  if (scope.idSubject) {
    const subject = await prisma.subject.findUnique({
      where: { id: scope.idSubject },
      select: { id: true },
    });
    if (!subject) throw new Error('Asignatura no encontrada');
  }
  if (scope.idTargetTeacher) {
    const teacher = await prisma.teacher.findUnique({
      where: { id: scope.idTargetTeacher },
      select: { id: true },
    });
    if (!teacher) throw new Error('Profesor destinatario no encontrado');
  }
  if (scope.idTargetStudent) {
    const student = await prisma.student.findUnique({
      where: { id: scope.idTargetStudent },
      select: { id: true },
    });
    if (!student) throw new Error('Alumno destinatario no encontrado');
  }
};

export const createIssue = async (data: CreateIssueData, idAdmin: number) => {
  const admin = await prisma.admin.findUnique({ where: { id: idAdmin }, select: { id: true } });
  if (!admin) {
    throw new Error('Administrador no encontrado');
  }

  const scope = normalizeAudienceFks(data);
  await assertScopeEntitiesExist(scope);

  return prisma.issue.create({
    data: {
      idAdmin,
      audience: data.audience,
      idGroup: scope.idGroup,
      idCourse: scope.idCourse,
      idSubject: scope.idSubject,
      grade: scope.grade,
      idTargetTeacher: scope.idTargetTeacher,
      idTargetStudent: scope.idTargetStudent,
      title: data.title,
      body: data.body,
      attachmentUrl: data.attachmentUrl ?? null,
      isPublished: data.isPublished ?? false,
      publishAt: parseOptionalDate(data.publishAt) ?? null,
      expiresAt: parseOptionalDate(data.expiresAt) ?? null,
    },
    include: issueInclude,
  });
};

export const getActiveIssues = async (requesterId: number, requesterRole: string) => {
  const now = new Date();
  const where = await buildActiveVisibilityWhere(requesterId, requesterRole, now);

  return prisma.issue.findMany({
    where,
    include: issueInclude,
    orderBy: { createdAt: 'desc' },
  });
};

export const getIssueById = async (id: number, requesterId: number, requesterRole: string) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: issueInclude,
  });

  if (!issue) {
    throw new Error('Anuncio no encontrado');
  }

  await assertCanViewIssue(issue, requesterId, requesterRole);
  return issue;
};

export const updateIssue = async (
  id: number,
  data: UpdateIssueData,
  requesterId: number,
  requesterRole: string,
) => {
  const existing = await prisma.issue.findUnique({ where: { id } });
  if (!existing) {
    throw new Error('Anuncio no encontrado');
  }

  assertCanModifyIssue(existing, requesterId, requesterRole);

  const audience = data.audience ?? existing.audience;
  const scope = normalizeAudienceFks({
    audience,
    idGroup: data.idGroup !== undefined ? data.idGroup : existing.idGroup,
    idCourse: data.idCourse !== undefined ? data.idCourse : existing.idCourse,
    idSubject: data.idSubject !== undefined ? data.idSubject : existing.idSubject,
    grade: data.grade !== undefined ? data.grade : existing.grade,
    idTargetTeacher:
      data.idTargetTeacher !== undefined ? data.idTargetTeacher : existing.idTargetTeacher,
    idTargetStudent:
      data.idTargetStudent !== undefined ? data.idTargetStudent : existing.idTargetStudent,
  });

  await assertScopeEntitiesExist(scope);

  return prisma.issue.update({
    where: { id },
    data: {
      ...(data.audience !== undefined && { audience: data.audience }),
      idGroup: scope.idGroup,
      idCourse: scope.idCourse,
      idSubject: scope.idSubject,
      grade: scope.grade,
      idTargetTeacher: scope.idTargetTeacher,
      idTargetStudent: scope.idTargetStudent,
      ...(data.title !== undefined && { title: data.title }),
      ...(data.body !== undefined && { body: data.body }),
      ...(data.attachmentUrl !== undefined && { attachmentUrl: data.attachmentUrl }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
      ...(data.publishAt !== undefined && {
        publishAt: parseOptionalDate(data.publishAt) ?? null,
      }),
      ...(data.expiresAt !== undefined && {
        expiresAt: parseOptionalDate(data.expiresAt) ?? null,
      }),
    },
    include: issueInclude,
  });
};

export const deleteIssue = async (id: number, requesterId: number, requesterRole: string) => {
  const existing = await prisma.issue.findUnique({ where: { id } });
  if (!existing) {
    throw new Error('Anuncio no encontrado');
  }

  assertCanModifyIssue(existing, requesterId, requesterRole);
  return prisma.issue.delete({ where: { id }, include: issueInclude });
};

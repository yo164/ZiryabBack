import prisma from '../../config/prisma.js';
import { DayOfWeek } from '@prisma/client';

const VALID_DAYS = new Set<string>(Object.values(DayOfWeek));

/**
 * Agregación de clases para el selector del builder de horarios (CURSO-70)
 * Agrupa por (courseId, grade, groupId, schoolYear) y cuenta asignaturas
 */
export const findClassesByAggregation = async (
  schoolYear?: string,
  onlyWithoutSchedule?: boolean
) => {
  // Obtener todos los assignments
  const assignments = await prisma.teacherOnSubjectOnGroup.findMany({
    where: schoolYear ? { schoolYear } : undefined,
    include: {
      subject: {
        include: {
          course: true,
        },
      },
      group: true,
      weekSchedules: true, // Para contar si hay WeekSchedule
    },
  });

  // Agrupar por (courseId, grade, groupId, schoolYear)
  const classMap = new Map<string, any>();

  for (const assignment of assignments) {
    const key = `${assignment.subject.course.id}_${assignment.subject.grade}_${assignment.idGroup}_${assignment.schoolYear}`;

    if (!classMap.has(key)) {
      classMap.set(key, {
        courseId: assignment.subject.course.id,
        courseName: assignment.subject.course.name,
        grade: assignment.subject.grade.toString(),
        groupId: assignment.idGroup,
        groupName: assignment.group.name,
        schoolYear: assignment.schoolYear,
        subjectIds: new Set<number>(),
        hasWeekSchedule: false,
      });
    }

    const classData = classMap.get(key);
    classData.subjectIds.add(assignment.idSubject);
    if (assignment.weekSchedules && assignment.weekSchedules.length > 0) {
      classData.hasWeekSchedule = true;
    }
  }

  // Convertir a array y formatear
  let classes = Array.from(classMap.values()).map((cls: any) => ({
    label: `${cls.grade}º ${cls.courseName} — ${cls.groupName}`,
    grade: cls.grade,
    course: {
      id: cls.courseId,
      name: cls.courseName,
    },
    group: {
      id: cls.groupId,
      name: cls.groupName,
    },
    schoolYear: cls.schoolYear,
    subjectCount: cls.subjectIds.size,
    hasWeekSchedule: cls.hasWeekSchedule,
  }));

  // Filtrar si onlyWithoutSchedule
  if (onlyWithoutSchedule) {
    classes = classes.filter((cls: any) => !cls.hasWeekSchedule);
  }

  return classes;
};

export const findAll = async () => {
  return prisma.weekSchedule.findMany({
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' },
    ],
  });
};

export const findById = async (id: number) => {
  return prisma.weekSchedule.findUnique({
    where: { id },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
      sessions: {
        include: {
          assistances: true,
        },
      },
    },
  });
};

export const findByTeacherAssignment = async (idTeacherAssignment: number) => {
  return prisma.weekSchedule.findMany({
    where: { idTeacherAssignment },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' },
    ],
  });
};

export const findByTeacherId = async(idTeacher: number) => {
  return prisma.weekSchedule.findMany({
    where: { 
      teacherAssignment: {
        idTeacher
      }
     },
    include: {
      teacherAssignment:{
        include: {
          teacher: {
            select: {
              id: true
            }
          },
          subject: true,
          group: true
        }
      }
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' }
    ]

  });
};
export const findByWeekDay = async (weekDay: DayOfWeek) => {
  return prisma.weekSchedule.findMany({
    where: { weekDay },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
    orderBy: { startTime: 'asc' },
  });
};


export const findByStudentId = async (idStudent: number) => {
  return prisma.weekSchedule.findMany({
    where: {
      teacherAssignment: {
        subject: {
          studentEnrollments: {
            some: {
              idStudent: idStudent
            }
          }
        },
        group: {
          studentEnrollments: {
            some: {
              idStudent: idStudent
            }
          }
        }
      }
    },
    include: {
      teacherAssignment: {
        include: {
          subject: true,
          group: true
        }
      }
    },
    orderBy: [
      { weekDay: 'asc' },
      { startTime: 'asc' }
    ]
  });
};

export const create = async (data: {
  idTeacherAssignment: number;
  weekDay: string;
  startTime: string;
  finishTime: string;
}) => {
  if (!VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  const assignmentExists = await prisma.teacherOnSubjectOnGroup.findUnique({
    where: { id: data.idTeacherAssignment },
  });

  if (!assignmentExists) {
    throw new Error('La asignación de profesor no existe');
  }

  return prisma.weekSchedule.create({
    data: {
      idTeacherAssignment: data.idTeacherAssignment,
      weekDay: data.weekDay as DayOfWeek,
      startTime: data.startTime,
      finishTime: data.finishTime,
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};




export const update = async (
  id: number,
  data: {
    idTeacherAssignment?: number;
    weekDay?: string;
    startTime?: string;
    finishTime?: string;
  }
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.weekDay && !VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.weekDay && { weekDay: data.weekDay as DayOfWeek }),
      ...(data.startTime && { startTime: data.startTime }),
      ...(data.finishTime && { finishTime: data.finishTime }),
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};

export const patch = async (
  id: number,
  data: Partial<{
    idTeacherAssignment: number;
    weekDay: string;
    startTime: string;
    finishTime: string;
  }>
) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  if (data.weekDay && !VALID_DAYS.has(data.weekDay)) {
    throw new Error(`Día inválido: ${data.weekDay}. Valores válidos: ${[...VALID_DAYS].join(', ')}`);
  }

  return prisma.weekSchedule.update({
    where: { id },
    data: {
      ...(data.idTeacherAssignment && { idTeacherAssignment: data.idTeacherAssignment }),
      ...(data.weekDay && { weekDay: data.weekDay as DayOfWeek }),
      ...(data.startTime && { startTime: data.startTime }),
      ...(data.finishTime && { finishTime: data.finishTime }),
    },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.weekSchedule.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Horario no encontrado');
  }

  return prisma.weekSchedule.delete({
    where: { id },
  });
};
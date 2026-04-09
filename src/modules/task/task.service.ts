import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAll = async () => {
  return prisma.task.findMany({
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
      studentTasks: true,
    },
    orderBy: {
      dueDate: 'desc',
    },
  });
};

export const findById = async (id: number) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      teacherAssignment: {
        include: {
          teacher: true,
          subject: true,
          group: true,
        },
      },
      studentTasks: {
        include: {
          studentEnrollment: {
            include: {
              student: true,
            },
          },
        },
      },
    },
  });
};

export const findByTeacherAssignment = async (idTeacherAssignment: number) => {
  return prisma.task.findMany({
    where: { idTeacherAssignment },
    include: {
      teacherAssignment: true,
      studentTasks: true,
    },
    orderBy: {
      dueDate: 'desc',
    },
  });
};

export const create = async (data: {
  idTeacherAssignment: number;
  title: string;
  description?: string;
  type: string;
  startDate: string;
  dueDate: string;
  schoolYear: string;
}) => {
  // Verificar que el teacher assignment existe
  const assignmentExists = await prisma.teacherOnSubjectOnGroup.findUnique({
    where: { id: data.idTeacherAssignment },
    include: {
      subject: true,
      group: true,
    },
  });

  if (!assignmentExists) {
    throw new Error('La asignación de profesor no existe');
  }

  // Crear la tarea
  const task = await prisma.task.create({
    data: {
      idTeacherAssignment: data.idTeacherAssignment,
      title: data.title,
      description: data.description || null,
      type: data.type as any,
      startDate: new Date(data.startDate),
      dueDate: new Date(data.dueDate),
      schoolYear: data.schoolYear,
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

  // Obtener todos los estudiantes matriculados en esa asignatura
  const enrollments = await prisma.studentOnSubjectOnGroup.findMany({
    where: {
      idSubject: assignmentExists.idSubject,
      idGroup: assignmentExists.idGroup,
      schoolYear: data.schoolYear,
      status: 'ENROLLED',
    },
  });

  // Crear StudentTask para cada estudiante
  if (enrollments.length > 0) {
    await prisma.studentTask.createMany({
      data: enrollments.map(enrollment => ({
        idTask: task.id,
        idStudentEnrollment: enrollment.id,
        status: 'PENDING',
      })),
    });
  }

  return task;
};

export const update = async (
  id: number,
  data: {
    title?: string;
    description?: string;
    type?: string;
    startDate?: string;
    dueDate?: string;
  }
) => {
  const exists = await prisma.task.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Tarea no encontrada');
  }

  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description || null }),
      ...(data.type && { type: data.type as any }),
      ...(data.startDate && { startDate: new Date(data.startDate) }),
      ...(data.dueDate && { dueDate: new Date(data.dueDate) }),
    },
    include: {
      teacherAssignment: true,
      studentTasks: true,
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.task.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Tarea no encontrada');
  }

  return prisma.task.delete({
    where: { id },
  });
};
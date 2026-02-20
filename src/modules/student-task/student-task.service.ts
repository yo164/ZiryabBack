import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAll = async () => {
  return prisma.studentTask.findMany({
    include: {
      task: {
        include: {
          teacherAssignment: {
            include: {
              teacher: true,
              subject: true,
              group: true,
            },
          },
        },
      },
      studentEnrollment: {
        include: {
          student: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const findById = async (id: number) => {
  return prisma.studentTask.findUnique({
    where: { id },
    include: {
      task: {
        include: {
          teacherAssignment: {
            include: {
              teacher: true,
              subject: true,
              group: true,
            },
          },
        },
      },
      studentEnrollment: {
        include: {
          student: true,
        },
      },
    },
  });
};

export const findByTask = async (idTask: number) => {
  return prisma.studentTask.findMany({
    where: { idTask },
    include: {
      studentEnrollment: {
        include: {
          student: true,
        },
      },
    },
    orderBy: {
      submissionDate: 'desc',
    },
  });
};

export const findByStudent = async (idStudentEnrollment: number) => {
  return prisma.studentTask.findMany({
    where: { idStudentEnrollment },
    include: {
      task: {
        include: {
          teacherAssignment: {
            include: {
              subject: true,
              group: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const update = async (
  id: number,
  data: {
    status?: string;
    submissionDate?: string;
    score?: number;
    feedback?: string;
    attachmentUrl?: string;
  }
) => {
  const exists = await prisma.studentTask.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Entrega de estudiante no encontrada');
  }

  return prisma.studentTask.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status as any }),
      ...(data.submissionDate && { submissionDate: new Date(data.submissionDate) }),
      ...(data.score !== undefined && { score: data.score }),
      ...(data.feedback !== undefined && { feedback: data.feedback || null }),
      ...(data.attachmentUrl !== undefined && { attachmentUrl: data.attachmentUrl || null }),
    },
    include: {
      task: true,
      studentEnrollment: {
        include: {
          student: true,
        },
      },
    },
  });
};

export const remove = async (id: number) => {
  const exists = await prisma.studentTask.findUnique({ where: { id } });
  if (!exists) {
    throw new Error('Entrega de estudiante no encontrada');
  }

  return prisma.studentTask.delete({
    where: { id },
  });
};
import prisma from '../../config/prisma.js';

export const findAll = async (teacherId?: number, studentId?: number) => {
  const whereClause: any = {};
  if (teacherId) {
    whereClause.task = {
      teacherAssignment: {
        idTeacher: teacherId,
      },
    };
  }
  if (studentId) {
    whereClause.studentEnrollment = {
      idStudent: studentId,
    };
  }

  return prisma.studentTask.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    include: {
     task: {
        include: {
          taskGroup: true,
          teacherAssignment: {
            include: {
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
          taskGroup: true,
          teacherAssignment: {
            include: {
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
      task: {
        include: {
          taskGroup: true,
          teacherAssignment: {
            include: {
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
      submissionDate: 'desc',
    },
  });
};

/** Solo entregas de alumnos concretos (evita filtrar en memoria datos de otros). */
export const findByTaskForStudent = async (idTask: number, studentId: number) => {
  return prisma.studentTask.findMany({
    where: {
      idTask,
      studentEnrollment: {
        idStudent: studentId,
      },
    },
    include: {
      studentEnrollment: {
        include: {
          student: true,
        },
      },
      task: {
        include: {
          taskGroup: true,
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
      submissionDate: 'desc',
    },
  });
};

export const enrollmentBelongsToStudent = async (
  enrollmentId: number,
  studentId: number,
): Promise<boolean> => {
  const row = await prisma.studentOnSubjectOnGroup.findUnique({
    where: { id: enrollmentId },
    select: { idStudent: true },
  });
  return row !== null && row.idStudent === studentId;
};

export const findByStudent = async (idStudentEnrollment: number) => {
  return prisma.studentTask.findMany({
    where: { idStudentEnrollment },
    include: {
      task: {
        include: {
          taskGroup: true,
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

export const create = async (data: {
  idTask: number;
  idStudentEnrollment: number;
  status?: string;
}) => {
  const task = await prisma.task.findUnique({ where: { id: data.idTask } });
  if (!task) throw new Error('Tarea no encontrada');

  const enrollment = await prisma.studentOnSubjectOnGroup.findUnique({
    where: { id: data.idStudentEnrollment }
  });
  if (!enrollment) throw new Error('Matrícula no encontrada');

  return prisma.studentTask.create({
    data: {
      idTask: data.idTask,
      idStudentEnrollment: data.idStudentEnrollment,
      status: (data.status as any) ?? 'PENDING',
      isEnabled: true,
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

export const submit = async (id: number, data: { attachmentUrl?: string }) => {
  const studentTask = await prisma.studentTask.findUnique({
    where: { id },
    include: { task: true },
  });
  if (!studentTask) throw new Error('Entrega de estudiante no encontrada');

  if (!studentTask.task.isPublished) {
    throw Object.assign(new Error('La tarea no está publicada'), { status: 400 });
  }

  if (studentTask.status === 'GRADED') {
    throw Object.assign(
      new Error('La tarea ya está calificada y no puede re-entregarse'),
      { status: 409 }
    );
  }

  const now = new Date();
  const isLate = now > studentTask.task.dueDate;

  if (isLate && !studentTask.task.allowLateSubmission) {
    throw Object.assign(
      new Error('El plazo de entrega ha expirado y no se permiten entregas tardías'),
      { status: 403 }
    );
  }

  return prisma.studentTask.update({
    where: { id },
    data: {
      status: isLate ? 'LATE' : 'SUBMITTED',
      submissionDate: now,
      ...(data.attachmentUrl && { attachmentUrl: data.attachmentUrl }),
    },
    include: {
      task: true,
      studentEnrollment: { include: { student: true } },
    },
  });
};

/**
 * Marca como entregada la StudentTask correspondiente a (idTask, idStudentEnrollment).
 * Si todavía no existe la fila StudentTask, la crea y la entrega en una sola operación.
 * Reutiliza la lógica de validación del submit por id.
 */
export const submitByEnrollment = async (data: {
  idTask: number;
  idStudentEnrollment: number;
  attachmentUrl?: string;
}) => {
  const existing = await prisma.studentTask.findFirst({
    where: {
      idTask: data.idTask,
      idStudentEnrollment: data.idStudentEnrollment,
    },
  });

  if (existing) {
    return submit(existing.id, { attachmentUrl: data.attachmentUrl });
  }

  // Si no había StudentTask aún (alumno sin asignación previa), la creamos PENDING y la entregamos
  const created = await create({
    idTask: data.idTask,
    idStudentEnrollment: data.idStudentEnrollment,
  });
  return submit(created.id, { attachmentUrl: data.attachmentUrl });
};

export const createBulk = async (data: {
  idTask: number;
  enrollmentIds: number[];
}) => {
  const task = await prisma.task.findUnique({ where: { id: data.idTask } });
  if (!task) throw new Error('Tarea no encontrada');

  await prisma.studentTask.createMany({
    data: data.enrollmentIds.map(idStudentEnrollment => ({
      idTask: data.idTask,
      idStudentEnrollment,
      status: 'PENDING' as any,
      isEnabled: true,
    })),
    skipDuplicates: true,
  });

  // createMany no devuelve los registros, hacemos fetch
  return prisma.studentTask.findMany({
    where: { idTask: data.idTask },
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

export const unsubmit = async (id: number) => {
  const studentTask = await prisma.studentTask.findUnique({
    where: { id },
  });
  if (!studentTask) throw new Error('Entrega de estudiante no encontrada');

  return prisma.studentTask.update({
    where: { id },
    data: {
      status: 'PENDING',
      submissionDate: null,
      attachmentUrl: null,
    },
    include: {
      task: true,
      studentEnrollment: { include: { student: true } },
    },
  });
};

export const grade = async (id: number, data: { score: number; feedback?: string }) => {
  const studentTask = await prisma.studentTask.findUnique({
    where: { id },
  });
  if (!studentTask) throw new Error('Entrega de estudiante no encontrada');

  return prisma.studentTask.update({
    where: { id },
    data: {
      status: 'GRADED',
      score: data.score,
      feedback: data.feedback || null,
    },
    include: {
      task: true,
      studentEnrollment: { include: { student: true } },
    },
  });
};
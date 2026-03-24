import { AssistanceStatus } from '@prisma/client';
import prisma from '../../config/prisma.js';
export const findAllByStudentId = async (studentId: number, teacherId?: number) => {
    const whereClause: any = {
        studentEnrollment: { idStudent: studentId },
        OR: [{ status: 'LAG' }, { status: 'MISSING' }, { status: 'JUSTIFY' }]
    };

    if (teacherId) {
        whereClause.session = {
            schedule: {
                teacherAssignment: {
                    idTeacher: teacherId
                }
            }
        };
    }

    return await prisma.assistance.findMany({
        where: whereClause,
        select: {
            id: true,
            status: true,
            session: {
                select: {
                    date: true,
                    schedule: {
                        select: {
                            startTime: true,
                            teacherAssignment: {
                                select: {
                                    subject: {
                                        select: { name: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
};
//actualiza uan asistencia a justify (justifica asistencias)
export const updateStatusToJustified = async (idSession: number, idStudentEnrollment: number) => {
    return await prisma.assistance.update({
        where: {
            idSession_idStudentEnrollment: {
                idSession: idSession,
                idStudentEnrollment: idStudentEnrollment,
            },
        },
        data: {
            status: 'JUSTIFY',
        },
    });
};


export const findAll = async () => {
    return await prisma.assistance.findMany({
        include: {
            session: true,
            studentEnrollment: { include: { student: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const findById = async (id: number) => {
    return await prisma.assistance.findUnique({
        where: { id },
        include: {
            session: true,
            studentEnrollment: { include: { student: true } }
        }
    });
};

export const findAllByStudentEnrollment = async (studentEnrollmentId: number, teacherId?: number) => {
    const whereClause: any = {
        idStudentEnrollment: studentEnrollmentId,
        OR: [{ status: 'LAG' }, { status: 'MISSING' }]
    };

    if (teacherId) {
        whereClause.session = {
            schedule: {
                teacherAssignment: {
                    idTeacher: teacherId
                }
            }
        };
    }

    return await prisma.assistance.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
    });
};

export const findAllBySessionId = async (sessionId: number) => {
    return await prisma.assistance.findMany({
        where: { idSession: sessionId },
        include: {
            session: {
                include: {
                    schedule: {
                        include: {
                            teacherAssignment: {
                                include: {
                                    subject: true
                                }
                            }
                        }
                    }
                }
            },
            studentEnrollment: { include: { student: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const create = async (data: {
    idSession: number;
    idStudentEnrollment: number;
    status?: AssistanceStatus;
}) => {
    return await prisma.assistance.create({
        data: {
            idSession: data.idSession,
            idStudentEnrollment: data.idStudentEnrollment,
            status: data.status || 'PRESENT'
        }
    });
};

export const createMany = async (assistances: {
    idSession: number;
    idStudentEnrollment: number;
    status: AssistanceStatus;
}[]) => {
    return await prisma.assistance.createMany({
        data: assistances,
        skipDuplicates: true
    });
};

export const update = async (id: number, data: { status: AssistanceStatus }) => {
    const exists = await prisma.assistance.findUnique({ where: { id } });
    if (!exists) throw new Error('Asistencia no encontrada');

    return await prisma.assistance.update({
        where: { id },
        data: { status: data.status }
    });
};



export const remove = async (id: number) => {
    const exists = await prisma.assistance.findUnique({ where: { id } });
    if (!exists) throw new Error('Asistencia no encontrada');

    return await prisma.assistance.delete({ where: { id } });
};

export const findAllByTeacher = async (teacherId: number) => {
    return await prisma.assistance.findMany({
        where: {
            session: {
                schedule: {
                    teacherAssignment: {
                        idTeacher: teacherId
                    }
                }
            }
        },
        include: {
            session: true,
            studentEnrollment: { include: { student: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};

export const checkSessionOwnership = async (sessionId: number, teacherId: number): Promise<boolean> => {
    const session = await prisma.sessionClass.findUnique({
        where: { id: sessionId },
        include: { schedule: true }
    });
    if (!session) return false;

    const teacherAssignment = await prisma.teacherOnSubjectOnGroup.findUnique({
        where: { id: session.schedule.idTeacherAssignment }
    });
    return teacherAssignment?.idTeacher === teacherId;
};

export const checkAssistanceOwnership = async (assistanceId: number, teacherId: number): Promise<boolean> => {
    const assistance = await prisma.assistance.findUnique({
        where: { id: assistanceId },
        include: { session: { include: { schedule: true } } }
    });
    if (!assistance) return false;

    const teacherAssignment = await prisma.teacherOnSubjectOnGroup.findUnique({
        where: { id: assistance.session.schedule.idTeacherAssignment }
    });
    return teacherAssignment?.idTeacher === teacherId;
};

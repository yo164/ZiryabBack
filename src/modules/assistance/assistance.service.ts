import { AssistanceStatus } from '@prisma/client';
import prisma from '../../config/prisma.js';
//este find all byIdAlumno nos da las asistencias de un alumno cuyo status sea 'LAG' RETRASO O 'MISSING' PERDIDO (FALTA A CLASE)
export const findAllByStudentId = async (studentId: number) => {
    return await prisma.assistance.findMany({
        where: {
            studentEnrollment: { idStudent: studentId },
            OR: [{ status: 'LAG' }, { status: 'MISSING' }, { status: 'JUSTIFY' }]
        },
        select: {
            id: true,
            status: true,
            session: {
                select: {
                    id: true,
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
export const updateStatusToJustified = async (idAssistance: number) => {
    return await prisma.assistance.update({
        where: {
            id: idAssistance, 
        },
        data: {
            status: 'JUSTIFY',
        },
    });
};

export const updateStatusById = async (id: number, status: AssistanceStatus) => {
    return await prisma.assistance.update({
        where: { id },
        data: { status }
    });
};

export const findAll = async () => {
    return await prisma.assistance.findMany({
        include: {
            session: {
                include: {
                    schedule: {
                        include: {
                            teacherAssignment: {
                                select: {
                                    idTeacher: true,
                                    subject: {
                                        select: { name: true }
                                    }
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

export const findById = async (id: number) => {
    return await prisma.assistance.findUnique({
        where: { id },
        include: {
            session: true,
            studentEnrollment: { include: { student: true } }
        }
    });
};

export const findBySessionId = async (idSession: number) => {
    return await prisma.assistance.findMany({
        where: { idSession },
        include: {
            session: true,
            studentEnrollment: { include: { student: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
};


export const findAllByStudentEnrollment = async (studentEnrollmentId: number) => {
    return await prisma.assistance.findMany({
        where: {
            idStudentEnrollment: studentEnrollmentId,
            OR: [{ status: 'LAG' }, { status: 'MISSING' }]
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




export const remove = async (id: number) => {
    const exists = await prisma.assistance.findUnique({ where: { id } });
    if (!exists) throw new Error('Asistencia no encontrada');

    return await prisma.assistance.delete({ where: { id } });
};

import prisma from '../../config/prisma.js';
//este find all byIdAlumno nos da las asistencias de un alumno cuyo status sea 'LAG' RETRASO O 'MISSING' PERDIDO (FALTA A CLASE)
export const findAllById = async (studentEnrollmentId: number) => {
    return await prisma.assistance.findMany({
        where: {
            idStudentEnrollment: studentEnrollmentId,
            OR: [
                { status: 'LAG' },
                { status: 'MISSING' },
            ],
            
        },
        orderBy: {
            createdAt: 'desc',
        },
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

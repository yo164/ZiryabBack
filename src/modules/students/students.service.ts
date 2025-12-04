import prisma from '../../config/prisma.js';

export const findAll = async () => {
    return await prisma.student.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const findById = async (id: number) => {
    return await prisma.student.findUnique({
        where: { id },
        include: {
            subject: {
                include: {
                    subject: true,
                    group: true,
                },
            },
        },
    });
};

export const create = async (data: {
    email: string;
    name: string;
    surname: string;
    ndSurname?: string;
    birthDate: string | Date;
    dni: string;
}) => {
    return await prisma.student.create({
        data: {
            ...data,
            birthDate: new Date(data.birthDate),
        },
    });
};

export const update = async (
    id: number,
    data: {
        email?: string;
        name?: string;
        surname?: string;
        ndSurname?: string;
        birthDate?: string | Date;
        dni?: string;
    }
) => {
    const exists = await prisma.student.findUnique({ where: { id } });
    if (!exists) {
        throw new Error('Estudiante no encontrado');
    }

    const updateData: any = { ...data };
    if (data.birthDate) {
        updateData.birthDate = new Date(data.birthDate);
    }

    return await prisma.student.update({
        where: { id },
        data: updateData,
    });
};

export const remove = async (id: number) => {
    const exists = await prisma.student.findUnique({ where: { id } });
    if (!exists) {
        throw new Error('Estudiante no encontrado');
    }

    return await prisma.student.delete({
        where: { id },
    });
};

export const findSubjectsByStudentId = async (studentId: number) => {
    const result = await prisma.studentOnSubjectonGroup.findMany({
        where: { idStudent: studentId },
        include: {
            subject: {
                include: {
                    course: true,
                },
            },
            group: true,
        },
    });

    return result.map((item) => ({
        subject: item.subject,
        group: item.group,
        schoolYear: item.schoolYear,
    }));
};
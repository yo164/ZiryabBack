import prisma from '../../config/prisma.js';

export const findAll = async () => {
    return await prisma.teacher.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
};

export const findById = async (id: number) => {
    return await prisma.teacher.findUnique({
        where: { id },
        include: {
            subject: { 
                include: {
                    subject: {
                        include: {
                            course: true 
                        }
                    }
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
    return await prisma.teacher.create({
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
    const exists = await prisma.teacher.findUnique({ where: { id } });
    if (!exists) {
        throw new Error('Profesor no encontrado');
    }

    const updateData: any = { ...data };
    if (data.birthDate) {
        updateData.birthDate = new Date(data.birthDate);
    }

    return await prisma.teacher.update({
        where: { id },
        data: updateData,
    });
};

export const remove = async (id: number) => {
    const exists = await prisma.teacher.findUnique({ where: { id } });
    if (!exists) {
        throw new Error('Profesor no encontrado');
    }

    return await prisma.teacher.delete({
        where: { id },
    });
};

export const findSubjectsByTeacherId = async (teacherId: number) => {
    const result = await prisma.teacherOnSubject.findMany({
        where: { idTeacher: teacherId }, 
        include: {
            subject: {
                include: {
                    course: true,
                },
            },
        },
    });

    return result.map((item) => ({
        subject: item.subject,
        course: item.subject.course
    }));
}; 
import prisma from '../../config/prisma.js';
import { firebaseAdmin } from '../../firebase.js';

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
           assignments: {
            include: {
                subject:{
                    select:{
                        name : true,
                        grade: true,
                        course: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
           }
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
    firebaseUID: string;
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

  try {
        await firebaseAdmin.auth().deleteUser(exists.firebaseUID);
        console.log('✅ Usuario Firebase eliminado:', exists.firebaseUID);
        return await prisma.teacher.delete({
        where: { id },
    }
);
    } catch (err) {
        // ❌ Si falla Firebase, lanzamos error y NO borramos en la BD
        console.error('❌ Error borrando usuario Firebase:', err);
        throw new Error('No se pudo eliminar usuario en Firebase');
    }

    // ------------------------
    // Solo si Firebase fue eliminado, borramos de la BD
    // ------------------------
    
};

export const findSubjectsByTeacherId = async (teacherId: number) => {
    return await prisma.teacherOnSubjectOnGroup.findMany({
        where: { idTeacher: teacherId },
        include: {
            subject: {
                include: {
                    course: true
                }
            },
            group: true
        }
    });
};

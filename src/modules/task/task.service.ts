import { prisma } from '../../config/db.js';

export async function createTask(userId: number, title: string) {
    return (prisma as any).task.create({ data: { userId, title } });
}

export async function listTasks(userId: number) {
    return (prisma as any).task.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
}

export async function getTask(userId: number, id: number) {
    return (prisma as any).task.findFirst({ where: { id, userId } });
}

export async function updateTask(userId: number, id: number, data: any) {
    return (prisma as any).task.updateMany({ where: { id, userId }, data });
}

export async function deleteTask(userId: number, id: number) {
    return (prisma as any).task.deleteMany({ where: { id, userId } });
}

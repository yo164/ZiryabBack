import type { Request, Response } from 'express';
import { createTask, listTasks, getTask, updateTask, deleteTask } from './task.service.js';

export async function listTasksCtrl(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    const tasks = await listTasks(req.user.sub);
    res.json(tasks);
}

export async function createTaskCtrl(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    const task = await createTask(req.user.sub, req.body.title);
    res.status(201).json(task);
}

export async function getTaskCtrl(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    if (!req.params.id) return res.status(400).json({ message: 'ID requerido' });
    const task = await getTask(req.user.sub, parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
}

export async function updateTaskCtrl(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    if (!req.params.id) return res.status(400).json({ message: 'ID requerido' });
    await updateTask(req.user.sub, parseInt(req.params.id), req.body);
    res.json({ message: 'Updated' });
}

export async function deleteTaskCtrl(req: Request, res: Response) {
    if (!req.user) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    if (!req.params.id) return res.status(400).json({ message: 'ID requerido' });
    await deleteTask(req.user.sub, parseInt(req.params.id));
    res.status(204).send();
}

import type { Request, Response } from 'express';
import { TaskType } from '@prisma/client';
import * as taskService from './task.service.js';

// Valores válidos del enum TaskType para validación en runtime
const VALID_TASK_TYPES = Object.values(TaskType);

// ============================================
// HELPERS
// ============================================

/**
 * Extrae el usuario autenticado del request.
 * El middleware `auth` debe haber inyectado `req.user` previamente.
 */
const getRequester = (req: Request) => {
  const user = (req as any).user;
  return {
    requesterId: user?.id as number,
    requesterRole: user?.role as string,
  };
};

// ============================================
// QUERIES
// ============================================

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.findAll();
    res.json({ message: 'Tareas obtenidas correctamente', data: tasks });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '0');

    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const task = await taskService.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea obtenida correctamente', data: task });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
  }
};

export const getTasksByTeacherAssignment = async (req: Request, res: Response) => {
  try {
    const idTeacherAssignment = parseInt(req.params.idTeacherAssignment ?? '0');

    if (!idTeacherAssignment) {
      return res.status(400).json({ message: 'ID de asignación inválido' });
    }

    const tasks = await taskService.findByTeacherAssignment(idTeacherAssignment);
    res.json({ message: 'Tareas obtenidas correctamente', data: tasks });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener tareas del profesor', error: error.message });
  }
};

// ============================================
// MUTACIONES
// ============================================

export const createTask = async (req: Request, res: Response) => {
  try {
    const { idTeacherAssignment, title, type, startDate, dueDate, schoolYear, description, attachmentUrl } = req.body;

    // — Validación de campos obligatorios —
    const missing = ['idTeacherAssignment', 'title', 'type', 'startDate', 'dueDate', 'schoolYear']
      .filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');

    if (missing.length > 0) {
      return res.status(400).json({
        message: 'Faltan campos obligatorios',
        fields: missing,
      });
    }

    // — Validación de tipo —
    if (!VALID_TASK_TYPES.includes(type)) {
      return res.status(400).json({
        message: `Tipo de tarea inválido. Valores permitidos: ${VALID_TASK_TYPES.join(', ')}`,
      });
    }

    // — Validación de formato de fechas —
    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ message: 'Formato de fecha inválido. Use ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)' });
    }

    const newTask = await taskService.create({
      idTeacherAssignment: parseInt(idTeacherAssignment),
      title,
      description,
      type,
      startDate,
      dueDate,
      attachmentUrl,
      schoolYear,
    });

    res.status(201).json({ message: 'Tarea creada correctamente', data: newTask });
  } catch (error: any) {
    const status = error.message.includes('no existe') ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '0');

    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { type, startDate, dueDate } = req.body;

    // — Validación de tipo si se envía —
    if (type !== undefined && !VALID_TASK_TYPES.includes(type)) {
      return res.status(400).json({
        message: `Tipo de tarea inválido. Valores permitidos: ${VALID_TASK_TYPES.join(', ')}`,
      });
    }

    // — Validación de formato de fechas si se envían —
    if (startDate !== undefined && isNaN(Date.parse(startDate))) {
      return res.status(400).json({ message: 'Formato de startDate inválido. Use ISO 8601' });
    }
    if (dueDate !== undefined && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ message: 'Formato de dueDate inválido. Use ISO 8601' });
    }

    const { requesterId, requesterRole } = getRequester(req);

    const updatedTask = await taskService.update(id, req.body, requesterId, requesterRole);

    res.json({ message: 'Tarea actualizada correctamente', data: updatedTask });
  } catch (error: any) {
    if (error.message === 'Tarea no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('permiso')) {
      return res.status(403).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id ?? '0');

    if (!id) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const { requesterId, requesterRole } = getRequester(req);

    await taskService.remove(id, requesterId, requesterRole);

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error: any) {
    if (error.message === 'Tarea no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message.includes('permiso')) {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
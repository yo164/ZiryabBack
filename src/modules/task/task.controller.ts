import type { Request, Response } from 'express';
import { TaskType } from '@prisma/client';
import * as taskService from './task.service.js';

const VALID_TASK_TYPES = Object.values(TaskType);

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
    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tareas',
      error: error.message,
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const task = await taskService.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tarea',
      error: error.message,
    });
  }
};

export const getTasksByTeacherAssignment = async (req: Request, res: Response) => {
  try {
    const idTeacherAssignment = parseInt(req.params.idTeacherAssignment || '0');

    if (isNaN(idTeacherAssignment) || idTeacherAssignment === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de asignación inválido',
      });
    }

    const tasks = await taskService.findByTeacherAssignment(idTeacherAssignment);

    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tareas del profesor',
      error: error.message,
    });
  }
};

// ============================================
// MUTACIONES
// ============================================

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      idTeacherAssignment,
      title,
      type,
      startDate,
      dueDate,
      schoolYear,
      description,
      attachmentUrl,
      idTaskGroup,
    } = req.body;

    const missing = ['idTeacherAssignment', 'title', 'type', 'startDate', 'dueDate', 'schoolYear']
      .filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === '');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios',
        fields: missing,
      });
    }

    if (!VALID_TASK_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Tipo de tarea inválido. Valores permitidos: ${VALID_TASK_TYPES.join(', ')}`,
      });
    }

    if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        success: false,
        message: 'Formato de fecha inválido. Use ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)',
      });
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
      ...(idTaskGroup && { idTaskGroup: parseInt(idTaskGroup) }),
    });

    res.status(201).json({
      success: true,
      message: 'Tarea creada exitosamente',
      data: newTask,
    });
  } catch (error: any) {
    if (error.message === 'La asignación de profesor no existe') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al crear tarea',
      error: error.message,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const { type, startDate, dueDate } = req.body;

    if (type !== undefined && !VALID_TASK_TYPES.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Tipo de tarea inválido. Valores permitidos: ${VALID_TASK_TYPES.join(', ')}`,
      });
    }

    if (startDate !== undefined && isNaN(Date.parse(startDate))) {
      return res.status(400).json({
        success: false,
        message: 'Formato de startDate inválido. Use ISO 8601',
      });
    }

    if (dueDate !== undefined && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        success: false,
        message: 'Formato de dueDate inválido. Use ISO 8601',
      });
    }

    const { requesterId, requesterRole } = getRequester(req);
    const updatedTask = await taskService.update(id, req.body, requesterId, requesterRole);

    res.json({
      success: true,
      message: 'Tarea actualizada exitosamente',
      data: updatedTask,
    });
  } catch (error: any) {
    if (error.message === 'Tarea no encontrada') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('permiso')) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al actualizar tarea',
      error: error.message,
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const { requesterId, requesterRole } = getRequester(req);
    await taskService.remove(id, requesterId, requesterRole);

    res.json({
      success: true,
      message: 'Tarea eliminada exitosamente',
    });
  } catch (error: any) {
    if (error.message === 'Tarea no encontrada') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('permiso')) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar tarea',
      error: error.message,
    });
  }
};
import type { Request, Response } from 'express';
import * as taskService from './task.service.js';

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

export const createTask = async (req: Request, res: Response) => {
  try {
    const taskData = req.body;
    const newTask = await taskService.create(taskData);

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error: any) {
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

    const updatedTask = await taskService.update(id, req.body);

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

    await taskService.remove(id);

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

    res.status(500).json({
      success: false,
      message: 'Error al eliminar tarea',
      error: error.message,
    });
  }
};
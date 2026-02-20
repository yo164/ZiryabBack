import type { Request, Response } from 'express';
import * as studentTaskService from './student-task.service.js';

export const getAllStudentTasks = async (req: Request, res: Response) => {
  try {
    const studentTasks = await studentTaskService.findAll();
    res.json({
      success: true,
      data: studentTasks,
      count: studentTasks.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener entregas',
      error: error.message,
    });
  }
};

export const getStudentTaskById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const studentTask = await studentTaskService.findById(id);

    if (!studentTask) {
      return res.status(404).json({
        success: false,
        message: 'Entrega no encontrada',
      });
    }

    res.json({
      success: true,
      data: studentTask,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener entrega',
      error: error.message,
    });
  }
};

export const getStudentTasksByTask = async (req: Request, res: Response) => {
  try {
    const idTask = parseInt(req.params.idTask || '0');

    if (isNaN(idTask) || idTask === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de tarea inválido',
      });
    }

    const studentTasks = await studentTaskService.findByTask(idTask);

    res.json({
      success: true,
      data: studentTasks,
      count: studentTasks.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener entregas de la tarea',
      error: error.message,
    });
  }
};

export const getStudentTasksByStudent = async (req: Request, res: Response) => {
  try {
    const idStudentEnrollment = parseInt(req.params.idStudentEnrollment || '0');

    if (isNaN(idStudentEnrollment) || idStudentEnrollment === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID de enrollment inválido',
      });
    }

    const studentTasks = await studentTaskService.findByStudent(idStudentEnrollment);

    res.json({
      success: true,
      data: studentTasks,
      count: studentTasks.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener entregas del estudiante',
      error: error.message,
    });
  }
};

export const updateStudentTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const updatedStudentTask = await studentTaskService.update(id, req.body);

    res.json({
      success: true,
      message: 'Entrega actualizada exitosamente',
      data: updatedStudentTask,
    });
  } catch (error: any) {
    if (error.message === 'Entrega de estudiante no encontrada') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al actualizar entrega',
      error: error.message,
    });
  }
};

export const deleteStudentTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    await studentTaskService.remove(id);

    res.json({
      success: true,
      message: 'Entrega eliminada exitosamente',
    });
  } catch (error: any) {
    if (error.message === 'Entrega de estudiante no encontrada') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar entrega',
      error: error.message,
    });
  }
};
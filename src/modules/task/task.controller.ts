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
    // 1. Clona los datos que llegan (porque si vienen en FormData, todo es texto)
    const taskData = { ...req.body };
    
    // 2. Si el profesor está creando esto, el ID viene como texto, lo forzamos a número para evitar errores en Prisma
    if (taskData.idTeacherAssignment) {
        taskData.idTeacherAssignment = Number(taskData.idTeacherAssignment);
    }
    
    // 3. Si Multer ha procesado un fichero adjunto, guarda la ruta local generada
    // Así Prisma sabrá exactamente dónde se guardó nuestro archivo en el servidor.
    if (req.file) {
      taskData.attachmentUrl = `/uploads/tasks/${req.file.filename}`;
    }

    // 4. Se lo pasamos al servicio para ejecutar el guardado en base de datos
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

    // 1. Clonar datos y forzar la conversión de idTeacherAssignment a número si ha llegado como texto (FormData)
    const taskData = { ...req.body };
    if (taskData.idTeacherAssignment) {
        taskData.idTeacherAssignment = Number(taskData.idTeacherAssignment);
    }
    
    // 2. Si el profesor modificó el archivo y subió uno nuevo, sobreescribimos la ruta en base de datos
    if (req.file) {
      taskData.attachmentUrl = `/uploads/tasks/${req.file.filename}`;
    }

    // 3. Guardar cambios en base de datos
    const updatedTask = await taskService.update(id, taskData);

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
import type { Request, Response } from 'express';
import * as courseService from './course.service.js';

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseService.findAll();
    res.json({
      success: true,
      data: courses,
      count: courses.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cursos',
      error: error.message,
    });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const course = await courseService.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado',
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener curso',
      error: error.message,
    });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const courseData = req.body;
    const newCourse = await courseService.create(courseData);

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: newCourse,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error al crear curso',
      error: error.message,
    });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const courseData = req.body;
    const updatedCourse = await courseService.update(id, courseData);

    res.json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: updatedCourse,
    });
  } catch (error: any) {
    if (error.message === 'Curso no encontrado') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al actualizar curso',
      error: error.message,
    });
  }
};

export const patchCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    const updatedCourse = await courseService.patch(id, req.body);

    res.json({
      success: true,
      message: 'Curso actualizado parcialmente',
      data: updatedCourse,
    });
  } catch (error: any) {
    if (error.message === 'Curso no encontrado') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error al actualizar curso',
      error: error.message,
    });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');

    if (isNaN(id) || id === 0) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido',
      });
    }

    await courseService.remove(id);

    res.json({
      success: true,
      message: 'Curso eliminado exitosamente',
    });
  } catch (error: any) {
    if (error.message === 'Curso no encontrado') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al eliminar curso',
      error: error.message,
    });
  }
};

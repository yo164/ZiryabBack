import type { Request, Response } from 'express';
import * as enrollmentService from './enrollments.service.js';


export const getAllEnrollmentsRaw = async (req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments();
    res.json({
      success: true,
      data: enrollments,
      count: enrollments.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cursos',
      error: error.message,
    });
  }
};

export const getAllEnrollments = async (req: Request, res: Response) => {
  try {
    const { idSubject, idGroup, schoolYear } = req.query;

    const enrollments = await enrollmentService.getEnrollmentsByFilters(
      parseInt(idSubject as string),
      parseInt(idGroup as string),
      schoolYear as string
    );

    res.json({
      success: true,
      data: enrollments,
      count: enrollments.length,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener enrollments',
      error: error.message,
    });
  }
};


/**
 * GET /api/assignments/:idTeacher?schoolYear=2024-2025
 */
export const getAssignmentsByTeacher = async (req: Request, res: Response) => {
  try {
    const idTeacher = parseInt(req.params.idTeacher || '0');
    const schoolYear = req.query.schoolYear as string;

    if (isNaN(idTeacher) || idTeacher === 0) {
      res.status(400).json({
        success: false,
        message: 'ID de profesor inválido'
      });
      return;
    }

    if (!schoolYear) {
      res.status(400).json({
        success: false,
        message: 'schoolYear requerido'
      });
      return;
    }

    const assignments = await enrollmentService.getAssignmentsByTeacher(
      idTeacher,
      schoolYear
    );

    res.json({
      success: true,
      data: assignments,
      count: assignments.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaciones',
      error: error.message
    });
  }
};
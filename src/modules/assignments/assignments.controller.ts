import type { Request, Response } from 'express';
import * as assignmentsService from './assignments.service.js';

export const getAllAssignments = async (_req: Request, res: Response) => {
  try {
    const assignments = await assignmentsService.findAllAssignments();
    res.json({
      success: true,
      data: assignments,
      count: assignments.length,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaciones',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

export const getAssignmentsByTeacher = async (req: Request, res: Response) => {
  try {
    const idTeacher = parseInt(req.params.idTeacher || '0', 10);
    const schoolYear = req.query.schoolYear as string;

    if (Number.isNaN(idTeacher) || idTeacher === 0) {
      res.status(400).json({
        success: false,
        message: 'ID de profesor inválido',
      });
      return;
    }

    if (!schoolYear) {
      res.status(400).json({
        success: false,
        message: 'schoolYear requerido',
      });
      return;
    }

    const assignments = await assignmentsService.findAssignmentsByTeacher(
      idTeacher,
      schoolYear,
    );

    res.json({
      success: true,
      data: assignments,
      count: assignments.length,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaciones del profesor',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

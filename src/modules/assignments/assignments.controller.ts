import type { Request, Response } from 'express';
import * as assignmentsService from './assignments.service.js';
import {
  createAssignmentBodySchema,
  createAssignmentsBulkBodySchema,
} from './assignments.schema.js';

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

export const postAssignment = async (req: Request, res: Response) => {
  const parsed = createAssignmentBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Cuerpo inválido',
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const result = await assignmentsService.createAssignment(parsed.data);
    if (result.kind === 'duplicate') {
      res.status(409).json({
        success: false,
        message:
          'Ya existe una asignación para esta asignatura, grupo y curso escolar',
        data: { existingId: result.existing.id },
      });
      return;
    }
    if (result.kind === 'error') {
      res.status(400).json({ success: false, message: result.message });
      return;
    }

    res.status(201).json({
      success: true,
      message: 'Asignación creada',
      data: result.assignment,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Error al crear asignación',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

export const postAssignmentsBulk = async (req: Request, res: Response) => {
  const parsed = createAssignmentsBulkBodySchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: 'Cuerpo inválido',
      errors: parsed.error.flatten(),
    });
    return;
  }

  try {
    const summary = await assignmentsService.createAssignmentsBulk(parsed.data.assignments);
    const parts: string[] = [];
    if (summary.created.length) {
      parts.push(`${summary.created.length} creadas`);
    }
    if (summary.duplicates.length) {
      parts.push(`${summary.duplicates.length} duplicadas`);
    }
    if (summary.errors.length) {
      parts.push(`${summary.errors.length} con error`);
    }

    res.status(200).json({
      success: true,
      message: parts.length ? `Resultado: ${parts.join(', ')}` : 'Sin filas procesadas',
      data: summary,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Error en alta masiva de asignaciones',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

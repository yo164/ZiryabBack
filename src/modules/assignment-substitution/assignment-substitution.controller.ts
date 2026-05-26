import type { Request, Response } from 'express';
import * as substitutionService from './assignment-substitution.service.js';

// GET ALL
export const getAllSubstitutions = async (req: Request, res: Response) => {
  try {
    const data = await substitutionService.findAll();
    res.json({ success: true, data, count: data.length });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sustituciones',
      error: error.message,
    });
  }
};

// GET BY ID
export const getSubstitutionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const data = await substitutionService.findById(id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Sustitución no encontrada' });
    }

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener sustitución',
      error: error.message,
    });
  }
};

// GET BY ASSIGNMENT — historial de un assignment concreto
export const getSubstitutionsByAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentId = parseInt(req.params.assignmentId || '0');
    if (isNaN(assignmentId) || assignmentId === 0) {
      return res.status(400).json({ success: false, message: 'ID de assignment inválido' });
    }

    const data = await substitutionService.findByAssignmentId(assignmentId);
    res.json({ success: true, data, count: data.length });
  } catch (error: any) {
    if (error.message === 'Assignment no encontrado') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: 'Error al obtener historial de sustituciones',
      error: error.message,
    });
  }
};

// POST
export const createSubstitution = async (req: Request, res: Response) => {
  try {
    const data = await substitutionService.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Sustitución creada exitosamente',
      data,
    });
  } catch (error: any) {
    if (error.message === 'Assignment no encontrado') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(400).json({
      success: false,
      message: 'Error al crear sustitución',
      error: error.message,
    });
  }
};

// PUT
export const updateSubstitution = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const data = await substitutionService.update(id, req.body);
    res.json({
      success: true,
      message: 'Sustitución actualizada exitosamente',
      data,
    });
  } catch (error: any) {
    if (error.message === 'Sustitución no encontrada') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(400).json({
      success: false,
      message: 'Error al actualizar sustitución',
      error: error.message,
    });
  }
};

// PATCH
export const patchSubstitution = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const data = await substitutionService.patch(id, req.body);
    res.json({
      success: true,
      message: 'Sustitución actualizada parcialmente',
      data,
    });
  } catch (error: any) {
    if (error.message === 'Sustitución no encontrada') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(400).json({
      success: false,
      message: 'Error al actualizar sustitución',
      error: error.message,
    });
  }
};

// DELETE
export const deleteSubstitution = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const data = await substitutionService.remove(id);
    res.json({
      success: true,
      message: 'Sustitución eliminada exitosamente',
      data,
    });
  } catch (error: any) {
    if (error.message === 'Sustitución no encontrada') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({
      success: false,
      message: 'Error al eliminar sustitución',
      error: error.message,
    });
  }
};

// PATCH /:id/close — cierra la sustitución y reactiva al titular
export const closeSubstitution = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    const { endDate } = req.body;
    if (!endDate) {
      return res.status(400).json({ success: false, message: 'endDate es obligatorio' });
    }

    const data = await substitutionService.closeSubstitution(id, new Date(endDate));
    res.json({
      success: true,
      message: 'Sustitución cerrada y titular reactivado',
      data,
    });
  } catch (error: any) {
    if (error.message === 'Sustitución no encontrada') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(400).json({
      success: false,
      message: 'Error al cerrar sustitución',
      error: error.message,
    });
  }
};
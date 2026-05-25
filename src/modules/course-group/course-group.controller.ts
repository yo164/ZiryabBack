import type { Request, Response } from 'express';
import * as cgService from './course-group.service.js';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await cgService.findAll();
    res.json({ success: true, data, count: data.length });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error al obtener clases', error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

    const data = await cgService.findById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Clase no encontrada' });

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Error al obtener clase', error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { idCourse, idGroup, grade } = req.body as { idCourse: number; idGroup: number; grade: string };
    if (!grade) return res.status(400).json({ success: false, message: 'El campo grade ("1" o "2") es obligatorio' });
    const data = await cgService.upsert(idCourse, idGroup, grade);
    res.status(201).json({ success: true, data });
  } catch (error: any) {
    const status = error.message.includes('no encontrado') ? 404 : 400;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const getEligibleTutors = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

    const data = await cgService.eligibleTutors(id);
    res.json({ success: true, data, count: data.length });
  } catch (error: any) {
    const status = error.message === 'Clase no encontrada' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const assignTutor = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

    const { tutorId } = req.body as { tutorId: number | null };
    const data = await cgService.assignTutor(id, tutorId ?? null);

    res.json({
      success: true,
      message: tutorId ? 'Tutor asignado' : 'Tutor eliminado',
      data,
    });
  } catch (error: any) {
    if (error.message.includes('no encontrad')) {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes('ya es tutor')) {
      return res.status(409).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

    await cgService.remove(id);
    res.json({ success: true, message: 'Clase eliminada' });
  } catch (error: any) {
    const status = error.message === 'Clase no encontrada' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

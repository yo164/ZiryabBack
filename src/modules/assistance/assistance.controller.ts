import type { Request, Response } from 'express';
import * as assistanceService from './assistance.service.js';

export const getAll = async (req: Request, res: Response) => {
    try {
        const assistances = await assistanceService.findAll();
        res.json({ success: true, data: assistances, count: assistances.length });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al obtener asistencias', error: error.message });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');
        if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

        const assistance = await assistanceService.findById(id);
        if (!assistance) return res.status(404).json({ success: false, message: 'Asistencia no encontrada' });

        res.json({ success: true, data: assistance });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al obtener asistencia', error: error.message });
    }
};

export const getByStudentEnrollment = async (req: Request, res: Response) => {
    try {
        const studentEnrollmentId = parseInt(req.params.idStudentEnrollment || '0');
        if (isNaN(studentEnrollmentId) || studentEnrollmentId === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

        const assistances = await assistanceService.findAllByStudentEnrollment(studentEnrollmentId);
        res.json({ success: true, data: assistances, count: assistances.length });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al obtener asistencias', error: error.message });
    }
};

export const getByStudentId = async (req: Request, res: Response) => {
    try {
        const studentId = parseInt(req.params.idStudent || '0');
        if (isNaN(studentId) || studentId === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

        const assistances = await assistanceService.findAllByStudentId(studentId);
        res.json({ success: true, data: assistances, count: assistances.length });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Error al obtener asistencias del alumno', error: error.message });
    }
};

export const createOne = async (req: Request, res: Response) => {
    try {
        const assistance = await assistanceService.create(req.body);
        res.status(201).json({ success: true, data: assistance });
    } catch (error: any) {
        res.status(400).json({ success: false, message: 'Error al crear asistencia', error: error.message });
    }
};

export const createBulk = async (req: Request, res: Response) => {
    try {
        const { assistances } = req.body;
        if (!Array.isArray(assistances) || assistances.length === 0) {
            return res.status(400).json({ success: false, message: 'Lista de asistencias vacía o inválida' });
        }

        const result = await assistanceService.createMany(assistances);
        res.status(201).json({ success: true, count: result.count });
    } catch (error: any) {
        res.status(400).json({ success: false, message: 'Error al crear asistencias', error: error.message });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');
        if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

        const updated = await assistanceService.update(id, req.body);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        if (error.message === 'Asistencia no encontrada') return res.status(404).json({ success: false, message: error.message });
        res.status(400).json({ success: false, message: 'Error al actualizar asistencia', error: error.message });
    }
};

export const justify = async (req: Request, res: Response) => {
    try {
        const { idSession, idStudentEnrollment } = req.body;
        const updated = await assistanceService.updateStatusToJustified(idSession, idStudentEnrollment);
        res.json({ success: true, data: updated });
    } catch (error: any) {
        res.status(400).json({ success: false, message: 'Error al justificar asistencia', error: error.message });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');
        if (isNaN(id) || id === 0) return res.status(400).json({ success: false, message: 'ID inválido' });

        await assistanceService.remove(id);
        res.json({ success: true, message: 'Asistencia eliminada' });
    } catch (error: any) {
        if (error.message === 'Asistencia no encontrada') return res.status(404).json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: 'Error al eliminar asistencia', error: error.message });
    }
};
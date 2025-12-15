import type { Request, Response } from 'express';
import * as teacherService from './teachers.service.js';

export const getAllTeacher = async (req: Request, res: Response) => {
    try {
        const teacher = await teacherService.findAll();
        res.json({
            success: true,
            data: teacher,
            count: teacher.length,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener profesores',
            error: error.message,
        });
    }
};

export const getTeacherById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');

        if (isNaN(id) || id === 0) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido',
            });
        }

        const teacher = await teacherService.findById(id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado',
            });
        }

        res.json({
            success: true,
            data: teacher,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener profesor',
            error: error.message,
        });
    }
};

export const createTeacher = async (req: Request, res: Response) => {
    try {
        const teacherData = req.body;
        const newTeacher = await teacherService.create(teacherData);

        res.status(201).json({
            success: true,
            message: 'Profesor creado exitosamente',
            data: newTeacher,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: 'Error al crear Profesor',
            error: error.message,
        });
    }
};

export const updateTeacher = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');

        if (isNaN(id) || id === 0) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido',
            });
        }

        const teacherData = req.body;
        const updatedTeacher = await teacherService.update(id, teacherData);

        res.json({
            success: true,
            message: 'Profesor actualizado exitosamente',
            data: updatedTeacher,
        });
    } catch (error: any) {
        if (error.message === 'Profesor no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(400).json({
            success: false,
            message: 'Error al actualizar profesor',
            error: error.message,
        });
    }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');

        if (isNaN(id) || id === 0) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido',
            });
        }

        await teacherService.remove(id);

        res.json({
            success: true,
            message: 'Profesor eliminado exitosamente',
        });
    } catch (error: any) {
        if (error.message === 'Profesor no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error al eliminar profesor',
            error: error.message,
        });
    }
};

export const getTeacherSubjects = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id || '0');

        if (isNaN(id) || id === 0) {
            return res.status(400).json({
                success: false,
                message: 'ID inválido',
            });
        }

        const subjects = await teacherService.findSubjectsByTeacherId(id);

        res.json({
            success: true,
            data: subjects,
            count: subjects.length,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener asignaturas del profesor',
            error: error.message,
        });
    }
};
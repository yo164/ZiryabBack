import type { Request, Response } from 'express';
import * as assistanceService from './assistance.service.js';

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await assistanceService.findAll();
        res.json({
            success: true,
            data: admins,
            count: admins.length,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener administradores',
            error: error.message,
        });
    }
};
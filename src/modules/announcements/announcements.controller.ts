import type { Request, Response } from 'express';
import * as announcementsService from './announcements.service.js';
import { logger } from '../../utils/logger.js';

const getRequester = (req: Request) => ({
  id: req.user?.sub,
  role: req.user?.role,
});

/**
 * Obtener todos los anuncios
 */
export const getAnnouncements = async (_req: Request, res: Response) => {
  try {
    const announcements = await announcementsService.findAll();
    return res.status(200).json({
      success: true,
      data: announcements,
    });
  } catch (error: any) {
    logger.error('Error al obtener anuncios:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los anuncios de la plataforma',
      error: error.message,
    });
  }
};

/**
 * Crear un nuevo anuncio (solo Profesores o Admins)
 */
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body;
    const { id: requesterId, role: requesterRole } = getRequester(req);

    if (!requesterId) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado. Faltan credenciales de usuario.',
      });
    }

    // El middleware authorize ya garantiza que sea TEACHER o ADMIN, pero hacemos validación defensiva
    if (requesterRole !== 'TEACHER' && requesterRole !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Solo profesores o administradores pueden crear anuncios.',
      });
    }

    const newAnnouncement = await announcementsService.create({
      title,
      body,
      createdByUserId: requesterId,
    });

    logger.info(`Anuncio creado con éxito por el usuario ${requesterId} (${requesterRole}): "${title}"`);

    return res.status(201).json({
      success: true,
      message: 'Anuncio publicado exitosamente',
      data: newAnnouncement,
    });
  } catch (error: any) {
    logger.error('Error al crear anuncio:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al publicar el anuncio en la plataforma',
      error: error.message,
    });
  }
};

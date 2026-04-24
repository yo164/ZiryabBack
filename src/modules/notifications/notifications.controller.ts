import type { Request, Response } from 'express';
import * as notificationsService from './notifications.service.js';

const parsePositiveInt = (value: unknown, defaultValue: number): number | null => {
  if (value === undefined || value === null || value === '') return defaultValue;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
};

const getRequesterFirebaseUID = (req: Request): string | null => {
  return req.user?.firebaseUID ?? null;
};

export const getNotifications = async (req: Request, res: Response) => {
  const requesterFirebaseUID = getRequesterFirebaseUID(req);
  if (!requesterFirebaseUID) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const page = parsePositiveInt(req.query.page, 1);
  const limit = parsePositiveInt(req.query.limit, 10);

  if (page === null || limit === null) {
    return res.status(400).json({
      message: 'Parámetros de paginación inválidos. page y limit deben ser enteros positivos',
    });
  }

  try {
    const result = await notificationsService.findForRecipient(requesterFirebaseUID, page, limit);
    return res.status(200).json({
      message: 'Notificaciones obtenidas correctamente',
      data: result.notifications,
      pagination: result.pagination,
    });
  } catch {
    return res.status(500).json({ message: 'Error al obtener notificaciones' });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const requesterFirebaseUID = getRequesterFirebaseUID(req);
  if (!requesterFirebaseUID) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const id = parsePositiveInt(req.params.id, 0);
  if (!id) {
    return res.status(400).json({ message: 'ID de notificación inválido' });
  }

  try {
    const updated = await notificationsService.markAsRead(id, requesterFirebaseUID);
    return res.status(200).json({
      message: 'Notificación marcada como leída',
      data: updated,
    });
  } catch (error) {
    if ((error as Error).message === 'NOT_FOUND') {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    return res.status(500).json({ message: 'Error al marcar notificación como leída' });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  const requesterFirebaseUID = getRequesterFirebaseUID(req);
  if (!requesterFirebaseUID) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const { recipientFirebaseUID, title, message, type } = req.body as {
    recipientFirebaseUID?: string;
    title?: string;
    message?: string;
    type?: string;
  };

  const finalRecipient = recipientFirebaseUID?.trim() || requesterFirebaseUID;

  if (!title?.trim() || !message?.trim()) {
    return res.status(400).json({
      message: 'Los campos title y message son obligatorios',
    });
  }

  if (finalRecipient !== requesterFirebaseUID && req.user?.role !== 'ADMIN') {
    return res.status(403).json({
      message: 'Solo un ADMIN puede crear notificaciones para otros usuarios',
    });
  }

  try {
    const created = await notificationsService.create({
      recipientFirebaseUID: finalRecipient,
      title: title.trim(),
      message: message.trim(),
      type,
    });
    return res.status(201).json({
      message: 'Notificación creada correctamente',
      data: created,
    });
  } catch {
    return res.status(500).json({ message: 'Error al crear notificación' });
  }
};

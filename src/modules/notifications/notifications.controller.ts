import type { Request, Response } from 'express';
import * as notificationsService from './notifications.service.js';
import { registerClient, removeClient } from './notifications.sse.js';
import { logger } from '../../utils/logger.js';

const parsePositiveInt = (value: unknown, defaultValue: number): number | null => {
  if (value === undefined || value === null || value === '') return defaultValue;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
};

const getRequesterFirebaseUID = (req: Request): string | null => {
  return req.user?.firebaseUID ?? null;
};

/**
 * SSE: mantiene abierta una conexión `text/event-stream` y envía ping periódico.
 */
export const subscribe = (req: Request, res: Response): void => {
  const firebaseUID = getRequesterFirebaseUID(req);
  if (!firebaseUID) {
    res.status(401).json({ message: 'No autorizado' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  if (typeof (res as unknown as { flushHeaders?: () => void }).flushHeaders === 'function') {
    (res as unknown as { flushHeaders: () => void }).flushHeaders();
  }

  registerClient(firebaseUID, res);

  res.write('event: connected\ndata: {}\n\n');

  const heartbeat = setInterval(() => {
    if (res.writableEnded || !res.writable) return;
    res.write(': ping\n\n');
  }, 30_000);

  const cleanup = (): void => {
    clearInterval(heartbeat);
    removeClient(firebaseUID, res);
    if (!res.writableEnded && res.writable) {
      try {
        res.end();
      } catch {
        // ignore
      }
    }
  };

  req.on('close', cleanup);
  req.on('aborted', cleanup);
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
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error('Error al obtener notificaciones', { message: err.message, stack: err.stack });
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

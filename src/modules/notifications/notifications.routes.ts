import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import * as notificationsController from './notifications.controller.js';

const router = Router();

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Lista las notificaciones del usuario autenticado
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Lista paginada de notificaciones
 *       400:
 *         description: Parámetros inválidos
 *       401:
 *         description: No autorizado
 */
router.get('/', auth, notificationsController.getNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Marca una notificación como leída
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificación actualizada
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Notificación no encontrada
 */
router.patch('/:id/read', auth, notificationsController.markNotificationAsRead);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Crea una notificación
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, message]
 *             properties:
 *               recipientFirebaseUID:
 *                 type: string
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notificación creada
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Prohibido
 */
router.post('/', auth, notificationsController.createNotification);

export default router;

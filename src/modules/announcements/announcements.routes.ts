import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { createAnnouncementSchema } from './announcements.schema.js';
import * as announcementsController from './announcements.controller.js';

const router = Router();

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     summary: Obtener todos los anuncios
 *     description: Retorna la lista de todos los anuncios de la plataforma ordenados descendentemente por fecha de publicación.
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de anuncios devuelta con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       body:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       createdByUserId:
 *                         type: integer
 *                       creator:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           surname:
 *                             type: string
 *                           email:
 *                             type: string
 *       401:
 *         description: No autorizado (falta token o es inválido)
 *       500:
 *         description: Error del servidor al procesar la solicitud
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), announcementsController.getAnnouncements);

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     summary: Publicar un nuevo anuncio
 *     description: Permite a un profesor o administrador publicar un anuncio en el tablón general.
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cambio de aula"
 *               body:
 *                 type: string
 *                 example: "La clase de lenguaje musical se impartirá temporalmente en el aula 104."
 *     responses:
 *       201:
 *         description: Anuncio publicado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Anuncio publicado exitosamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     body:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     createdByUserId:
 *                       type: integer
 *       400:
 *         description: Error de validación (título o cuerpo vacíos)
 *       401:
 *         description: No autorizado (falta token o es inválido)
 *       403:
 *         description: Acceso prohibido (usuario no tiene rol de profesor o admin)
 *       500:
 *         description: Error interno del servidor al guardar el anuncio
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), validate(createAnnouncementSchema), announcementsController.createAnnouncement);

export default router;

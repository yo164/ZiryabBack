import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as cgController from './course-group.controller.js';

const router = Router();

/**
 * @swagger
 * /api/course-groups:
 *   get:
 *     summary: Listar clases (ciclo + grupo + tutor)
 *     tags: [CourseGroups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de course-groups
 *   post:
 *     summary: Crear combinación ciclo-grupo
 *     tags: [CourseGroups]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Clase creada
 */
router.get('/', auth, authorize(['ADMIN']), cgController.getAll);
router.post('/', auth, authorize(['ADMIN']), cgController.create);

/**
 * @swagger
 * /api/course-groups/{id}/eligible-tutors:
 *   get:
 *     summary: Profesores elegibles como tutor
 *     tags: [CourseGroups]
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
 *         description: Lista de tutores candidatos
 */
router.get('/:id/eligible-tutors', auth, authorize(['ADMIN']), cgController.getEligibleTutors);

/**
 * @swagger
 * /api/course-groups/{id}/tutor:
 *   patch:
 *     summary: Asignar o quitar tutor
 *     tags: [CourseGroups]
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
 *         description: Tutor actualizado
 */
router.patch('/:id/tutor', auth, authorize(['ADMIN']), cgController.assignTutor);

/**
 * @swagger
 * /api/course-groups/{id}:
 *   get:
 *     summary: Obtener clase por ID
 *     tags: [CourseGroups]
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
 *         description: Clase encontrada
 *   delete:
 *     summary: Eliminar combinación ciclo-grupo
 *     tags: [CourseGroups]
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
 *         description: Clase eliminada
 */
router.get('/:id', auth, authorize(['ADMIN']), cgController.getById);
router.delete('/:id', auth, authorize(['ADMIN']), cgController.deleteOne);

export default router;

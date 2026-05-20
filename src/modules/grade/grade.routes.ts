import { Router } from 'express';
import * as gradeController from './grade.controller.js';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { validate } from '../../middleware/validate.js';
import { CreateGradeSchema, BulkCreateGradesSchema } from './grade.schema.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Gestión de notas por tutores
 */

/**
 * @swagger
 * /api/grades/my:
 *   get:
 *     summary: Obtener mis notas (como alumno)
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Lista de notas
 */
router.get('/my', auth, authorize(['STUDENT']), gradeController.getMyGrades);

/**
 * @swagger
 * /api/grades/tutored-groups:
 *   get:
 *     summary: Obtener grupos de los que soy tutor
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Lista de grupos
 */
router.get('/tutored-groups', auth, authorize(['TEACHER']), gradeController.getTutoredGroups);

/**
 * @swagger
 * /api/grades/group/{idGroup}/period/{period}:
 *   get:
 *     summary: Obtener notas de un grupo para un periodo
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Lista de notas
 */
router.get('/group/:idGroup/period/:period', auth, authorize(['TEACHER']), gradeController.getGradesByGroupAndPeriod);

/**
 * @swagger
 * /api/grades:
 *   post:
 *     summary: Crear o actualizar una nota
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Nota guardada
 */
router.post('/', auth, authorize(['TEACHER']), validate(CreateGradeSchema), gradeController.upsertGrade);

/**
 * @swagger
 * /api/grades/bulk:
 *   post:
 *     summary: Crear o actualizar varias notas
 *     tags: [Grades]
 *     responses:
 *       200:
 *         description: Notas guardadas
 */
router.post('/bulk', auth, authorize(['TEACHER']), validate(BulkCreateGradesSchema), gradeController.bulkUpsertGrades);

export default router;

import { Router } from 'express';
import * as assignmentsController from './assignments.controller.js';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

/**
 * @swagger
 * /api/assignments/bulk:
 *   post:
 *     summary: Alta masiva de asignaciones docente-asignatura-grupo
 *     description: Solo ADMIN. Respuesta con creadas, duplicadas y errores por fila.
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [assignments]
 *             properties:
 *               assignments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [idTeacher, idSubject, idGroup, schoolYear]
 *                   properties:
 *                     idTeacher: { type: integer }
 *                     idSubject: { type: integer }
 *                     idGroup: { type: integer }
 *                     schoolYear: { type: string }
 *                     status:
 *                       type: string
 *                       enum: [ACTIVE, SUSPENDED, ILLNESS, EXCEDENCE, WITHDRAWN, STANDBY]
 *     responses:
 *       200:
 *         description: Resultado parcial por filas
 *       400:
 *         description: Validación
 */
router.post(
  '/bulk',
  auth,
  authorize(['ADMIN']),
  assignmentsController.postAssignmentsBulk,
);

/**
 * @swagger
 * /api/assignments:
 *   post:
 *     summary: Crear una asignación docente-asignatura-grupo
 *     description: Solo ADMIN. Conflicto 409 si ya existe misma asignatura+grupo+año.
 *     tags: [Assignments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idTeacher, idSubject, idGroup, schoolYear]
 *             properties:
 *               idTeacher: { type: integer }
 *               idSubject: { type: integer }
 *               idGroup: { type: integer }
 *               schoolYear: { type: string }
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, SUSPENDED, ILLNESS, EXCEDENCE, WITHDRAWN, STANDBY]
 *     responses:
 *       201:
 *         description: Creada
 *       409:
 *         description: Duplicado
 *       400:
 *         description: Validación o FK
 */
router.post('/', auth, authorize(['ADMIN']), assignmentsController.postAssignment);

/**
 * @route   GET /api/assignments/teacher/:idTeacher?schoolYear=2024-2025
 * @desc    Asignaciones de un profesor en un año académico (TeacherOnSubjectOnGroup)
 * @access  Admin, Teacher
 */
router.get(
  '/teacher/:idTeacher',
  auth,
  authorize(['ADMIN', 'TEACHER']),
  assignmentsController.getAssignmentsByTeacher,
);

/**
 * @route   GET /api/assignments
 * @desc    Listar todas las asignaciones (TeacherOnSubjectOnGroup), sin filtrar
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), assignmentsController.getAllAssignments);

export default router;

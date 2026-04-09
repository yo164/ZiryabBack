import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as studentTaskController from './student-task.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/student-tasks
 * @desc    Obtener todas las entregas de estudiantes
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.getAllStudentTasks);

/**
 * @route   GET /api/student-tasks/:id
 * @desc    Obtener una entrega por ID
 * @access  Admin, Teacher, Student
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.getStudentTaskById);

/**
 * @route   GET /api/student-tasks/task/:idTask
 * @desc    Obtener todas las entregas de una tarea específica
 * @access  Admin, Teacher
 */
router.get('/task/:idTask', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.getStudentTasksByTask);

/**
 * @route   GET /api/student-tasks/student/:idStudentEnrollment
 * @desc    Obtener todas las entregas de un estudiante (por enrollment)
 * @access  Admin, Teacher
 */
router.get('/student/:idStudentEnrollment', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.getStudentTasksByStudent);

// ============================================
// RUTAS PROTEGIDAS (PUT, PATCH, DELETE)
// ============================================

/**
 * @openapi
 * /student-tasks/{id}/submit:
 *   put:
 *     summary: Entrega una tarea por parte del alumno
 *     tags: [StudentTasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attachmentUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea entregada
 */
router.put('/:id/submit', auth, authorize(['STUDENT']), studentTaskController.submitStudentTask);

/**
 * @openapi
 * /student-tasks/{id}/grade:
 *   put:
 *     summary: Califica una tarea entregada (sólo profesor asignado)
 *     tags: [StudentTasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - score
 *             properties:
 *               score:
 *                 type: number
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea calificada
 */
router.put('/:id/grade', auth, authorize(['TEACHER']), studentTaskController.gradeStudentTask);

/**
 * @route   PATCH /api/student-tasks/:id
 * @desc    Actualizar una entrega (estado, calificación, etc.) genérico
 * @access  Admin, Teacher, Student
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.updateStudentTask);

/**
 * @route   DELETE /api/student-tasks/:id
 * @desc    Eliminar una entrega
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), studentTaskController.deleteStudentTask);

export default router;
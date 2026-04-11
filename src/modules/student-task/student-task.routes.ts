import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as studentTaskController from './student-task.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @swagger
 * /api/student-tasks:
 *   get:
 *     summary: Obtener todas las entregas
 *     description: Obtiene todas las entregas de tareas del sistema.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.getAllStudentTasks);

/**
 * @swagger
 * /api/student-tasks/{id}:
 *   get:
 *     summary: Obtener una entrega por ID
 *     description: Retorna el contenido de una entrega específica (calificación, feedback, archivo).
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Entrega encontrada
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.getStudentTaskById);

/**
 * @swagger
 * /api/student-tasks/task/{idTask}:
 *   get:
 *     summary: Obtener entregas de una tarea
 *     description: Devuelve todas las entregas (StudentTasks) asociadas a una Tarea específica.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTask
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get('/task/:idTask', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.getStudentTasksByTask);

/**
 * @swagger
 * /api/student-tasks/student/{idStudentEnrollment}:
 *   get:
 *     summary: Obtener entregas de un estudiante
 *     description: Devuelve todas las tareas entregadas y pendientes de un alumno según su matrícula.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idStudentEnrollment
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de entregas
 */
router.get('/student/:idStudentEnrollment', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.getStudentTasksByStudent);

// ============================================
// RUTAS PROTEGIDAS (PATCH, DELETE)
// ============================================

/**
 * @swagger
 * /api/student-tasks/{id}:
 *   patch:
 *     summary: Actualizar una entrega
 *     description: Permite al profesor calificar (score, feedback, status) o al alumno adjuntar la tarea.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStudentTask'
 *     responses:
 *       200:
 *         description: Entrega actualizada
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.updateStudentTask);

/**
 * @swagger
 * /api/student-tasks/{id}:
 *   delete:
 *     summary: Eliminar una entrega
 *     description: Elimina una base de entrega (Admin).
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Entrega eliminada
 */
router.delete('/:id', auth, authorize(['ADMIN']), studentTaskController.deleteStudentTask);

export default router;
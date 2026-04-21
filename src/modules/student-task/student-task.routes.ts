import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as studentTaskController from './student-task.controller.js';
import { uploadSubmission } from '../../middleware/upload.js';

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
router.get('/', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.getAllStudentTasks);

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
// RUTAS PROTEGIDAS (PUT, PATCH, DELETE, POST)
// ============================================

/**
 * @route   POST /api/student-tasks
 * @desc    Crear una entrega individual
 * @access  Teacher
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.createStudentTask);

/**
 * @route   POST /api/student-tasks/bulk
 * @desc    Crear entregas en masa para una tarea
 * @access  Teacher
 */
router.post('/bulk', auth, authorize(['ADMIN', 'TEACHER']), studentTaskController.createBulkStudentTasks);

/**
 * @route   POST /api/student-tasks/upload-submission
 * @desc    Sube un archivo de entrega (documento, pdf, zip)
 * @access  Student
 */
router.post('/upload-submission', auth, authorize(['STUDENT']), uploadSubmission.single('file'), studentTaskController.uploadFile);

/**
 * @openapi
 * /student-tasks/{id}/submit:
 *   put:
 *     summary: Entrega una tarea por parte del alumno
 *     tags: [StudentTasks]
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
 * @route   DELETE /api/student-tasks/:id/submit
 * @desc    Borra una entrega de tarea de un alumno
 * @access  Student
 */
router.delete('/:id/submit', auth, authorize(['STUDENT']), studentTaskController.unsubmitStudentTask);

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
 *         schema:
 *           type: integer
 *         required: true
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
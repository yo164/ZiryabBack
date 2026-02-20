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
 * @access  Public
 */
router.get('/', studentTaskController.getAllStudentTasks);

/**
 * @route   GET /api/student-tasks/:id
 * @desc    Obtener una entrega por ID
 * @access  Public
 */
router.get('/:id', studentTaskController.getStudentTaskById);

/**
 * @route   GET /api/student-tasks/task/:idTask
 * @desc    Obtener todas las entregas de una tarea específica
 * @access  Public
 */
router.get('/task/:idTask', studentTaskController.getStudentTasksByTask);

/**
 * @route   GET /api/student-tasks/student/:idStudentEnrollment
 * @desc    Obtener todas las entregas de un estudiante
 * @access  Public
 */
router.get('/student/:idStudentEnrollment', studentTaskController.getStudentTasksByStudent);

// ============================================
// RUTAS PROTEGIDAS (PATCH, DELETE)
// ============================================

/**
 * @route   PATCH /api/student-tasks/:id
 * @desc    Actualizar una entrega (estado, calificación, etc.)
 * @access  Teacher and Student
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), studentTaskController.updateStudentTask);

/**
 * @route   DELETE /api/student-tasks/:id
 * @desc    Eliminar una entrega
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), studentTaskController.deleteStudentTask);

export default router;
import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as taskController from './task.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/tasks
 * @desc    Obtener todas las tareas
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), taskController.getAllTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Obtener una tarea por ID
 * @access  Admin, Teacher, Student
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), taskController.getTaskById);

/**
 * @route   GET /api/tasks/teacher-assignment/:idTeacherAssignment
 * @desc    Obtener tareas de una asignación de profesor
 * @access  Admin, Teacher, Student
 */
router.get('/teacher-assignment/:idTeacherAssignment', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), taskController.getTasksByTeacherAssignment);

// ============================================
// RUTAS PROTEGIDAS (POST, PATCH, DELETE - solo ADMIN y TEACHER)
// ============================================

/**
 * @route   POST /api/tasks
 * @desc    Crear una nueva tarea
 * @access  Admin and Teacher
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), taskController.createTask);

/**
 * @route   PATCH /api/tasks/:id
 * @desc    Actualizar una tarea
 * @access  Admin and Teacher
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), taskController.updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Eliminar una tarea
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), taskController.deleteTask);

export default router;
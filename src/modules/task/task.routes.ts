import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as taskController from './task.controller.js';

const router = Router();

// ============================================
// RUTAS PROTEGIDAS — TEACHER / ADMIN
// ============================================

/**
 * @route   POST /api/tasks
 * @desc    Crear una nueva tarea con sus StudentTask asociados
 * @access  TEACHER | ADMIN
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), taskController.createTask);

/**
 * @route   PATCH /api/tasks/:id
 * @desc    Actualizar campos de una tarea (solo el profesor dueño o ADMIN)
 * @access  TEACHER | ADMIN
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), taskController.updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Eliminar una tarea (solo el profesor dueño o ADMIN)
 * @access  TEACHER | ADMIN
 */
router.delete('/:id', auth, authorize(['ADMIN', 'TEACHER']), taskController.deleteTask);

// ============================================
// RUTAS DE CONSULTA — autenticado
// ============================================

/**
 * @route   GET /api/tasks/teacher-assignment/:idTeacherAssignment
 * @desc    Obtener todas las tareas de una asignación concreta
 * @access  Authenticated
 * @note    Debe ir ANTES de /:id para que Express no lo capture como id numérico
 */
router.get(
  '/teacher-assignment/:idTeacherAssignment',
  auth,
  taskController.getTasksByTeacherAssignment,
);

/**
 * @route   GET /api/tasks/:id
 * @desc    Obtener una tarea por ID
 * @access  Authenticated
 */
router.get('/:id', auth, taskController.getTaskById);

/**
 * @route   GET /api/tasks
 * @desc    Obtener todas las tareas
 * @access  Authenticated
 */
router.get('/', auth, taskController.getAllTasks);

export default router;
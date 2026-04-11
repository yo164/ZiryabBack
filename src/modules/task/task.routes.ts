import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as taskController from './task.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas
 *     description: Obtiene todas las tareas (Admin ve todas, Teacher ve las suyas).
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Obtiene los detalles completos de una tarea.
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
 *         description: Tarea encontrada
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), taskController.getTaskById);

/**
 * @swagger
 * /api/tasks/teacher-assignment/{idTeacherAssignment}:
 *   get:
 *     summary: Obtener tareas por asignación de profesor
 *     description: Obtiene las tareas creadas dentro de una asignatura grupo específica.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idTeacherAssignment
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get('/teacher-assignment/:idTeacherAssignment', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), taskController.getTasksByTeacherAssignment);

// ============================================
// RUTAS PROTEGIDAS (POST, PATCH, DELETE - solo ADMIN y TEACHER)
// ============================================

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Permite al profesor crear una tarea/evaluación/material para un grupo.
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), taskController.createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Actualizar una tarea
 *     description: Edita los detalles de una tarea. Solo el creador o un Admin pueden hacerlo.
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
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     description: Elimina una tarea permanentemente.
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
 *         description: Tarea eliminada
 */
router.delete('/:id', auth, authorize(['ADMIN']), taskController.deleteTask);

export default router;
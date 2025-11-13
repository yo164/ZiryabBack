import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from './task.schema.js';
import {
  listTasksCtrl, createTaskCtrl, getTaskCtrl, updateTaskCtrl, deleteTaskCtrl
} from './task.controller.js';

const router = Router();

router.use(auth);

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Endpoints para gestionar las tareas de usuario
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lista todas las tareas del usuario autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', listTasksCtrl);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *           example:
 *             title: "Preparar exposición final"
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Error en los datos
 */
router.post('/', validate(createTaskSchema), createTaskCtrl);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *         description: ID de la tarea a consultar
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', getTaskCtrl);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Actualiza una tarea por su ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *         description: ID de la tarea a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *           example:
 *             title: "Nueva tarea"
 *             done: true
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       400:
 *         description: Error en los datos
 *       404:
 *         description: Tarea no encontrada
 */
router.patch('/:id', validate(updateTaskSchema), updateTaskCtrl);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 12
 *         description: ID de la tarea a eliminar
 *     responses:
 *       204:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', deleteTaskCtrl);

export default router;

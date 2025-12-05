import { Router } from 'express';
import * as groupController from './group.controller.js';

const router = Router();

/**
 * @route   GET /api/groups
 * @desc    Obtener todos los grupos
 * @access  Public
 */
router.get('/', groupController.getAllGroups);

/**
 * @route   GET /api/groups/:id
 * @desc    Obtener un grupo por ID
 * @access  Public
 */
router.get('/:id', groupController.getGroupById);

/**
 * @route   POST /api/groups
 * @desc    Crear un nuevo grupo
 * @access  Public
 */
router.post('/', groupController.createGroup);

/**
 * @route   PUT /api/groups/:id
 * @desc    Actualizar un grupo
 * @access  Public
 */
router.put('/:id', groupController.updateGroup);

/**
 * @route   PATCH /api/groups/:id
 * @desc    Actualizar parcialmente un grupo
 * @access  Public
 */
router.patch('/:id', groupController.patchGroup);

/**
 * @route   DELETE /api/groups/:id
 * @desc    Eliminar un grupo
 * @access  Public
 */
router.delete('/:id', groupController.deleteGroup);

export default router;

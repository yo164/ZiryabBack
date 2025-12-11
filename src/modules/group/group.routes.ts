import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as groupController from './group.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

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

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN)
// ============================================

/**
 * @route   POST /api/groups
 * @desc    Crear un nuevo grupo
 * @access  Admin only
 */
router.post('/', auth, authorize(['ADMIN']), groupController.createGroup);

/**
 * @route   PUT /api/groups/:id
 * @desc    Actualizar un grupo completamente
 * @access  Admin only
 */
router.put('/:id', auth, authorize(['ADMIN']), groupController.updateGroup);

/**
 * @route   PATCH /api/groups/:id
 * @desc    Actualizar parcialmente un grupo
 * @access  Admin only
 */
router.patch('/:id', auth, authorize(['ADMIN']), groupController.patchGroup);

/**
 * @route   DELETE /api/groups/:id
 * @desc    Eliminar un grupo
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), groupController.deleteGroup);

export default router;

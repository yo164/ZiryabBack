import { Router } from 'express';
import * as adminController from './admins.controller.js';

const router = Router();

/**
 * @route   GET /api/admins
 * @desc    Obtener todos los admin
 * @access  Public
 */
router.get('/', adminController.getAllAdmins);

/**
 * @route   GET /api/admins/:id
 * @desc    Obtener un admin por ID
 * @access  Public
 */
router.get('/:id', adminController.getAdminById);

/**
 * @route   POST /api/admins
 * @desc    Crear un nuevo admin
 * @access  Public
 */
router.post('/', adminController.createAdmin);

/**
 * @route   PUT /api/admins/:id
 * @desc    Actualizar un admin
 * @access  Public
 */
router.put('/:id', adminController.updateAdmin);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Eliminar un admin
 * @access  Public
 */
router.delete('/:id', adminController.deleteAdmin);

export default router;
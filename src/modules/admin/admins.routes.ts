import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as adminController from './admins.controller.js';

const router = Router();

/**
 * @route   GET /api/admins
 * @desc    Obtener todos los admin
 * @access  Admin
 */
router.get('/', auth, authorize(['ADMIN']), adminController.getAllAdmins);

/**
 * @route   GET /api/admins/:id
 * @desc    Obtener un admin por ID
 * @access  Admin
 */
router.get('/:id', auth, authorize(['ADMIN']), adminController.getAdminById);

/**
 * @route   POST /api/admins
 * @desc    Crear un nuevo admin
 * @access  Admin
 */
router.post('/', auth, authorize(['ADMIN']), adminController.createAdmin);

/**
 * @route   PUT /api/admins/:id
 * @desc    Actualizar un admin
 * @access  Admin
 */
router.put('/:id', auth, authorize(['ADMIN']), adminController.updateAdmin);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Eliminar un admin
 * @access  Admin
 */
router.delete('/:id', auth, authorize(['ADMIN']), adminController.deleteAdmin);

export default router;
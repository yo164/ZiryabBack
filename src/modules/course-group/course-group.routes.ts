import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as cgController from './course-group.controller.js';

const router = Router();

/**
 * @route   GET /api/course-groups
 * @desc    Obtener todas las combinaciones Ciclo+Grupo con su tutor
 * @access  Admin
 */
router.get('/', auth, authorize(['ADMIN']), cgController.getAll);

/**
 * @route   GET /api/course-groups/:id/eligible-tutors
 * @desc    Profesores que imparten en esa clase (ciclo+grupo+grado)
 * @access  Admin
 */
router.get('/:id/eligible-tutors', auth, authorize(['ADMIN']), cgController.getEligibleTutors);

/**
 * @route   GET /api/course-groups/:id
 * @desc    Obtener una clase por ID
 * @access  Admin
 */
router.get('/:id', auth, authorize(['ADMIN']), cgController.getById);

/**
 * @route   POST /api/course-groups
 * @desc    Crear combinación Ciclo+Grupo
 * @access  Admin
 */
router.post('/', auth, authorize(['ADMIN']), cgController.create);

/**
 * @route   PATCH /api/course-groups/:id/tutor
 * @desc    Asignar o quitar tutor de una clase
 * @access  Admin
 */
router.patch('/:id/tutor', auth, authorize(['ADMIN']), cgController.assignTutor);

/**
 * @route   DELETE /api/course-groups/:id
 * @desc    Eliminar combinación Ciclo+Grupo
 * @access  Admin
 */
router.delete('/:id', auth, authorize(['ADMIN']), cgController.deleteOne);

export default router;

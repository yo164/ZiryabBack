import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as courseController from './course.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/courses
 * @desc    Obtener todos los cursos
 * @access  Public
 */
router.get('/', courseController.getAllCourses);

/**
 * @route   GET /api/courses/:id
 * @desc    Obtener un curso por ID
 * @access  Public
 */
router.get('/:id', courseController.getCourseById);

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN)
// ============================================

/**
 * @route   POST /api/courses
 * @desc    Crear un nuevo curso
 * @access  Admin only
 */
router.post('/', auth, authorize(['ADMIN']), courseController.createCourse);

/**
 * @route   PUT /api/courses/:id
 * @desc    Actualizar un curso completamente
 * @access  Admin only
 */
router.put('/:id', auth, authorize(['ADMIN']), courseController.updateCourse);

/**
 * @route   PATCH /api/courses/:id
 * @desc    Actualizar parcialmente un curso
 * @access  Admin only
 */
router.patch('/:id', auth, authorize(['ADMIN']), courseController.patchCourse);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Eliminar un curso
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), courseController.deleteCourse);

export default router;

import { Router } from 'express';
import * as courseController from './course.controller.js';

const router = Router();

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

/**
 * @route   POST /api/courses
 * @desc    Crear un nuevo curso
 * @access  Public
 */
router.post('/', courseController.createCourse);

/**
 * @route   PUT /api/courses/:id
 * @desc    Actualizar un curso
 * @access  Public
 */
router.put('/:id', courseController.updateCourse);

/**
 * @route   PATCH /api/courses/:id
 * @desc    Actualizar parcialmente un curso
 * @access  Public
 */
router.patch('/:id', courseController.patchCourse);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Eliminar un curso
 * @access  Public
 */
router.delete('/:id', courseController.deleteCourse);

export default router;

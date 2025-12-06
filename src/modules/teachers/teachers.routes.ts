import { Router } from 'express';
import * as teacherController from './teachers.controller.js';

const router = Router();

/**
 * @route   GET /api/teachers
 * @desc    Obtener todos los profesores
 * @access  Public
 */
router.get('/', teacherController.getAllTeacher);

/**
 * @route   GET /api/teachers/:id
 * @desc    Obtener un profesor por ID
 * @access  Public
 */
router.get('/:id', teacherController.getTeacherById);

/**
 * @route   POST /api/teachers
 * @desc    Crear un nuevo profesor
 * @access  Public
 */
router.post('/', teacherController.createTeacher);

/**
 * @route   PUT /api/teachers/:id
 * @desc    Actualizar un profesor
 * @access  Public
 */
router.put('/:id', teacherController.updateTeacher);

/**
 * @route   DELETE /api/teachers/:id
 * @desc    Eliminar un profesor
 * @access  Public
 */
router.delete('/:id', teacherController.deleteTeacher);

/**
 * @route   GET /api/teachers/:id/subjects
 * @desc    Obtener asignaturas de un profesor
 * @access  Public
 */
router.get('/:id/subjects', teacherController.getTeacherSubjects);

export default router;
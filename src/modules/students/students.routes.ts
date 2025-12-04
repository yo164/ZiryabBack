import { Router } from 'express';
import * as studentsController from './students.controller.js';

const router = Router();

/**
 * @route   GET /api/students
 * @desc    Obtener todos los estudiantes
 * @access  Public
 */
router.get('/', studentsController.getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Obtener un estudiante por ID
 * @access  Public
 */
router.get('/:id', studentsController.getStudentById);

/**
 * @route   POST /api/students
 * @desc    Crear un nuevo estudiante
 * @access  Public
 */
router.post('/', studentsController.createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Actualizar un estudiante
 * @access  Public
 */
router.put('/:id', studentsController.updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Eliminar un estudiante
 * @access  Public
 */
router.delete('/:id', studentsController.deleteStudent);

/**
 * @route   GET /api/students/:id/subjects
 * @desc    Obtener asignaturas de un estudiante
 * @access  Public
 */
router.get('/:id/subjects', studentsController.getStudentSubjects);

export default router;
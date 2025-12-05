import { Router } from 'express';
import * as subjectsController from './subjects.controller.js';

const router = Router();

/**
 * @route   GET /api/subjects
 * @desc    Obtener todas las asignaturas
 * @access  Public
 */
router.get('/', subjectsController.getAllSubjects);

/**
 * @route   GET /api/subjects/:id
 * @desc    Obtener una asignatura por ID
 * @access  Public
 */
router.get('/:id', subjectsController.getSubjectById);

/**
 * @route   POST /api/subjects
 * @desc    Crear una nueva asignatura
 * @access  Public
 */
router.post('/', subjectsController.createSubject);

/**
 * @route   PUT /api/subjects/:id
 * @desc    Actualizar una asignatura completa
 * @access  Public
 */
router.put('/:id', subjectsController.updateSubject);

/**
 * @route   PATCH /api/subjects/:id
 * @desc    Actualizar parcialmente una asignatura
 * @access  Public
 */
router.patch('/:id', subjectsController.patchSubject);

/**
 * @route   DELETE /api/subjects/:id
 * @desc    Eliminar una asignatura
 * @access  Public
 */
router.delete('/:id', subjectsController.deleteSubject);

/**
 * @route   GET /api/subjects/:id/teachers
 * @desc    Obtener profesores de una asignatura
 * @access  Public
 */
router.get('/:id/teachers', subjectsController.getSubjectTeachers);

/**
 * @route   GET /api/subjects/:id/students
 * @desc    Obtener estudiantes de una asignatura
 * @access  Public
 */
router.get('/:id/students', subjectsController.getSubjectStudents);

export default router;

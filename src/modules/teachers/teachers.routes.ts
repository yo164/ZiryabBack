import { Router } from 'express';
import * as teachersController from './teachers.controller.js';

const router = Router();

/**
 * @route   GET /api/teachers
 * @desc    Obtener todas los profesores
 * @access  Public
 */
router.get('/', teachersController.getAllTeachers);

/**
 * @route   GET /api/teachers/:id/subjects
 * @desc    Obtener asignaturas de un profesor por ID
 * @access  Public
 */
router.get('/:id/subjects', teachersController.getTeacherSubjects);

/**
 * @route   GET /api/teachers/:id
 * @desc    Obtener un profesor por ID
 * @access  Public
 */
router.get('/:id', teachersController.getTeacherById);

/**
 * @route   POST /api/teachers
 * @desc    Crear un nuevo profesor
 * @access  Public
 */
router.post('/', teachersController.createTeacher);

/**
 * @route   PUT /api/teachers/:id
 * @desc    Actualizar un profesor completo
 * @access  Public
 */
//router.put('/:id', teachersController.updateTeacher);

/**
 * @route   PATCH /api/teachers/:id
 * @desc    Actualizar parcialmente un profesor
 * @access  Public
 */
router.patch('/:id', teachersController.patchTeacher);

/**
 * @route   DELETE /api/teachers/:id
 * @desc    Eliminar un profesor
 * @access  Public
 */
router.delete('/:id', teachersController.deleteTeacher);

/**
 * @route   GET /api/subjects/:id/teachers
 * @desc    Obtener profesores de una asignatura
 * @access  Public
 */
//router.get('/:id/teachers', teachersController.get);

/**
 * @route   GET /api/subjects/:id/students
 * @desc    Obtener estudiantes de una asignatura
 * @access  Public
 */
//router.get('/:id/students', teachersController.getSubjectStudents);

/**
 * @route GET /api/subjects/:id/course
 * @desc  Obtener asignaturas en un Ciclo
 * @access Public
 */
//router.get('/:id/course', subjectsController.getSubjectCourse);

export default router;

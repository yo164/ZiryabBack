import { Router } from 'express';
import { authorize } from '../../middleware/authorize.js';
import { auth } from '../../middleware/auth.js';
import * as teachersController from './teachers.controller.js';

const router = Router();

/**
 * @route   GET /api/teachers
 * @desc    Obtener todas los profesores
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), teachersController.getAllTeachers);

/**
 * @route   GET /api/teachers/:id/subjects
 * @desc    Obtener asignaturas de un profesor por ID
 * @access  Admin, Teacher
 */
router.get('/:id/subjects', auth, authorize(['ADMIN', 'TEACHER']), teachersController.getTeacherSubjects);

/**
 * @route   GET /api/teachers/:id
 * @desc    Obtener un profesor por ID
 * @access  Admin, Teacher
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER']), teachersController.getTeacherById);

/**
 * @route   POST /api/teachers
 * @desc    Crear un nuevo profesor
 * @access  Admin
 */
router.post('/', auth, authorize(['ADMIN']), teachersController.createTeacher);

/**
 * @route   PUT /api/teachers/:id
 * @desc    Actualizar un profesor completo
 * @access  Admin
 */
//router.put('/:id', auth, authorize(['ADMIN']), teachersController.updateTeacher);

/**
 * @route   PATCH /api/teachers/:id
 * @desc    Actualizar parcialmente un profesor
 * @access  Admin
 */
router.patch('/:id', auth, authorize(['ADMIN']), teachersController.patchTeacher);

/**
 * @route   DELETE /api/teachers/:id
 * @desc    Eliminar un profesor
 * @access  Admin
 */
router.delete('/:id', auth, authorize(['ADMIN']), teachersController.deleteTeacher);

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

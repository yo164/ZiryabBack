import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { restrictToSelfOrRoles } from '../../middleware/restrictSelf.js';
import * as studentsController from './students.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/students
 * @desc    Obtener todos los estudiantes
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), studentsController.getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Obtener un estudiante por ID
 * @access  Admin, Teacher, o el propio estudiante
 */
router.get('/:id', auth, restrictToSelfOrRoles(['ADMIN', 'TEACHER'], 'id'), studentsController.getStudentById);

/**
 * @route   GET /api/students/:id/subjects
 * @desc    Obtener asignaturas de un estudiante
 * @access  Admin, Teacher, o el propio estudiante
 */
router.get('/:id/subjects', auth, restrictToSelfOrRoles(['ADMIN', 'TEACHER'], 'id'), studentsController.getStudentSubjects);

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN)
// ============================================

/**
 * @route   POST /api/students
 * @desc    Crear un nuevo estudiante
 * @access  Admin only
 */
router.post('/', auth, authorize(['ADMIN']), studentsController.createStudent);

/**
 * @route   PUT /api/students/:id
 * @desc    Actualizar un estudiante completamente
 * @access  Admin only
 */
router.put('/:id', auth, authorize(['ADMIN']), studentsController.updateStudent);

/**
 * @route   PATCH /api/students/:id
 * @desc    Actualizar parcialmente un estudiante
 * @access  Admin only
 */
router.patch('/:id', auth, authorize(['ADMIN']), studentsController.patchStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Eliminar un estudiante
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), studentsController.deleteStudent);

export default router;

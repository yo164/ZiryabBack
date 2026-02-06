import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as assistanceController from './assistance.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/subjects
 * @desc    Obtener todas las asistencias de alumnos que esten en activo(no dados de baja)
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

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN)
// ============================================

/**
 * @route   POST /api/subjects
 * @desc    Crear una nueva asignatura
 * @access  Admin only
 */
router.post('/', auth, authorize(['ADMIN']), subjectsController.createSubject);

/**
 * @route   PUT /api/subjects/:id
 * @desc    Actualizar una asignatura completamente
 * @access  Admin only
 */
router.put('/:id', auth, authorize(['ADMIN']), subjectsController.updateSubject);

/**
 * @route   PATCH /api/subjects/:id
 * @desc    Actualizar parcialmente una asignatura
 * @access  Admin only
 */
router.patch('/:id', auth, authorize(['ADMIN']), subjectsController.patchSubject);

/**
 * @route   DELETE /api/subjects/:id
 * @desc    Eliminar una asignatura
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), subjectsController.deleteSubject);
/**
 * @route GET /api/subjects/:id/course
 * @desc  Obtener asignaturas en un Ciclo
 * @access Public
 */
router.get('/:id/course', subjectsController.getSubjectCourse);

export default router;

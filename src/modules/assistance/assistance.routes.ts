import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as assistanceController from './assistance.controller.js';

const router = Router();

// ============================================
// RUTAS PROTEGIDAS (TODAS REQUIEREN AUTENTICACIÓN)
// ============================================

/**
 * @route   GET /api/assistances
 * @desc    Obtener todas las asistencias
 * @access  Admin y Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getAll);

/**
 * @route   GET /api/assistances/student-enrollment/:idStudentEnrollment
 * @desc    Obtener faltas de un alumno por idStudentEnrollment
 * @access  Admin y Teacher
 */
router.get('/student-enrollment/:idStudentEnrollment', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getByStudentEnrollment);

/**
 * @route   GET /api/assistances/student/:idStudent
 * @desc    Obtener faltas de un alumno por idStudent
 * @access  Admin y Teacher
 */
router.get('/student/:idStudent', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getByStudentId);

/**
 * @route   GET /api/assistances/session/:idSession
 * @desc    Obtener lista de asistencias por id de sesión de clase
 * @access  Admin y Teacher
 */
router.get('/session/:idSession', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getBySessionId);

/**
 * @route   GET /api/assistances/:id
 * @desc    Obtener una asistencia por ID
 * @access  Admin y Teacher
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getById);

// ============================================
// RUTAS DE MODIFICACIÓN (POST, PUT, PATCH, DELETE)
// ============================================

/**
 * @route   POST /api/assistances/bulk
 * @desc    Crear múltiples asistencias de una vez
 * @access  Admin y Teacher
 */
router.post('/bulk', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.createBulk);

/**
 * @route   POST /api/assistances
 * @desc    Crear una asistencia individual
 * @access  Admin y Teacher
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.createOne);

/**
 * @route   PATCH /api/assistances/justify
 * @desc    Justificar una falta
 * @access  Admin y Teacher
 */
router.patch('/justify', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.justify);

/**
 * @route   PATCH /api/assistances/:id
 * @desc    Actualizar estado de una asistencia
 * @access  Admin y Teacher
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.updateOne);

/**
 * @route   PUT /api/assistances/:id
 * @desc    Actualizar completamente o modificar estado de una asistencia
 * @access  Admin y Teacher
 */
router.put('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.updateOne);

/**
 * @route   DELETE /api/assistances/:id
 * @desc    Eliminar una asistencia
 * @access  Admin y Teacher
 */
router.delete('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.deleteOne);

export default router;
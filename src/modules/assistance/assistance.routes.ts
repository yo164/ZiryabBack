import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as assistanceController from './assistance.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/assistances
 * @desc    Obtener todas las asistencias
 * @access  Public
 */
router.get('/', assistanceController.getAll);

/**
 * @route   GET /api/assistances/student-enrollment/:idStudentEnrollment
 * @desc    Obtener faltas de un alumno por idStudentEnrollment
 * @access  Public
 */
router.get('/student-enrollment/:idStudentEnrollment', assistanceController.getByStudentEnrollment);

/**
 * @route   GET /api/assistances/student/:idStudent
 * @desc    Obtener faltas de un alumno por idStudent
 * @access  Public
 */
router.get('/student/:idStudent', assistanceController.getByStudentId);

/**
 * @route   GET /api/assistances/session/:idSession
 * @desc    Obtener lista de asistencias por id de sesión de clase
 * @access  Public
 */
router.get('/session/:idSession', assistanceController.getBySessionId);

/**
 * @route   GET /api/assistances/:id
 * @desc    Obtener una asistencia por ID
 * @access  Public
 */
router.get('/:id', assistanceController.getById);

// ============================================
// RUTAS PROTEGIDAS (POST, PATCH, DELETE)
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
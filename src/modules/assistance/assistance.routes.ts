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
 * @route GET /api/assistances/session/:idSession
 * @desc  Obtener asistencias por id de Sesión
 * @access Public
 */
router.get('/session/:idSession', assistanceController.getBySessionId);

// ============================================
// RUTAS PROTEGIDAS (POST, PATCH, DELETE, y GET específico)
// ============================================

/**
 * @route   GET /api/assistances/my-absences
 * @desc    Obtener las faltas (LATE, ABSENT, EXCUSED) del alumno logueado
 * @access  Student solo
 */
router.get('/my-absences', auth, authorize(['STUDENT']), assistanceController.getMyAbsences);

/**
 * @route   GET /api/assistances/:id
 * @desc    Obtener una asistencia por ID
 * @access  Public
 */
router.get('/:id', assistanceController.getById);

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
 * @route   PATCH /api/assistances/justify/{id}
 * @desc    Justificar una falta
 * @access  Admin y Teacher
 */
router.patch('/justify/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.justify);

/**
 * @route PATCH /api/assistances/assistancestatus/{id}
 * @desc  actualizar el estado de una falta
 * @acces admin y teacher
 */
router.patch('/assistancestatus/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.updateStatus)



/**
 * @route   DELETE /api/assistances/:id
 * @desc    Eliminar una asistencia
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), assistanceController.deleteOne);



export default router;
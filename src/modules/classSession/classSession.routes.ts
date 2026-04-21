import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as classSessionController from './classSession.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/sessions
 * @desc    Obtener todas las sesiones de clase
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.getAllSessions);

/**
 * @route   GET /api/sessions/active
 * @desc    Obtener o crear la sesión activa para un assignment en este momento
 * @access  Admin, Teacher
 */
router.get('/active', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.getActiveSession);

/**
 * @route   GET /api/sessions/:id
 * @desc    Obtener una sesión por ID
 * @access  Admin, Teacher
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.getSessionById);

/**
 * @route   GET /api/sessions/schedule/:idSchedule
 * @desc    Obtener sesiones de un horario específico
 * @access  Admin, Teacher
 */
router.get('/schedule/:idSchedule', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.getSessionsBySchedule);

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, DELETE - solo ADMIN y TEACHER)
// ============================================

/**
 * @route   POST /api/sessions/start
 * @desc    Obtener o crear la sesión de hoy para una asignatura y profesor concretos
 * @access  Admin and Teacher
 */
router.post('/start', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.startSessionForSubject);

/**
 * @route   POST /api/sessions
 * @desc    Crear una nueva sesión de clase
 * @access  Admin and Teacher
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.createSession);

/**
 * @route   PATCH /api/sessions/:id
 * @desc    Actualizar una sesión de clase
 * @access  Admin and Teacher
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), classSessionController.updateSession);

/**
 * @route   DELETE /api/sessions/:id
 * @desc    Eliminar una sesión de clase
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), classSessionController.deleteSession);

export default router;
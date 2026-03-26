import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { restrictToSelfOrRoles } from '../../middleware/restrictSelf.js';
import * as assistanceController from './assistance.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/assistances
 * @desc    Obtener todas las asistencias
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getAll);

/**
 * @route   GET /api/assistances/student-enrollment/:idStudentEnrollment
 * @desc    Obtener faltas cruzadas. Exclusivo para profes y admins.
 * @access  Admin, Teacher
 */
router.get('/student-enrollment/:idStudentEnrollment', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getByStudentEnrollment);

/**
 * @route   GET /api/assistances/student/:idStudent
 * @desc    Obtener faltas de un alumno por idStudent
 * @access  Admin, Teacher o el propio alumno
 */
router.get('/student/:idStudent', auth, restrictToSelfOrRoles(['ADMIN', 'TEACHER'], 'idStudent'), assistanceController.getByStudentId);

/**
 * @route GET /api/assistances/session/:idSession
 * @desc  Obtener asistencias por id de Sesión
 * @access Admin, Teacher
 */
router.get('/session/:idSession', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getBySessionId);

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
 * @route   GET /api/assistances/:id/justification-status
 * @desc    Consultar el estado de justificación de una falta concreta
 * @access  Student, Teacher, Admin
 */
router.get('/:id/justification-status', auth, authorize(['STUDENT', 'TEACHER', 'ADMIN']), assistanceController.getJustificationStatus);

/**
 * @route   GET /api/assistances/:id
 * @desc    Obtener una asistencia por ID
 * @access  Admin, Teacher
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.getById);

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

import { uploadJustification } from '../../middleware/upload.js';

/**
 * @route   POST /api/assistances/:id/justification-document
 * @desc    Subir un documento de justificación (PDF, PNG, JPG hasta 5MB)
 * @access  Student, Teacher, Admin
 */
router.post(
    '/:id/justification-document',
    auth,
    authorize(['STUDENT', 'TEACHER', 'ADMIN']),
    uploadJustification.single('document'),
    assistanceController.uploadDocument
);

export default router;
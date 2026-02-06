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
router.get('/', assistanceController.getAllActiveStudents);

/**
 * @route   GET /api/subjects/:id
 * @desc    Obtener una asignatura por ID
 * @access  Public
 * router.get('/:id', subjectsController.getSubjectById);

 */

/**
 * @route   GET /api/subjects/:id/teachers
 * @desc    Obtener profesores de una asignatura
 * @access  Public
 * router.get('/:id/teachers', subjectsController.getSubjectTeachers);

 */

/**
 * @route   GET /api/subjects/:id/students
 * @desc    Obtener estudiantes de una asignatura
 * @access  Public
 * router.get('/:id/students', subjectsController.getSubjectStudents);

 */

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN)
// ============================================

/**
 * @route   POST /api/
 * @desc    Crear un registro de asistencia(el profesor pasa lista no rellena casilla por defecto asistencia "presente"
 *            falta injustificada/justificada o retraso)
 * @access  Admin y profesor
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.registrarAsistencia);

/**
 * @route   PUT /api/subjects/:id
 * @desc    Actualizar una asignatura completamente
 * @access  Admin only
    router.put('/:id', auth, authorize(['ADMIN']), subjectsController.updateSubject);

*/

/**
 * @route   PATCH /api/assistances/:id
 * @desc    Actualizar parcialmente una asistencia
 *          el sistema recibirá instrucción del profesor validando una justificación
 *          solicitada por un alumno y actualizará el estado de una falta de injustificada a justificada
 *           
 *          Al recibir y verificar la justificación del alumno el profesor dará instrucción al programa
 *          para actualizar el estado de la falta de injustificada a justificada 
 * @access  Admin y profesor
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), assistanceController.patchAssistance);

/**
 * @route   DELETE /api/subjects/:id
 * @desc    Eliminar una asignatura
 * @access  Admin only
 * 
 * router.delete('/:id', auth, authorize(['ADMIN']), subjectsController.deleteSubject);

 */


export default router;

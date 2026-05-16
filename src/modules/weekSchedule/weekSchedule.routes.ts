import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import { restrictToSelfOrRoles } from '../../middleware/restrictSelf.js';
import * as horarioSemanalController from './weekSchedule.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/horarios-semanales
 * @desc    Obtener todos los horarios semanales
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.getAllHorarios);

/**
 * @route   GET /api/horarios-semanales/:id
 * @desc    Obtener un horario por ID
 * @access  Admin, Teacher
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.getHorarioById);

/**
 * @route   GET /api/horarios-semanales/teacher-assignment/:idTeacherAssignment
 * @desc    Obtener horarios de una asignación de profesor
 * @access  Admin, Teacher, Student
 */
router.get('/teacher-assignment/:idTeacherAssignment', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), horarioSemanalController.getHorariosByTeacherAssignment);

/**
 * @route   GET /api/horarios-semanales/dia/:weekDay
 * @desc    Obtener horarios de un día específico (MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY)
 * @access  Admin, Teacher
 */
router.get('/dia/:weekDay', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.getHorariosByDia);

/**
 * @route   GET /api/horarios-semanales/teacher/:idTeacher
 * @desc    Obtener todos los horarios semanales de un profesor por su ID
 * @access  Admin, Teacher
 */
router.get('/teacher/:idTeacher', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.getHorariosByTeacher);

/**
 * @route   GET /api/horarios-semanales/student/:idStudent
 * @desc    Obtener todos los horarios de un alumno por su ID
 * @access  Admin, Teacher o el propio alumno
 */
router.get('/student/:idStudent', auth, restrictToSelfOrRoles(['ADMIN', 'TEACHER'], 'idStudent'), horarioSemanalController.getHorariosByStudent);

// ============================================
// RUTAS PROTEGIDAS (POST, PUT, PATCH, DELETE - solo ADMIN y TEACHER)
// ============================================

/**
 * @route   POST /api/horarios-semanales
 * @desc    Crear un nuevo horario semanal
 * @access  Admin and Teacher
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.createHorario);

/**
 * @route   PUT /api/horarios-semanales/:id
 * @desc    Actualizar un horario completamente
 * @access  Admin and Teacher
 */
router.put('/:id', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.updateHorario);

/**
 * @route   PATCH /api/horarios-semanales/:id
 * @desc    Actualizar parcialmente un horario
 * @access  Admin and Teacher
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), horarioSemanalController.patchHorario);

/**
 * @route   DELETE /api/horarios-semanales/:id
 * @desc    Eliminar un horario
 * @access  Admin only
 */
router.delete('/:id', auth, authorize(['ADMIN']), horarioSemanalController.deleteHorario);

export default router;
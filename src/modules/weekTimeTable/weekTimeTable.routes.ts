import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as horarioSemanalController from './horario-semanal.controller.js';

const router = Router();

// ============================================
// RUTAS PÚBLICAS (GET - sin autenticación)
// ============================================

/**
 * @route   GET /api/horarios-semanales
 * @desc    Obtener todos los horarios semanales
 * @access  Public
 */
router.get('/', horarioSemanalController.getAllHorarios);

/**
 * @route   GET /api/horarios-semanales/:id
 * @desc    Obtener un horario por ID
 * @access  Public
 */
router.get('/:id', horarioSemanalController.getHorarioById);

/**
 * @route   GET /api/horarios-semanales/teacher-assignment/:idTeacherAssignment
 * @desc    Obtener horarios de una asignación de profesor
 * @access  Public
 */
router.get('/teacher-assignment/:idTeacherAssignment', horarioSemanalController.getHorariosByTeacherAssignment);

/**
 * @route   GET /api/horarios-semanales/dia/:diaSemana
 * @desc    Obtener horarios de un día específico (1=Lunes, 7=Domingo)
 * @access  Public
 */
router.get('/dia/:diaSemana', horarioSemanalController.getHorariosByDia);

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
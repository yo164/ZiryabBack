import { Router } from 'express';
import * as assignmentsController from './assignments.controller.js';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

/**
 * @route   GET /api/assignments/teacher/:idTeacher?schoolYear=2024-2025
 * @desc    Asignaciones de un profesor en un año académico (TeacherOnSubjectOnGroup)
 * @access  Admin, Teacher
 */
router.get(
  '/teacher/:idTeacher',
  auth,
  authorize(['ADMIN', 'TEACHER']),
  assignmentsController.getAssignmentsByTeacher,
);

/**
 * @route   GET /api/assignments
 * @desc    Listar todas las asignaciones (TeacherOnSubjectOnGroup), sin filtrar
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), assignmentsController.getAllAssignments);

export default router;

import { Router } from "express";
import * as enrollmentController from './enrollments.controller.js';
import { auth } from "../../middleware/auth.js";
import { authorize } from '../../middleware/authorize.js';


const router = Router();

/**
 * @route   GET /api/enrollments
 * @desc    Obtener todos los enrollments sin filtrar
 * @access  Admin, Teacher
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER']), enrollmentController.getAllEnrollmentsRaw);

/**
 * @route   GET /api/enrollments/by-filters?idSubject=1&idGroup=1&schoolYear=2024-2025
 * @desc    Obtener todos los estudiantes relacionados con el grupo, asignatura y schoolYear de un profesor
 * @access  Admin, Teacher
 */
router.get('/by-filters', auth, authorize(['ADMIN', 'TEACHER']), enrollmentController.getAllEnrollments);

/**
 * @route   GET /api/enrollments/teacher/:idTeacher?schoolYear=2024-2025
 * @desc    Obtener todos los assignments de un profesor
 * @access  Limitado a Admin y Profesores
 */
router.get('/teacher/:idTeacher', auth, authorize(['ADMIN', 'TEACHER']), enrollmentController.getAssignmentsByTeacher);
export default router;
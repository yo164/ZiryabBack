import { Router } from "express";
import * as enrollmentController from './enrollments.controller.js';
import { auth } from "../../middleware/auth.js";
import { authorize } from '../../middleware/authorize.js';


const router = Router();

/**
 * @route   GET /api/enrollments
 * @desc    Obtener todos los enrollments sin filtrar
 * @access  Public?? deberiamos poner acceso limitado pues no cualquiera podria poder acceder ya este tipo de gets.
 */
router.get('/', enrollmentController.getAllEnrollmentsRaw);
/**
 * @route   GET /api/enrollments/by-filters?idSubject=1&idGroup=1&schoolYear=2024-2025
 * @desc    Obtener todos los estudiantes relacionados con el grupo, asignatura y schoolYear de un profesor
 * @access  Public?? deberiamos poner acceso limitado pues no cualquiera podria poder acceder ya este tipo de gets.
 */
router.get('/by-filters', enrollmentController.getAllEnrollments);

/**
 * @route   GET /api/enrollments/teacher/:idTeacher?schoolYear=2024-2025
 * @desc    Obtener todos los assignments de un profesor para obtener su listado de asignaturas
 * @access  Limitado al profesor que inicia sesión
 */
// assignment.routes.ts
router.get('/teacher/:idTeacher', enrollmentController.getAssignmentsByTeacher);
export default router;
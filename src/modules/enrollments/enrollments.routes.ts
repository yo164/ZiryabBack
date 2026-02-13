import { Router } from "express";
import * as enrollmentController from './enrollments.controller.js';
import { auth } from "../../middleware/auth.js";
import { authorize } from '../../middleware/authorize.js';


const router = Router();

/**
 * @route   GET /api/enrollments
 * @desc    Obtener todos los estudiantes relacionados con el grupo, asignatura y schoolYear de un profesor
 * @access  Public?? deberiamos poner acceso limitado pues no cualquiera podria poder acceder ya este tipo de gets.
 */
router.get('/', enrollmentController.getAllEnrollmentsRaw);
/**
 * @route   GET /api/enrollments/:idAssignment
 * @desc    Obtener todos los estudiantes relacionados con el grupo, asignatura y schoolYear de un profesor
 * @access  Public?? deberiamos poner acceso limitado pues no cualquiera podria poder acceder ya este tipo de gets.
 */
router.get('/by-filters', enrollmentController.getAllEnrollments);

/**
 * @route GET /api/enrollments/:idTeacher
 * @desc obtener todos los assignments(relaciones entre profesor grupo y asignatura en un año academico, para obtener su listado de asignaturas)
 * @acces limitado al profesor que inicia sesión()
 */
// assignment.routes.ts
router.get('/teacher/:idTeacher', enrollmentController.getAssignmentsByTeacher);
export default router;
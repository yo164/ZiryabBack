import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { authorize } from "../../middleware/authorize.js";
import * as studentOnSubjectController from './student-registration.controller.js';

const router = Router();

/**
 * @route   POST /api/student-on-subject-on-group
 * @desc    Matricular un estudiante en un grupo y asignatura
 * @access  Admin only
 */
router.post('/', auth, authorize(['ADMIN']), studentOnSubjectController.createStudentOnSubjectOnGroup);


export default router;
import { Router } from 'express';
import * as subjectsController from './subjects.controller.js';

const router = Router();

router.get('/', subjectsController.getAllSubjects);
router.get('/:id', subjectsController.getSubjectById);
router.post('/', subjectsController.createSubject);
router.put('/:id', subjectsController.updateSubject);
router.delete('/:id', subjectsController.deleteSubject);
router.get('/:id/teachers', subjectsController.getSubjectTeachers);
router.get('/:id/students', subjectsController.getSubjectStudents);

export default router;
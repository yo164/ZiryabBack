import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { authorize } from '../../middleware/authorize.js';
import * as issueController from './issue.controller.js';

const router = Router();

/**
 * @route   GET /api/issues
 * @desc    Listar anuncios activos para el usuario autenticado
 * @access  ADMIN, TEACHER, STUDENT
 */
router.get('/', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), issueController.getIssues);

/**
 * @route   GET /api/issues/:id
 * @desc    Detalle de un anuncio
 * @access  ADMIN, TEACHER, STUDENT
 */
router.get('/:id', auth, authorize(['ADMIN', 'TEACHER', 'STUDENT']), issueController.getIssueById);

/**
 * @route   POST /api/issues
 * @desc    Crear anuncio (borrador o publicado)
 * @access  TEACHER, ADMIN
 */
router.post('/', auth, authorize(['ADMIN', 'TEACHER']), issueController.createIssue);

/**
 * @route   PATCH /api/issues/:id
 * @desc    Editar o publicar anuncio
 * @access  TEACHER, ADMIN
 */
router.patch('/:id', auth, authorize(['ADMIN', 'TEACHER']), issueController.updateIssue);

/**
 * @route   DELETE /api/issues/:id
 * @desc    Eliminar anuncio
 * @access  TEACHER, ADMIN
 */
router.delete('/:id', auth, authorize(['ADMIN', 'TEACHER']), issueController.deleteIssue);

export default router;

import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/', auth, usersController.getUsers);
router.get('/me', auth, usersController.getMe);
router.patch('/me', auth, usersController.updateMe);
router.patch('/me/password', auth, usersController.updateMyPassword);
router.get('/:id', auth, usersController.getUserById);

export default router;

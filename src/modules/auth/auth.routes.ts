import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

// Rutas públicas (sin autenticación)
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-firebase-token', AuthController.verifyFirebaseToken);

// Rutas protegidas (requieren JWT)
router.get('/me', auth, AuthController.getMe);

export default router;

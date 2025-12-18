import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { auth } from '../../middleware/auth.js';

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

const router = Router();

/**
 * POST /api/auth/register
 * Registra un nuevo usuario
 */
router.post('/register', AuthController.register);

/**
 * POST /api/auth/login
 * Login de un usuario existente
 */
router.post('/login', AuthController.login);

/**
 * GET /api/auth/me
 * Obtiene los datos del usuario actual (requiere JWT)
 * Usa el middleware auth() para validar el token
 */
router.get('/me', auth, AuthController.me);

/**
 * POST /api/auth/verify-firebase
 * Verifica que un token de Firebase sea válido (opcional)
 */
router.post('/verify-firebase', AuthController.verifyFirebaseToken);

/**
 * POST /api/auth/logout
 * Cierra sesión del usuario
 */
router.post('/logout', auth, AuthController.logout);

// ============================================
// EXPORTAR ROUTER
// ============================================

// ✅ EXPORT POR DEFECTO
export default router;

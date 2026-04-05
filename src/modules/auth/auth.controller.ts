import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';

export class AuthController {
  /**
   * POST /api/auth/register
   * Registra un nuevo usuario
   */
  static async register(req: Request, res: Response) {
    try {
      const {
        token, // Usamos el token de Firebase en lugar de firebaseUID directamente
        email,
        name,
        surname,
        ndSurname,
        birthDate,
        dni,
        role,
      } = req.body;

      // ============================================
      // VALIDACIONES
      // ============================================

      // Campos obligatorios
      if (!token || !email || !name || !surname || !birthDate || !dni || !role) {
        return res.status(400).json({
          message: 'Faltan campos requeridos',
          required: [
            'token',
            'email',
            'name',
            'surname',
            'birthDate',
            'dni',
            'role',
          ],
        });
      }

      // Rol válido
      if (!['STUDENT', 'TEACHER', 'ADMIN'].includes(role)) {
        return res.status(400).json({
          message: 'Rol inválido. Debe ser: STUDENT, TEACHER o ADMIN',
        });
      }

      // Email válido
      if (!email.includes('@')) {
        return res.status(400).json({
          message: 'Email inválido',
        });
      }

      // ============================================
      // REGISTRAR
      // ============================================

      // Verificar y obtener el firebaseUID de forma segura
      const firebaseUID = await AuthService.verifyFirebaseToken(token);

      const user = await AuthService.registerUser({
        firebaseUID,
        email,
        name,
        surname,
        ndSurname,
        birthDate,
        dni,
        role,
      });

      const { token: jwtToken, ...userData } = user;

      res.cookie('auth_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        data: userData,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error al registrar usuario',
        error: (error as Error).message,
      });
    }
  }

  /**
   * POST /api/auth/login
   * Login de un usuario existente
   */
  static async login(req: Request, res: Response) {
    try {
      const { token } = req.body;

      // Validar
      if (!token) {
        return res.status(400).json({
          message: 'Token requerido',
        });
      }

      // Verificar y obtener el firebaseUID de forma segura
      const firebaseUID = await AuthService.verifyFirebaseToken(token);

      // Login
      const user = await AuthService.loginUser(firebaseUID);
      const { token: jwtToken, ...userData } = user;

      res.cookie('auth_token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: 'Login exitoso',
        data: userData,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error en el login',
        error: (error as Error).message,
      });
    }
  }

  /**
   * GET /api/auth/me
   * Obtiene los datos del usuario actual (requiere JWT)
   */
  static async me(req: Request, res: Response) {
    try {
      // auth() middleware asegura que req.user existe
      if (!req.user) {
        return res.status(401).json({
          message: 'No autenticado',
        });
      }

      // Obtener los datos completos del usuario
      const user = await AuthService.getUserById(req.user.sub, req.user.role);

      if (!user) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      return res.status(200).json({
        message: 'Datos del usuario',
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error al obtener usuario',
        error: (error as Error).message,
      });
    }
  }

  /**
   * POST /api/auth/verify-firebase (opcional)
   * Verifica que un token de Firebase sea válido
   */
  static async verifyFirebaseToken(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          message: 'Token requerido',
        });
      }

      const firebaseUID = await AuthService.verifyFirebaseToken(token);

      return res.status(200).json({
        message: 'Token de Firebase válido',
        firebaseUID,
      });
    } catch (error) {
      return res.status(401).json({
        message: 'Token de Firebase inválido',
        error: (error as Error).message,
      });
    }
  }

  /**
 * POST /api/auth/logout
 * Cierra sesión del usuario
 */
  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('auth_token');

      return res.status(200).json({
        message: 'Logout exitoso',
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Error en el logout',
        error: (error as Error).message,
      });
    }
  }
}

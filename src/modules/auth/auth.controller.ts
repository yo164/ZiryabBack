import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';

export class AuthController {
  /**
   * POST /auth/register
   * Recibe: firebaseUID, email, name, surname, birthDate, dni, role
   * Devuelve: JWT local
   */
  static async register(req: Request, res: Response) {
    try {
      const { firebaseUID, email, name, surname, ndSurname, birthDate, dni, role } = req.body;

      // Validaciones básicas
      if (!firebaseUID || !email || !name || !dni || !role) {
        return res.status(400).json({
          message: 'Faltan campos requeridos',
        });
      }

      // Verifica que el rol sea válido
      if (!['STUDENT', 'TEACHER', 'ADMIN'].includes(role)) {
        return res.status(400).json({
          message: 'Rol inválido',
        });
      }

      const result = await AuthService.registerUser({
        firebaseUID,
        email,
        name,
        surname,
        ndSurname,
        birthDate,
        dni,
        role,
      });

      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }

  /**
   * POST /auth/login
   * Recibe: firebaseUID (del token Firebase decodificado)
   * Devuelve: JWT local
   */
  static async login(req: Request, res: Response) {
    try {
      const { firebaseUID } = req.body;

      if (!firebaseUID) {
        return res.status(400).json({
          message: 'firebaseUID requerido',
        });
      }

      const result = await AuthService.loginUser(firebaseUID);

      return res.status(200).json({
        message: 'Login exitoso',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as Error).message,
      });
    }
  }

  /**
   * POST /auth/verify-firebase-token
   * Verifica que el token de Firebase sea válido
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
        message: 'Token válido',
        firebaseUID,
      });
    } catch (error) {
      return res.status(401).json({
        message: (error as Error).message,
      });
    }
  }

  /**
   * GET /auth/me
   * Obtiene los datos del usuario actual (autenticado)
   */
  static async getMe(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: 'No autenticado',
        });
      }

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
        message: (error as Error).message,
      });
    }
  }
}

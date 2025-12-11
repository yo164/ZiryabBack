import type { Request, Response, NextFunction } from 'express';

// Extender la interfaz de Request para incluir el rol
declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: number;
        email: string;
        firebaseUID: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware que verifica que el usuario tenga uno de los roles especificados
 */
export function authorize(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'No autenticado',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'No tienes permiso para acceder a este recurso',
      });
    }

    next();
  };
}

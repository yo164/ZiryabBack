import { prisma } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { firebaseAuth } from '../../config/firebase.config.js';

export interface RegisterPayload {
  firebaseUID: string;
  email: string;
  name: string;
  surname: string;
  ndSurname?: string;
  birthDate: string;
  dni: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

export interface UserPayload {
  sub: number;
  email: string;
  firebaseUID: string;
  role: string;
}

export class AuthService {
  /**
   * Verifica el token de Firebase y obtiene el UID
   */
  static async verifyFirebaseToken(token: string): Promise<string> {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      throw new Error('Token de Firebase inválido');
    }
  }

  /**
   * Registra un usuario en la BD Local después de Firebase
   */
  static async registerUser(payload: RegisterPayload) {
    const { firebaseUID, email, name, surname, ndSurname, birthDate, dni, role } = payload;

    // Verifica si el usuario ya existe
    const existingUser = await this.findUserByFirebaseUID(firebaseUID);
    if (existingUser) {
      throw new Error('Usuario ya registrado en la BD local');
    }

    // Crea usuario según su rol
    let user: any;

    if (role === 'STUDENT') {
      user = await prisma.student.create({
        data: {
          firebaseUID,
          email,
          name,
          surname,
          ndSurname,
          birthDate: new Date(birthDate),
          dni,
          role: 'STUDENT',
        },
      });
    } else if (role === 'TEACHER') {
      user = await prisma.teacher.create({
        data: {
          firebaseUID,
          email,
          name,
          surname,
          ndSurname,
          birthDate: new Date(birthDate),
          dni,
          role: 'TEACHER',
        },
      });
    } else if (role === 'ADMIN') {
      user = await prisma.admin.create({
        data: {
          firebaseUID,
          email,
          name,
          surname,
          ndSurname,
          birthDate: new Date(birthDate),
          dni,
          role: 'ADMIN',
        },
      });
    }

    // Genera JWT local
    const jwtToken = this.generateJWT({
      sub: user.id,
      email: user.email,
      firebaseUID: user.firebaseUID,
      role: user.role,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      firebaseUID: user.firebaseUID,
      token: jwtToken,
    };
  }

  /**
   * Busca un usuario por firebaseUID
   */
  static async findUserByFirebaseUID(firebaseUID: string) {
    const student = await prisma.student.findUnique({
      where: { firebaseUID },
    });

    if (student) return { ...student, model: 'Student' };

    const teacher = await prisma.teacher.findUnique({
      where: { firebaseUID },
    });

    if (teacher) return { ...teacher, model: 'Teacher' };

    const admin = await prisma.admin.findUnique({
      where: { firebaseUID },
    });

    if (admin) return { ...admin, model: 'Admin' };

    return null;
  }

  /**
   * Login: obtiene usuario existente por firebaseUID
   */
  static async loginUser(firebaseUID: string) {
    const user = await this.findUserByFirebaseUID(firebaseUID);

    if (!user) {
      throw new Error('Usuario no encontrado en BD local');
    }

    const jwtToken = this.generateJWT({
      sub: user.id,
      email: user.email,
      firebaseUID: user.firebaseUID,
      role: user.role,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      firebaseUID: user.firebaseUID,
      token: jwtToken,
    };
  }

  /**
   * Genera JWT con los datos del usuario
   */
  static generateJWT(payload: UserPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRY,
    });
  }

  /**
   * Obtiene usuario por ID de BD local
   */
  static async getUserById(id: number, role: string) {
    if (role === 'STUDENT') {
      return await prisma.student.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          role: true,
          firebaseUID: true,
        },
      });
    } else if (role === 'TEACHER') {
      return await prisma.teacher.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          role: true,
          firebaseUID: true,
        },
      });
    } else if (role === 'ADMIN') {
      return await prisma.admin.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          role: true,
          firebaseUID: true,
        },
      });
    }

    return null;
  }
}

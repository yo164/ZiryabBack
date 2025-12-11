import { prisma } from '../../config/db.js';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { firebaseAuth } from '../../config/firebase.config.js';

// ============================================
// INTERFACES
// ============================================

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

export interface UserWithToken {
  id: number;
  email: string;
  name: string;
  role: string;
  firebaseUID: string;
  token: string;
}

// ============================================
// TIPOS INTERNOS
// ============================================

type User = {
  id: number;
  email: string;
  name: string;
  surname: string;
  ndSurname: string | null;
  birthDate: Date;
  dni: string;
  role: string;
  firebaseUID: string;
  createdAt: Date;
};

// ============================================
// SERVICIO
// ============================================

export class AuthService {
  /**
   * Verifica el token de Firebase y obtiene el UID
   */
  static async verifyFirebaseToken(token: string): Promise<string> {
    try {
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      return decodedToken.uid;
    } catch (error) {
      throw new Error(`Token de Firebase inválido: ${(error as Error).message}`);
    }
  }

  /**
   * Registra un usuario en la BD Local después de Firebase
   */
  static async registerUser(payload: RegisterPayload): Promise<UserWithToken> {
    const {
      firebaseUID,
      email,
      name,
      surname,
      ndSurname,
      birthDate,
      dni,
      role,
    } = payload;

    // Validar que el rol sea válido
    if (!['STUDENT', 'TEACHER', 'ADMIN'].includes(role)) {
      throw new Error('Rol inválido. Debe ser: STUDENT, TEACHER o ADMIN');
    }

    // Verifica si el usuario ya existe
    const existingUser = await this.findUserByFirebaseUID(firebaseUID);
    if (existingUser) {
      throw new Error('Usuario ya registrado en la BD local');
    }

    // Crea usuario según su rol
    let user: User;

    if (role === 'STUDENT') {
      user = await prisma.student.create({
        data: {
          firebaseUID,
          email,
          name,
          surname,
          ndSurname: ndSurname || null,
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
          ndSurname: ndSurname || null,
          birthDate: new Date(birthDate),
          dni,
          role: 'TEACHER',
        },
      });
    } else {
      // role === 'ADMIN' (ya validado arriba)
      user = await prisma.admin.create({
        data: {
          firebaseUID,
          email,
          name,
          surname,
          ndSurname: ndSurname || null,
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

    // ✅ Retorno tipado
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
   * Busca un usuario por firebaseUID en cualquiera de las 3 tablas
   */
  static async findUserByFirebaseUID(firebaseUID: string): Promise<User | null> {
    // Buscar en Student
    const student = await prisma.student.findUnique({
      where: { firebaseUID },
    });
    if (student) return student;

    // Buscar en Teacher
    const teacher = await prisma.teacher.findUnique({
      where: { firebaseUID },
    });
    if (teacher) return teacher;

    // Buscar en Admin
    const admin = await prisma.admin.findUnique({
      where: { firebaseUID },
    });
    if (admin) return admin;

    return null;
  }

  /**
   * Login: obtiene usuario existente por firebaseUID
   */
  static async loginUser(firebaseUID: string): Promise<UserWithToken> {
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

    // ✅ Retorno tipado
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
   * ✅ CORREGIDO: opciones tipadas correctamente
   */
  static generateJWT(payload: UserPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRY,
    } as jwt.SignOptions); // ← Agrega type casting
  }

  /**
   * Obtiene usuario por ID de BD local según su rol
   */
  static async getUserById(
    id: number,
    role: string
  ): Promise<{
    id: number;
    email: string;
    name: string;
    surname: string;
    role: string;
    firebaseUID: string;
  } | null> {
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

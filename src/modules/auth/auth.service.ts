import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import prisma from '../../config/prisma.js';
import { firebaseAuth } from '../../config/firebase.js';

/**
 * Verifica el token de Firebase
 */
export async function verifyFirebaseToken(firebaseToken: string) {
  try {
    const decodedToken = await firebaseAuth.verifyIdToken(firebaseToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email!,
    };
  } catch (error) {
    throw new Error('Token de Firebase inválido');
  }
}

/**
 * Registra un usuario después de que Firebase lo haya autenticado
 */
export async function register(email: string, name: string, firebaseUid: string) {
  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    throw new Error('Email ya registrado');
  }
  
  const user = await prisma.admin.create({
    data: {
      email,
      name,
      surname: 'Por definir',
      dni: `FIREBASE-${firebaseUid}`,
      birthDate: new Date('2000-01-01'),
    },
  });
  
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { user, token };
}

/**
 * Login: Firebase ya validó las credenciales
 */
export async function login(email: string, firebaseUid: string) {
  const user = await prisma.admin.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error('Usuario no encontrado. Debes registrarte primero.');
  }
  
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return { 
    user: { 
      id: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    }, 
    token 
  };
}
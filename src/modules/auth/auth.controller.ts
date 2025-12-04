import type { Request, Response } from 'express';
import { register, login, verifyFirebaseToken } from './auth.service.js';
import { registerSchema, loginSchema } from './auth.schema.js';

/**
 * Registro: Cliente ya autenticó con Firebase, 
 * ahora creamos el usuario en nuestra BD
 */
export async function registerCtrl(req: Request, res: Response) {
  try {
    const { email, name, firebaseToken } = req.body;
    
    // Verificar token de Firebase
    const firebaseUser = await verifyFirebaseToken(firebaseToken);
    
    if (firebaseUser.email !== email) {
      return res.status(400).json({ 
        message: 'El email no coincide con el token de Firebase' 
      });
    }
    
    const data = await register(email, name, firebaseUser.uid);
    res.status(201).json(data);
  } catch (e: any) {
    if (e.message === 'Email ya registrado') {
      return res.status(409).json({ message: e.message });
    }
    res.status(400).json({ message: e.message });
  }
}

/**
 * Login: Cliente ya autenticó con Firebase,
 * buscamos usuario en BD y devolvemos nuestro JWT
 */
export async function loginCtrl(req: Request, res: Response) {
  try {
    const { email, firebaseToken } = req.body;
    
    // Verificar token de Firebase
    const firebaseUser = await verifyFirebaseToken(firebaseToken);
    
    if (firebaseUser.email !== email) {
      return res.status(400).json({ 
        message: 'El email no coincide con el token de Firebase' 
      });
    }
    
    const data = await login(email, firebaseUser.uid);
    res.json(data);
  } catch (e: any) {
    if (e.message.includes('no encontrado')) {
      return res.status(404).json({ message: e.message });
    }
    res.status(400).json({ message: e.message });
  }
}
import type { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service.js';
import * as usersService from './users.service.js';

const getRequester = (req: Request) => ({
  id: req.user?.sub,
  role: req.user?.role,
});

export const getUsers = async (_req: Request, res: Response) => {
  const users = await usersService.findAllUsers();
  return res.status(200).json(users);
};

export const getMe = async (req: Request, res: Response) => {
  const requester = getRequester(req);
  if (!requester.id || !requester.role) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const user = await usersService.findCurrentUser(requester.id, requester.role);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  return res.status(200).json(user);
};

export const updateMe = async (req: Request, res: Response) => {
  const requester = getRequester(req);
  if (!requester.id || !requester.role) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const { name, email } = req.body as { name?: string; email?: string };
  if (email !== undefined && !email.includes('@')) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  const user = await usersService.updateCurrentUser(requester.id, requester.role, { name, email });
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.status(200).json(user);
};

export const updateMyPassword = async (req: Request, res: Response) => {
  const requester = getRequester(req);
  if (!requester.id || !requester.role) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const { currentPassword, newPassword } = req.body as { currentPassword?: string; newPassword?: string };
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'currentPassword y newPassword son requeridos' });
  }

  const user = await usersService.findCurrentUser(requester.id, requester.role);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (!AuthService.validateLegacyTestPassword(user.email, currentPassword)) {
    return res.status(400).json({ message: 'Contraseña actual incorrecta' });
  }

  AuthService.setLegacyTestPassword(user.email, newPassword);
  return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id || Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const user = await usersService.findUserById(id);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.status(200).json(user);
};

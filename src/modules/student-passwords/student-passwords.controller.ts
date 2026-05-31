import type { Request, Response } from 'express';
import * as studentPasswordsService from './student-passwords.service.js';

const parseId = (value: string | undefined): number => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error('ID inválido');
  }
  return parsed;
};

export const getByTutor = async (req: Request, res: Response) => {
  try {
    const idTutor = parseId(req.params.idTutor);
    const requesterId = req.user?.sub;
    const requesterRole = req.user?.role;

    if (requesterRole === 'TEACHER' && requesterId !== idTutor) {
      return res.status(403).json({ message: 'No autorizado para consultar este tutor' });
    }

    const rows = await studentPasswordsService.findByTutor(idTutor);
    const data = rows.map((row) => ({
      idStudent: row.idStudent,
      studentName: `${row.student.name} ${row.student.surname}`.trim(),
      password: row.password,
    }));

    return res.status(200).json({
      message: 'Credenciales del tutor recuperadas',
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    const status = message === 'ID inválido' ? 400 : 500;
    return res.status(status).json({ message });
  }
};

export const getByStudent = async (req: Request, res: Response) => {
  try {
    const idStudent = parseId(req.params.idStudent);
    const requesterId = req.user?.sub;
    const requesterRole = req.user?.role;

    const credential = await studentPasswordsService.findByStudent(idStudent);
    if (!credential) {
      return res.status(404).json({ message: 'Credencial no encontrada' });
    }

    if (requesterRole === 'TEACHER' && credential.idTutor !== requesterId) {
      return res.status(403).json({ message: 'No autorizado para consultar este alumno' });
    }

    return res.status(200).json({
      message: 'Credencial del alumno recuperada',
      data: {
        idStudent: credential.idStudent,
        studentName: `${credential.student.name} ${credential.student.surname}`.trim(),
        password: credential.password,
        idTutor: credential.idTutor,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    const status = message === 'ID inválido' ? 400 : 500;
    return res.status(status).json({ message });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const idStudent = parseId(req.params.idStudent);
    const password = typeof req.body.password === 'string' ? req.body.password.trim() : '';

    if (!password) {
      return res.status(400).json({ message: 'password es obligatorio' });
    }

    const updated = await studentPasswordsService.updatePasswordByStudent(idStudent, password);

    return res.status(200).json({
      message: 'Credencial actualizada',
      data: {
        idStudent: updated.idStudent,
        studentName: `${updated.student.name} ${updated.student.surname}`.trim(),
        password: updated.password,
        idTutor: updated.idTutor,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    if (message === 'ID inválido') {
      return res.status(400).json({ message });
    }
    if (message.includes('No record was found')) {
      return res.status(404).json({ message: 'Credencial no encontrada' });
    }
    return res.status(500).json({ message });
  }
};

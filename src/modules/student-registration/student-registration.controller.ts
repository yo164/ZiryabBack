import type { Request, Response } from 'express';
import * as studentOnSubjectService from './student-registration.service.js';

export const createStudentOnSubjectOnGroup = async (req: Request, res: Response) => {
  try {
    const studentData = req.body;

    const newEntry = await studentOnSubjectService.create(studentData);

    res.status(201).json({
      success: true,
      data: {
        id: newEntry.id,
        idStudent: newEntry.idStudent,
        idGroup: newEntry.idGroup,
        idSubject: newEntry.idSubject,
        schoolYear: newEntry.schoolYear,
        createdAt: newEntry.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Error al matricular estudiante',
      error: error.message,
    });
  }
};

import { Request, Response } from 'express';
import * as gradeService from './grade.service.js';
import { EvaluationPeriod } from '@prisma/client';
import prisma from '../../config/prisma.js';

export const getMyGrades = async (req: Request, res: Response) => {
  try {
    const studentId = req.user?.sub;
    if (!studentId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const enrollments = await prisma.studentOnSubjectOnGroup.findMany({
      where: { idStudent: studentId },
      include: { subject: true },
    });

    const allGrades = [];
    for (const enrollment of enrollments) {
      const grades = await gradeService.findByStudentEnrollment(enrollment.id);
      allGrades.push({
        enrollmentId: enrollment.id,
        subjectId: enrollment.idSubject,
        subjectName: enrollment.subject.name,
        grades,
      });
    }

    res.json({ message: 'Notas recuperadas', data: allGrades });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const upsertGrade = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.sub;
    if (!teacherId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const grade = await gradeService.upsertGrade(teacherId, req.body);
    res.json({ message: 'Nota guardada correctamente', data: grade });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const bulkUpsertGrades = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.sub;
    if (!teacherId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const results = await gradeService.bulkUpsertGrades(teacherId, req.body.grades);
    res.json({ message: 'Notas guardadas correctamente', data: results });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTutoredGroups = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.sub;
    if (!teacherId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const groups = await gradeService.getTutoredGroups(teacherId);
    res.json({ message: 'Grupos tutorados recuperados', data: groups });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getGradesByCourseGroupAndPeriod = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user?.sub;
    const { idCourseGroup, period } = req.params;

    if (!teacherId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const isTutor = await gradeService.isTutorOfCourseGroup(
      teacherId,
      parseInt(idCourseGroup)
    );
    if (!isTutor) {
      return res.status(403).json({ message: 'No eres el tutor de este grupo' });
    }

    const grades = await gradeService.findByCourseGroupAndPeriod(
      parseInt(idCourseGroup),
      period as EvaluationPeriod
    );
    res.json({ message: 'Notas del grupo recuperadas', data: grades });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { z } from 'zod';

export const EvaluationPeriodSchema = z.enum([
  'INITIAL',
  'FIRST_TRIMESTER',
  'SECOND_TRIMESTER',
  'THIRD_TRIMESTER',
  'FINAL',
]);

export const CreateGradeSchema = z.object({
  idStudentEnrollment: z.number().int().positive(),
  period: EvaluationPeriodSchema,
  value: z.number().int().min(1).max(10).optional(),
  observations: z.string().max(500).nullable().optional().or(z.literal('')),
});

export const UpdateGradeSchema = z.object({
  value: z.number().int().min(1).max(10).optional(),
  observations: z.string().max(500).nullable().optional().or(z.literal('')),
});

export const BulkCreateGradesSchema = z.object({
  grades: z.array(
    z.object({
      idStudentEnrollment: z.number().int().positive(),
      period: EvaluationPeriodSchema,
      value: z.number().int().min(1).max(10).optional(),
      observations: z.string().max(500).nullable().optional().or(z.literal('')),
    })
  ),
});

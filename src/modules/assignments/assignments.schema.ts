import { z } from 'zod';
import { AssignmentStatus } from '@prisma/client';

const assignmentStatusSchema = z.nativeEnum(AssignmentStatus);

export const createAssignmentBodySchema = z.object({
  idTeacher: z.coerce.number().int().positive(),
  idSubject: z.coerce.number().int().positive(),
  idGroup: z.coerce.number().int().positive(),
  schoolYear: z.string().min(1, 'schoolYear obligatorio'),
  status: assignmentStatusSchema.optional(),
});

export type CreateAssignmentBody = z.infer<typeof createAssignmentBodySchema>;

export const createAssignmentsBulkBodySchema = z.object({
  assignments: z.array(createAssignmentBodySchema).min(1, 'Al menos una asignación').max(500),
});

export type CreateAssignmentsBulkBody = z.infer<typeof createAssignmentsBulkBodySchema>;

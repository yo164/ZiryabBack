import { IssueAudience } from '@prisma/client';
import { z } from 'zod';

const issueAudienceSchema = z.nativeEnum(IssueAudience);

const issueGradeSchema = z
  .enum(['1', '2'])
  .optional();

const issueFksSchema = {
  idGroup: z.coerce.number().int().positive().optional(),
  idCourse: z.coerce.number().int().positive().optional(),
  idSubject: z.coerce.number().int().positive().optional(),
  grade: issueGradeSchema,
};

export const createIssueBodySchema = z.object({
  audience: issueAudienceSchema,
  title: z.string().min(1, 'title obligatorio'),
  body: z.string().min(1, 'body obligatorio'),
  attachmentUrl: z.string().optional(),
  ...issueFksSchema,
  isPublished: z.boolean().optional(),
  publishAt: z.string().optional(),
  expiresAt: z.string().optional(),
});

export const updateIssueBodySchema = createIssueBodySchema.partial().extend({
  attachmentUrl: z.string().nullable().optional(),
  idGroup: z.coerce.number().int().positive().nullable().optional(),
  idCourse: z.coerce.number().int().positive().nullable().optional(),
  idSubject: z.coerce.number().int().positive().nullable().optional(),
  grade: z.enum(['1', '2']).nullable().optional(),
  publishAt: z.string().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
});

export type CreateIssueBody = z.infer<typeof createIssueBodySchema>;
export type UpdateIssueBody = z.infer<typeof updateIssueBodySchema>;

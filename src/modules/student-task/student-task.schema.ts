import { z } from 'zod';

export const submitSchema = z.object({
  attachmentUrl: z.string().optional().nullable(),
});

export type SubmitInput = z.infer<typeof submitSchema>;

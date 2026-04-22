import { z } from 'zod';

export const submitSchema = z.object({
  attachmentUrl: z.string().url('attachmentUrl debe ser una URL válida').optional(),
});

export type SubmitInput = z.infer<typeof submitSchema>;

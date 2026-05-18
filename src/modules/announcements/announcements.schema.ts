import { z } from 'zod';

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, 'El título es obligatorio'),
  body: z.string().min(1, 'El cuerpo del anuncio es obligatorio'),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;

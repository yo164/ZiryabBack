import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(3, 'El título debe tener al menos 3 caracteres')
});

export const updateTaskSchema = z.object({
    title: z.string().min(3).optional(),
    done: z.boolean().optional()
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
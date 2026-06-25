import { z } from 'zod';

export const requestSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı'),
  type: z.enum(['purchase', 'leave', 'access']),
});

export type RequestFormValues = z.infer<typeof requestSchema>;

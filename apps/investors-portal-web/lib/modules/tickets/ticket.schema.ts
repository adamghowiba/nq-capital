import { z } from 'zod';

export const TICKET_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'] as const;

export const supportTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  type: z.enum(['SUPPORT', 'SALES']),
  priority: z.enum(TICKET_PRIORITIES).default('MEDIUM'),
  description: z.string().optional(),
});

export type SupportTicketSchema = z.infer<typeof supportTicketSchema>;

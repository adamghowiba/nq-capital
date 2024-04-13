import { z } from 'zod';

export type SupportTicketUrgency = 'Low' | 'Medium' | 'High';
export const supportTicketUrgencies: SupportTicketUrgency[] = [
  'High',
  'Low',
  'Medium',
];

export const supportTicketSchema = z.object({
  description: z.string().min(1, 'Required'),
  additionalInfo: z.string().optional(),
  date: z
    .date({ required_error: 'Required' })
    .min(new Date(), { message: 'Cannot be earlier than now' }),
  urgency: z
    .string()
    .refine(
      (val) => supportTicketUrgencies.includes(val as SupportTicketUrgency),
      {
        message: `Value must be one of: ${supportTicketUrgencies.join(', ')}`,
      }
    ),
});

export type IAttachment = { attachment?: File };

export type ISupportTicketSchema = z.infer<typeof supportTicketSchema>;

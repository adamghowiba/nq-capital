import { z } from 'zod';

export const fundSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  initial_balance: z.number().optional().default(0),
});
export type FundSchema = z.infer<typeof fundSchema>;

export const fundAdjustmentSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  fund_id: z.number(),
});

export type FundAdjustmentSchema = z.infer<typeof fundAdjustmentSchema>;

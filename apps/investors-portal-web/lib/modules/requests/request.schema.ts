import { z } from 'zod';

export const investmentRequest = z.object({
  amount: z.number().min(1),
  investment_date: z.string(),
  bank_account_id: z.number().optional(),
  comments: z.string().optional(),
});

export type InvestmentRequest = z.infer<typeof investmentRequest>;

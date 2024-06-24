import { z } from 'zod';

export const investmentSchema = z.object({
  amount: z.number().min(1),
  investor_id: z.number({
    required_error: 'Investor is required',
    invalid_type_error: 'Invalid input, please select an investor',
  }),
  fund_id: z.number().optional(),
  notes: z.string().optional(),
  reference_id: z.string().optional(),
});

export type InvestmentSchema = z.infer<typeof investmentSchema>;

export const withdrawalSchema = z.object({
  investor_id: z.number({
    required_error: 'Investor is required',
    invalid_type_error: 'Invalid input, please select an investor',
  }),
  amount: z.number().min(1),
  bank_account_id: z
    .number({
      required_error: 'Bank account is required',
      invalid_type_error: 'Invalid input, please select a bank account',
    })
    .optional()
    .nullable(),
});

export type WithdrawalSchema = z.infer<typeof withdrawalSchema>;

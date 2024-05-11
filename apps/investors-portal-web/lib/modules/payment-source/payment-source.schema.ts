import { BankAccountType } from "@prisma/client";
import { z } from "zod";

export const bankAccountSchema = z.object({
  nickname: z.string().optional(),
  bank_name: z.string(),
  account_number: z.string(),
  account_holder_name: z.string(),
  account_type: z.nativeEnum(BankAccountType).optional().default("CHECKING"),
  bank_country: z.string(),
  currency: z.string().optional().default("USD"),
  routing_number: z.string().optional(),
  swift_code: z.string(),
  iban: z.string(),
  sort_code: z.string().optional(),
  bsb_number: z.string().optional(),
  bank_code: z.string().optional(),
  branch_code: z.string().optional(),
  branch_address: z.string().optional(),
  is_primary: z.boolean().optional(),

})
export type BankAccountSchema = z.infer<typeof bankAccountSchema>;

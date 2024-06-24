import { z } from 'zod';
import { bankAccountSchema } from '../payment-source/payment-source.schema';
import { DateTime } from 'luxon';

export const personalInformationSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  mobile_number: z.string().optional(),
  password: z.string().min(4, 'Password must be at least 4 characters'),
  password_confirmation: z.string(),
});
export type PersonalInformationSchema = z.infer<
  typeof personalInformationSchema
>;

const now = new Date()

export const identitySchema = z
  .object({
    passport_number: z.string().min(1, 'Password is required'),
    passport_issue_date: z.string().min(1, 'Passport issue date required'),
    passport_expiry_date: z.string().min(1, 'Passport expiry date required'),
    nationality: z.string().optional(),
    national_id_number: z.string().optional(),
    national_id_number_issue_date: z.string().optional(),
    national_id_number_expiry_date: z.string().optional(),
  })

export type IdentitySchema = z.infer<typeof identitySchema>;

export const onboardingSchema = z
  .object({ bank_accounts: z.array(bankAccountSchema).optional() })
  .merge(personalInformationSchema)
  .merge(identitySchema);

export type OnboardingSchema = z.infer<typeof onboardingSchema>;

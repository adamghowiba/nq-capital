import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    password_confirmation: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirmation'],
        message: 'New password must be the same as current password',
      });
    }

    return true;
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

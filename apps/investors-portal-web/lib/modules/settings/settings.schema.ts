import { ZodError, z } from 'zod';

export const generalSettingsSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});

export type GeneralSettingsSchema = z.infer<typeof generalSettingsSchema>;

export const securitySettingsSchema = z
  .object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(1, 'New password is required'),
  })
  .superRefine((args, ctx) => {
    if (args.current_password == args.new_password) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['new_password'],
        message: `New password cannot be the same as the current password`,
      });
    }
  });

export type SecuritySettingsSchema = z.infer<typeof securitySettingsSchema>;

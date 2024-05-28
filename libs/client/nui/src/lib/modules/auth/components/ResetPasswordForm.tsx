import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { FC } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import { NTextField } from '../../../components/Fields/NTextField';
import { ResetPasswordSchema, resetPasswordSchema } from '../auth.schema';
import { AuthPaper } from './AuthPaper';

export interface ResetPasswordFormProps {
  onSubmit: SubmitHandler<ResetPasswordSchema>;
  onInvalid?: SubmitErrorHandler<ResetPasswordSchema>;
  isLoading?: boolean;
  error?: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  onSubmit,
  onInvalid,
  isLoading,
  error,
  ...props
}) => {
  const form = useForm<ResetPasswordSchema>({
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  return (
    <AuthPaper
      component="form"
      onSubmit={form.handleSubmit(onSubmit, onInvalid || console.error)}
    >
      <Typography variant="h5">Forgot Password</Typography>

      <NTextField
        control={form.control}
        name="password"
        label="Password"
        type="password"
        isRequired
      />

      <NTextField
        control={form.control}
        name="password_confirmation"
        label="Confirm Password"
        type="password"
        isRequired
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isLoading}
        endIcon={
          isLoading && (
            <CircularProgress color="primary" thickness={5} size={14} />
          )
        }
      >
        Reset password
      </Button>

      <Typography sx={{ color: '#8D8D8D' }}>
        {'Already have an account? '}
        <Typography component={Link} href="/login" sx={{ color: '#202020' }}>
          Login
        </Typography>
      </Typography>
    </AuthPaper>
  );
};

import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { AuthPaper } from './AuthPaper';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordSchema, forgotPasswordSchema } from '../auth.schema';
import { Box } from '../../../components/Box/Box';
import Link from 'next/link';

export interface ForgotPasswordFormProps {
  onSubmit: SubmitHandler<ForgotPasswordSchema>;
  onInvalid?: SubmitErrorHandler<ForgotPasswordSchema>;
  isLoading?: boolean;
  error?: string;
  view?: 'forgot' | 'sent';
}

export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onInvalid,
  isLoading,
  error,
  view = 'forgot',
  ...props
}) => {
  const form = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  return (
    <AuthPaper
      component="form"
      onSubmit={form.handleSubmit(onSubmit, onInvalid || console.error)}
    >
      {view === 'sent' && (
          <Box textAlign="center">
            <Typography variant="h5">Password Reset Link Sent</Typography>
            <Typography>
              Pass reset email has been sent to your email. Please follow the
              instructions to reset your password
            </Typography>
          </Box>
      )}

      {view === 'forgot' && (
        <>
          <Typography variant="h5">Forgot Password</Typography>

          <Controller
            control={form.control}
            name={'email'}
            render={({ field }) => {
              return (
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <TextField {...field} />
                </FormControl>
              );
            }}
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
            Send reset link
          </Button>

          <Typography sx={{ color: '#8D8D8D' }}>
            {'Already have an account? '}
            <Typography
              component={Link}
              href="/login"
              sx={{ color: '#202020' }}
            >
              Login
            </Typography>
          </Typography>
        </>
      )}
    </AuthPaper>
  );
};

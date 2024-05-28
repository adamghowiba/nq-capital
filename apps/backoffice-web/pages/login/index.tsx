import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { queryClient } from '../../lib/api/query-client';
import { useLoginMutation, useMeUserQuery } from '../../lib/gql/gql-client';
import { NextPageWithLayout } from '../_app';
import AuthHeader from '../../lib/modules/auth/components/AuthHeader';
import { AuthPaper } from '@nq-capital/nui';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

const Login: NextPageWithLayout = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLoginMutation({
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: useMeUserQuery.getKey({}),
      });
      await router.push('/');
    },
  });

  const handleValidSubmission: SubmitHandler<LoginSchema> = (data) => {
    loginMutation.mutate({
      loginInput: {
        email: data.email,
        password: data.password,
        user_type: 'ADMIN',
      },
    });
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      bgcolor="#FCFCFC"
      height="100vh"
    >
      <AuthHeader title="Welcome back to NQ" />

      <AuthPaper
        component="form"
        onSubmit={form.handleSubmit(handleValidSubmission, console.error)}
      >
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

        <Controller
          control={form.control}
          name={'password'}
          render={({ field }) => {
            return (
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <TextField type="password" {...field} />
              </FormControl>
            );
          }}
        />

        {!!loginMutation.error && (
          <Typography color="error">
            Invalid email or password. Please try again.
          </Typography>
        )}

        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={loginMutation.isPending}
          endIcon={
            loginMutation.isPending && (
              <CircularProgress color="primary" thickness={5} size={14} />
            )
          }
        >
          Log In
        </Button>

        <Box sx={{ display: 'grid', rowGap: 1 }}>
          <Link href="forgot">
            <Typography>Forgot password?</Typography>
          </Link>
        </Box>
      </AuthPaper>
    </Stack>
  );
};

Login.getLayout = (page) => page;

export default Login;

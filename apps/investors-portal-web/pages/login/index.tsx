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
import { queryClient } from '../../lib/api/query-client';
import {
  useLoginMutation,
  useMeInvestorQuery,
  useMeQuery,
} from '../../lib/gql/gql-client';
import Link from 'next/link';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthHeader from '../../lib/modules/auth/components/AuthHeader';
import { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';

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
    onSuccess: (data, variables, context) => {
      queryClient.setQueriesData(
        {
          queryKey: useMeInvestorQuery.getKey(),
        },
        data
      );

      router.push('/');
    },
  });

  const handleValidSubmission: SubmitHandler<LoginSchema> = (data) => {
    loginMutation.mutate({
      loginInput: {
        email: data.email,
        password: data.password,
        user_type: 'INVESTOR',
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
      <AuthHeader title="Welcom back to NQ" />

      <Paper
        component="form"
        onSubmit={form.handleSubmit(handleValidSubmission, console.error)}
        sx={{
          width: '400px',
          padding: 3,
          boxShadow: '0px 0px 0px 1px #64646414, 0px 1px 2px 0px #6464641A',
          display: 'grid',
          rowGap: 3,
        }}
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
                <TextField {...field} />
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
          <Link href="forgot-password">
            <Typography>Forgot password ?</Typography>
          </Link>

          <Typography sx={{ color: '#8D8D8D' }}>
            {"Don't have an account? "}
            <Link href={'signup'}>
              <Typography component="span" sx={{ color: '#202020' }}>
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
};

Login.getLayout = (page) => page;

export default Login;

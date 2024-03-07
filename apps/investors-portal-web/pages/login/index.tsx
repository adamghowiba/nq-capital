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
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
import AuthHeader from '../../components/auth/AuthHeader';

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // TODO: this state may not be required as we'll read from request result.
  const [loginError, setLoginError] = useState<boolean>(false);

  const initialValues: { email: string; password: string } = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      // TODO: CALL API HERE TO SIGNIN
      setTimeout(() => {
        setIsSubmitting(false);
        setLoginError(true);
      }, 3000);
    },
  });

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
        onSubmit={formik.handleSubmit}
        sx={{
          width: '400px',
          padding: 3,
          boxShadow: '0px 0px 0px 1px #64646414, 0px 1px 2px 0px #6464641A',
          display: 'grid',
          rowGap: 3,
        }}
      >
        <FormControl required>
          <FormLabel>Email</FormLabel>
          <TextField
            size="small"
            placeholder="Enter your email"
            required
            autoFocus
            type="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
            disabled={isSubmitting}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <TextField
            size="small"
            placeholder="Enter password"
            type="password"
            required
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
            disabled={isSubmitting}
          />
        </FormControl>
        {loginError && (
          <Typography color="error">
            Invalid email or password. Please try again.
          </Typography>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
          endIcon={
            isSubmitting && (
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
}

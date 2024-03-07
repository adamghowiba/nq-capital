import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';
import AuthHeader from '../../lib/modules/auth/components/AuthHeader';

export default function Signup() {
  const initialValues: {
    email: string;
    password: string;
    confirm_password: string;
  } = {
    email: '',
    password: '',
    confirm_password: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'passwordMismatch'),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      // TODO: CALL API HERE TO up with values values.email, values.password
      setTimeout(() => {
        setIsSubmitting(false);
        resetForm();
      }, 3000);
    },
  });

  return (
    <Box
      sx={{
        bgcolor: '#FCFCFC',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'start',
        height: '100svh',
        rowGap: 5,
        paddingTop: '192px',
      }}
    >
      <AuthHeader title="Create your account" />
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
        <Box sx={{ display: 'grid', rowGap: 1 }}>
          <Typography>Email</Typography>
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
        </Box>
        <Box sx={{ display: 'grid', rowGap: 1 }}>
          <Typography>Password</Typography>
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
        </Box>
        <Box sx={{ display: 'grid', rowGap: 1 }}>
          <Typography>Confirm Password</Typography>
          <TextField
            size="small"
            placeholder="Confirm you password"
            type="password"
            required
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            {...formik.getFieldProps('confirm_password')}
            disabled={isSubmitting}
          />
        </Box>
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
          Sign Up
        </Button>
        <Typography sx={{ color: '#8D8D8D' }}>
          {'Already have an account? '}
          <Link href={'signup'}>
            <Typography component="span" sx={{ color: '#202020' }}>
              Log In
            </Typography>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

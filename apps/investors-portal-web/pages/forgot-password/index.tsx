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
import Logo from '../../components/Logo/logo';

export default function ForgotPassword() {
  const initialValues: {
    email: string;
  } = {
    email: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      // TODO: CALL API HERE TO reset password with values values.email
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
        alignContent: 'center',
        height: '100svh',
        rowGap: 5,
      }}
    >
      <Box sx={{ display: 'grid', justifyItems: 'center', rowGap: 2 }}>
        <Logo />
        <Typography variant="h2" color="#8D8D8D">
          Reset your password
        </Typography>
      </Box>

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
          Continue
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

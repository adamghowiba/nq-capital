import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
import AuthHeader from '../../../components/auth/AuthHeader';
import OneSnackbar from '../../../components/utils/OneSnackbar';

export default function ResetPassword() {
  const initialValues: {
    password: string;
    confirm_password: string;
  } = {
    password: '',
    confirm_password: '',
  };

  const {
    query: { link },
  } = useRouter();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Required field'),
    confirm_password: Yup.string()
      .required('Required field')
      .oneOf([Yup.ref('password')], 'passwordMismatch'),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isInvalidLink, setIsInvalidLink] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      // TODO: CALL API HERE TO reset password with values.password and link
      setTimeout(() => {
        setIsSubmitting(false);
        //TODO: set isInvalidLink to true when backend says it's invalid.
        setIsInvalidLink(true);
        resetForm();
      }, 3000);
    },
  });

  const [isResending, setIsResending] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  function resendLink() {
    // TODO: CALL API HERE TO RESEND RESET PASSWORD LINK
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setIsToastOpen(true);
    }, 3000);
  }

  return (
    <>
      <OneSnackbar close={() => setIsToastOpen(false)} isOpen={isToastOpen} />
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
        <AuthHeader
          title={isInvalidLink ? 'Reset Link Invalid' : 'Enter new password'}
        />
        {isInvalidLink ? (
          <Paper
            sx={{
              width: '400px',
              padding: 3,
              boxShadow: '0px 0px 0px 1px #64646414, 0px 1px 2px 0px #6464641A',
              display: 'grid',
              rowGap: 3,
            }}
          >
            <Typography textAlign="center" color="error">
              Password reset link no longer exists or has already been expired.
              Please try again.
            </Typography>
            <Button
              onClick={resendLink}
              color="primary"
              variant="contained"
              disabled={isResending}
              endIcon={
                isResending && (
                  <CircularProgress color="primary" thickness={5} size={14} />
                )
              }
            >
              Resend Link
            </Button>
          </Paper>
        ) : (
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
              <Typography>Password</Typography>
              <TextField
                size="small"
                placeholder="Enter password"
                type="password"
                required
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
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
              Continue
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}

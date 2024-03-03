import {
    Box,
    Button,
    CircularProgress,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import AuthHeader from '../../components/auth/AuthHeader';

export default function ResetPassword() {
  const initialValues: {
    password: string;
    confirm_password: string;
  } = {
    password: '',
    confirm_password: '',
  };
  const validationSchema = Yup.object().shape({
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
      <AuthHeader title="Enter new password" />
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
          Continue
        </Button>
      </Paper>
    </Box>
  );
}

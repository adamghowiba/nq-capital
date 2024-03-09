import { Box, Button, Divider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { OneTextField } from '../utils/OneTextField';

interface IUserData {
  email: string;
  first_name: string;
  last_name: string;
}

export default function General() {
  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    //TODO: CALL API HERE TO LOAD USER DATA
    setIsLoadingUserData(true);
    setTimeout(() => {
      setIsLoadingUserData(false);
      setUserData({
        email: 'johndoe@mail.com',
        first_name: 'John',
        last_name: 'Doe',
      });
    }, 3000);
  }, []);

  const initialValues: IUserData = userData ?? {
    email: '',
    first_name: '',
    last_name: '',
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      /*TODO: CALL API HERE change user data,
        reset form and mutate userData state afterwards
      */
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setUserData(values);
        resetForm();

        //TODO: IF ERROR SET IN submitError
        setSubmitError("Couldn't save your changes!");
      }, 3000);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'grid', rowGap: 5 }}
    >
      <Divider />
      <OneTextField
        OneLabel="Email"
        placeholder="Enter your email"
        required
        type="email"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        {...formik.getFieldProps('email')}
        disabled={isSubmitting || isLoadingUserData}
      />
      <OneTextField
        OneLabel="First name"
        placeholder="Enter your first name"
        required
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        {...formik.getFieldProps('first_name')}
        disabled={isSubmitting || isLoadingUserData}
      />
      <OneTextField
        OneLabel="Last name"
        placeholder="Enter your last name"
        required
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
        {...formik.getFieldProps('last_name')}
        disabled={isSubmitting || isLoadingUserData}
      />
      {submitError && !isSubmitting && !isLoadingUserData && (
        <Typography color="error">{submitError}</Typography>
      )}
      <Button
        type="submit"
        color="primary"
        variant="contained"
        sx={{
          justifySelf: 'start',
        }}
        disabled={
          isSubmitting ||
          (formik.values.email === userData.email &&
            formik.values.first_name === userData.first_name &&
            formik.values.last_name === userData.last_name)
        }
      >
        Save Changes
      </Button>
      <Divider />
    </Box>
  );
}

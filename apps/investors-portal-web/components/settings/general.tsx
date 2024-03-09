import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { ConfirmDialog } from '../utils/ConfirmDialog';
import { OneTextField } from '../utils/OneTextField';
import { theme } from '../../lib/theme';

interface IUserData {
  email: string;
  first_name: string;
  last_name: string;
}

export default function General() {
  const { push } = useRouter();
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

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);

  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
  function deleteAccount() {
    //TODO: CALL API HERE TO DELETE ACCOUNT
    setIsDeletingAccount(true);
    setTimeout(() => {
      setIsDeletingAccount(false);
      setIsConfirmDialogOpen(false);
      //TODO: navigate user to signup or landing page after successful account deletion.
      push('/signup');
    }, 3000);
  }

  return (
    <>
      <ConfirmDialog
        closeDialog={() => setIsConfirmDialogOpen(false)}
        dialogMessage="Are you sure you want to delete your account? Note that this action is irreversible!"
        isDialogOpen={isConfirmDialogOpen}
        confirm={deleteAccount}
        closeOnConfirm
        dialogTitle="Delete Account"
        danger
        isSubmitting={isDeletingAccount}
      />
      <Box sx={{ display: 'grid', rowGap: 5 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: 3,
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              height: '56px',
              width: '56px',
              backgroundColor: theme.palette.secondary.main,
              color: '#8D8D8D',
            }}
          >
            J
          </Avatar>
          <Box sx={{ display: 'grid', rowGap: 1, justifyItems: 'start' }}>
            <Typography>Profile Picture</Typography>
            <Button variant="contained" color="secondary">
              Upload
            </Button>
          </Box>
        </Box>
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
          <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: 3 }}>
            <OneTextField
              OneLabel="First name"
              placeholder="Enter your first name"
              required
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              {...formik.getFieldProps('first_name')}
              disabled={isSubmitting || isLoadingUserData}
            />
            <OneTextField
              OneLabel="Last name"
              placeholder="Enter your last name"
              required
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              {...formik.getFieldProps('last_name')}
              disabled={isSubmitting || isLoadingUserData}
            />
          </Box>
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
        <Box
          sx={{
            display: 'grid',
            rowGap: 2,
            justifyItems: 'start',
          }}
        >
          <Box>
            <Typography>Delete Account</Typography>
            <Typography color="#BBBBBB">
              This action could not be undone
            </Typography>
          </Box>
          <Button
            color="error"
            variant="contained"
            onClick={() => setIsConfirmDialogOpen(true)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}

import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Divider,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { theme } from '../../lib/theme';
import { ConfirmDialog } from '../utils/ConfirmDialog';
import { OneTextField } from '../utils/OneTextField';

interface IUserData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image_ref?: string;
}

export default function General() {
  const { push } = useRouter();
  const [isLoadingUserData, setIsLoadingUserData] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    first_name: '',
    last_name: '',
  });

  const [newProfileImage, setNewProfileImage] = useState<{
    display: string;
    upload: File;
  }>();

  useEffect(() => {
    //TODO: CALL API HERE TO LOAD USER DATA
    setIsLoadingUserData(true);
    setTimeout(() => {
      setIsLoadingUserData(false);
      // ensures that there's no new image in state after data loading
      setNewProfileImage(undefined);
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
    email: Yup.string().email().required('Required field'),
    first_name: Yup.string().required('Required field'),
    last_name: Yup.string().required('Required field'),
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

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && !!e.target.files[0]) {
      const upload: File = e.target.files[0] as File;
      const display = URL.createObjectURL(upload);

      setNewProfileImage({ upload, display });
    }
  }

  const [isChangingProfileImage, setIsChangingProfileImage] =
    useState<boolean>(false);
  function changeProfileImage() {
    /* TODO: CALL API HERE TO CHANGE PROFILE IMAGE with data newProfileImage.upload
        mutate useData afterwards
    */
    setIsChangingProfileImage(true);
    setTimeout(() => {
      setIsChangingProfileImage(false);
      setUserData({ ...userData, profile_image_ref: newProfileImage?.display });
      setNewProfileImage(undefined);
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
            src={
              newProfileImage
                ? newProfileImage.display
                : userData.profile_image_ref
            }
            alt="profile"
          >
            {userData.first_name ? userData.first_name[0] : 'U'}
          </Avatar>
          <Box sx={{ display: 'grid', rowGap: 1, justifyItems: 'start' }}>
            <Typography>Profile Picture</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                columnGap: 2,
              }}
            >
              {!isChangingProfileImage && (
                <Box>
                  <input
                    accept="image/*,video/*"
                    hidden
                    id="raised-button-file"
                    type="file"
                    onChange={handleFileInput}
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      variant="contained"
                      color="secondary"
                      component="span"
                      disabled={isLoadingUserData}
                    >
                      {newProfileImage ? 'Change' : 'Upload'}
                    </Button>
                  </label>
                </Box>
              )}
              {newProfileImage && (
                <Button
                  color="primary"
                  variant="contained"
                  disabled={isChangingProfileImage}
                  onClick={changeProfileImage}
                  endIcon={
                    isChangingProfileImage && (
                      <CircularProgress
                        color="primary"
                        thickness={5}
                        size={14}
                      />
                    )
                  }
                >
                  Save Changes
                </Button>
              )}
            </Box>
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
            endIcon={
              isSubmitting && (
                <CircularProgress color="primary" thickness={5} size={14} />
              )
            }
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

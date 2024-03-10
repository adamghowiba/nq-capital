import eye from '@iconify/icons-fluent/eye-20-filled';
import eyeOff from '@iconify/icons-fluent/eye-off-20-filled';
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Switch,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import OneIcon from '../utils/OneIcon';
import { OneTextField } from '../utils/OneTextField';

interface SecurityData {
  current_password: string;
  new_password: string;
  confirm_password: string;
  enable_2fa: boolean;
}

export default function Security() {
  const [isLoading2FA, setIsLoading2FA] = useState<boolean>(false);
  const [has2FA, setHas2FA] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading2FA(true);
    //TODO: LOAD THE DATA WRT 2FA, IF IT'S ENABLED OR NOT
    setTimeout(() => {
      setHas2FA(true);
      setIsLoading2FA(false);
    }, 3000);
  }, []);

  const initialValues: SecurityData = {
    current_password: '',
    new_password: '',
    confirm_password: '',
    enable_2fa: has2FA ?? false,
  };
  const validationSchema = Yup.object().shape({
    enable_2fa: Yup.boolean().required('Required field'),
    new_password: Yup.string(),
    current_password: Yup.string().when('new_password', {
      is: (val: string | undefined) => !!val,
      then: (schema) => schema.required('Required field'),
      otherwise: (schema) => schema,
    }),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password')], "Passwords don't match")
      .when('new_password', {
        is: (val: string | undefined) => !!val,
        then: (schema) => schema.required('Required field'),
        otherwise: (schema) => schema,
      }),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      /*TODO: CALL API HERE TO MODIFY ACCOUNT SECURITY,
        reset form afterwards, mutate has2FA state data
      */
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setHas2FA(values.enable_2fa);
        resetForm();

        //TODO: IF ERROR SET IN submitError
        setSubmitError("Couldn't save your changes!");
      }, 3000);
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: 'grid', rowGap: 8 }}
    >
      <Box sx={{ display: 'grid', rowGap: 5 }}>
        <OneTextField
          OneLabel="Current Password"
          placeholder="Enter current password"
          required={!!formik.values.new_password}
          type={showCurrentPassword ? 'text' : 'password'}
          error={
            formik.touched.current_password &&
            Boolean(formik.errors.current_password)
          }
          helperText={
            formik.touched.current_password && formik.errors.current_password
          }
          {...formik.getFieldProps('current_password')}
          InputProps={{
            endAdornment: (
              <OneIcon
                iconColor="#8D8D8D"
                icon={showCurrentPassword ? eye : eyeOff}
                title={showCurrentPassword ? 'Hide password' : 'Show password'}
                onClick={() =>
                  isSubmitting ? null : setShowCurrentPassword((prev) => !prev)
                }
              />
            ),
          }}
          disabled={isSubmitting}
        />
        <OneTextField
          OneLabel="New Password"
          placeholder="Enter new password"
          type="password"
          required={!!formik.values.current_password}
          error={
            formik.touched.new_password && Boolean(formik.errors.new_password)
          }
          helperText={formik.touched.new_password && formik.errors.new_password}
          {...formik.getFieldProps('new_password')}
          disabled={isSubmitting}
        />
        <OneTextField
          OneLabel="Confirm Password"
          placeholder="Re-enter new password"
          type="password"
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
        <Divider />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'grid', rowGap: 1 }}>
            <Typography>Two-factor Authentication</Typography>
            <Typography color="#8D8D8D">
              Add additional verification to your account
            </Typography>
          </Box>
          <Switch
            disabled={isLoading2FA || isSubmitting}
            checked={formik.values.enable_2fa}
            {...formik.getFieldProps('enable_2fa')}
          />
        </Box>
        {submitError && <Typography color="error">{submitError}</Typography>}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ justifySelf: 'start' }}
        disabled={
          isSubmitting ||
          (formik.values.confirm_password === '' &&
            formik.values.current_password === '' &&
            formik.values.new_password === '' &&
            formik.values.enable_2fa === has2FA)
        }
        endIcon={
          isSubmitting && (
            <CircularProgress color="primary" thickness={5} size={14} />
          )
        }
      >
        Save Changes
      </Button>
    </Box>
  );
}

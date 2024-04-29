import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { OneTextField } from '../../../utils/OneTextField';
import StepHeader from './StepHeader';

export interface PersonalInformationData {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
  confirm_password: string;
}

export interface PersonalInformationProps {
  data?: PersonalInformationData;
  onNext: (data: PersonalInformationData) => void;
}

export default function PersonalInformation({
  data,
  onNext,
}: PersonalInformationProps) {
  const initialValues: PersonalInformationData = data ?? {
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().required(),
    mobile_number: Yup.string().required(),
    password: Yup.string().required(),
    confirm_password: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], "Passwords don't match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      onNext(values);
    },
  });

  return (
    <Box width={500} sx={{ display: 'grid', rowGap: 5 }}>
      <StepHeader
        title="Enter your personal information"
        subtitle="Let's start by getting to know you. Provide your basic detaisl and contact information"
      />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'grid', rowGap: 8 }}
      >
        <Box sx={{ display: 'grid', rowGap: 3 }}>
          <OneTextField
            OneLabel="First name"
            placeholder="Enter your first name"
            required
            autoFocus
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
            helperText={formik.touched.first_name && formik.errors.first_name}
            {...formik.getFieldProps('first_name')}
          />
          <OneTextField
            OneLabel="Last Name"
            placeholder="Enter your last name"
            required
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
            helperText={formik.touched.last_name && formik.errors.last_name}
            {...formik.getFieldProps('last_name')}
          />
          <OneTextField
            OneLabel="Email"
            placeholder="Enter your email"
            required
            type="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />
          <OneTextField
            OneLabel="Mobile number"
            placeholder="Enter your mobile number"
            required
            error={
              formik.touched.mobile_number &&
              Boolean(formik.errors.mobile_number)
            }
            helperText={
              formik.touched.mobile_number && formik.errors.mobile_number
            }
            {...formik.getFieldProps('mobile_number')}
          />
          <OneTextField
            OneLabel="Password"
            placeholder="Enter your password"
            required
            type="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <OneTextField
            OneLabel="Confirm Password"
            placeholder="Re-enter password"
            required
            type="password"
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password && formik.errors.confirm_password
            }
            {...formik.getFieldProps('confirm_password')}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Next
        </Button>
      </Box>
    </Box>
  );
}

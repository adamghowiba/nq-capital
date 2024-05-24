import { Box } from '@mui/material';
import { NTextField } from '@nq-capital/nui';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { PersonalInformationSchema } from '../onboarding.schema';
import StepHeader from './StepHeader';

export interface PersonalInformationData {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  password: string;
  confirm_password: string;
}

export interface PersonalInformationProps {}

export const PersonalInformation: FC<PersonalInformationProps> = ({ ...props }) => {
  const form = useFormContext<PersonalInformationSchema>();

  return (
    <Box width={500} sx={{ display: 'grid', rowGap: 5 }}>
      <StepHeader
        title="Enter your personal information"
        subtitle="Let's start by getting to know you. Provide your basic detaisl and contact information"
      />
      <Box
        component="form"
        // onSubmit={}
        sx={{ display: 'grid', rowGap: 8 }}
      >
        <Box sx={{ display: 'grid', rowGap: 3 }}>
          <NTextField
            control={form.control}
            name="first_name"
            label="First Name"
            placeholder="Enter your first name"
            autoFocus
            isRequired
          />

          <NTextField
            control={form.control}
            name="last_name"
            label="Lat Name"
            placeholder="Enter our last name"
            isRequired
          />

          <NTextField
            control={form.control}
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            isRequired
          />

          <NTextField
            control={form.control}
            name="mobile_number"
            label="Mobile No."
            placeholder="+1 407 222 3333"
          />

          <NTextField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type={'password'}
            isRequired
          />

          <NTextField
            control={form.control}
            name="password_confirmation"
            label="Confirm Password"
            placeholder="Re-enter your password"
            type={'password'}
            isRequired
          />
        </Box>
      </Box>
    </Box>
  );
};

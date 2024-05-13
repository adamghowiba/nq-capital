import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NATIONALITIES } from '../../../constants/nationalities.constants';
import { OneTextField } from '../../../utils/OneTextField';
import StepHeader from './StepHeader';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IdentitySchema } from '../onboarding.schema';
import { HStack, NDateField, NTextField } from '@nq-capital/nui';
import { DateTime } from 'luxon';

export interface IdentityVerificationProps {}

export const IdentityVerification: FC<IdentityVerificationProps> = ({
  ...props
}) => {
  const form = useFormContext<IdentitySchema>();

  return (
    <Box width={500} sx={{ display: 'grid', rowGap: 5 }}>
      <StepHeader
        subtitle="Help us ensure the security of your account. Verify your identity with essential documents."
        title="Identity Verification"
      />
      <Box
        component="form"
        // onSubmit={formik.handleSubmit}
        sx={{ display: 'grid', rowGap: 8 }}
      >
        <Box sx={{ display: 'grid', rowGap: 3 }}>
          <NTextField
            control={form.control}
            name="passport_number"
            label="Passport Number"
            placeholder="Enter your passport number"
            autoFocus
            isRequired
          />

          <HStack gap={2} align="start">
            <NDateField
              control={form.control}
              name="passport_issue_date"
              label="Issue Date"
              views={['year', 'month', 'day']}
              openTo="year"
              disableFuture
              isRequired
            />

            <NDateField
              control={form.control}
              name="passport_expiry_date"
              label="Expiry Date"
              openTo="year"
              views={['year', 'month', 'day']}
              isRequired
            />
          </HStack>

          <Controller
            control={form.control}
            name="nationality"
            render={({ field, fieldState }) => {
              return (
                <FormControl>
                  <FormLabel>Nationality</FormLabel>

                  <Autocomplete
                    options={NATIONALITIES}
                    autoHighlight
                    getOptionLabel={(option) => option.nationality}
                    getOptionKey={(option) => option.code}
                    onChange={(_, selectedNationality) =>
                      selectedNationality?.code &&
                      field.onChange(selectedNationality?.code)
                    }
                    value={
                      field.value
                        ? NATIONALITIES.find(
                            (nationality) => nationality.code === field.value
                          )
                        : null
                    }
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.nationality} ({option.code})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select your nationality"
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />

                  {fieldState.invalid && (
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                  )}
                </FormControl>
              );
            }}
          />

          <NTextField
            control={form.control}
            name="national_id_number"
            label="National ID"
            placeholder="Enter your national ID number"
            isRequired
          />

          <HStack gap={2} align="start">
            <NDateField
              control={form.control}
              name="national_id_number_issue_date"
              label="ID Issue Date"
              views={['year', 'month', 'day']}
              openTo="year"
              disableFuture
            />

            <NDateField
              control={form.control}
              name="national_id_number_expiry_date"
              label="ID Expiry Date"
              openTo="year"
              views={['year', 'month', 'day']}
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

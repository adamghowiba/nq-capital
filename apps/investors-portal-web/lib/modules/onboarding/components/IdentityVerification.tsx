import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';
import { HStack, NDateField, NTextField } from '@nq-capital/nui';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NATIONALITIES } from '../../../constants/nationalities.constants';
import { IdentitySchema } from '../onboarding.schema';
import StepHeader from './StepHeader';

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
              disablePast
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
              disablePast
            />
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

import { Autocomplete, Box, Button, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { nationalities } from '../../lib/nationalities';
import { OneTextField } from '../utils/OneTextField';
import StepHeader from './stepHeader';

export interface IdentityVerificationData {
  passport_number: string;
  passport_issue_date: Dayjs | null;
  passport_expiry_date: Dayjs | null;
  national_id_number?: string;
  national_id_number_issue_date?: Dayjs | null;
  national_id_number_expiry_date?: Dayjs | null;
  nationality: string;
}

export interface IdentityVerificationProps {
  data?: IdentityVerificationData;
  onNext: (data: IdentityVerificationData) => void;
  onBack: (data: IdentityVerificationData) => void;
}

export default function IdentityVerification({
  data,
  onBack,
  onNext,
}: IdentityVerificationProps) {
  const initialValues: IdentityVerificationData = data ?? {
    passport_number: '',
    national_id_number: '',
    nationality: '',
    passport_expiry_date: null,
    passport_issue_date: null,
    national_id_number_expiry_date: null,
    national_id_number_issue_date: null,
  };
  const validationSchema = Yup.object().shape({
    passport_number: Yup.string().required('Required field'),
    national_id_number: Yup.string(),
    nationality: Yup.string()
      .oneOf(
        nationalities.map(({ nationality }) => nationality),
        'Select in dropdown'
      )
      .required('Required field'),
    passport_issue_date: Yup.date()
      .max(new Date(), 'Cannot be greater than today')
      .required('Required field'),
    passport_expiry_date: Yup.date()
      .required('Required field')
      .min(new Date(), 'This passport has expired'),
    national_id_number_issue_date: Yup.date()
      .max(new Date(), 'Cannot be greater than today')
      .nullable()
      .when('national_id_number', {
        is: (val: string | undefined) => !!val,
        then: (schema) => schema.required('Required field'),
        otherwise: (schema) => schema,
      }),
    national_id_number_expiry_date: Yup.date()
      .nullable()
      .when('national_id_number', {
        is: (val: string | undefined) => !!val,
        then: (schema) => schema.required('Required field'),
        otherwise: (schema) => schema,
      })
      .min(new Date(), 'This national ID is expired'),
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
        subtitle="Help us ensure the security of your account. Verify your identity with essential documents."
        title="Identity Verification"
      />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'grid', rowGap: 8 }}
      >
        <Box sx={{ display: 'grid', rowGap: 3 }}>
          <OneTextField
            OneLabel="Passport Number"
            placeholder="Enter your passport number"
            required
            autoFocus
            error={
              formik.touched.passport_number &&
              Boolean(formik.errors.passport_number)
            }
            helperText={
              formik.touched.passport_number && formik.errors.passport_number
            }
            {...formik.getFieldProps('passport_number')}
          />
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              columnGap: 2,
              alignItems: 'start',
            }}
          >
            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography>{'Issued on'}</Typography>
              <MobileDatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                orientation="landscape"
                value={formik.values.passport_issue_date}
                onChange={(value) =>
                  formik.setFieldValue('passport_issue_date', value)
                }
                maxDate={dayjs(new Date())}
                slotProps={{
                  textField: {
                    ...formik.getFieldProps('passport_issue_date'),
                    error:
                      formik.touched.passport_issue_date &&
                      Boolean(formik.errors.passport_issue_date),
                    helperText:
                      formik.touched.passport_issue_date &&
                      formik.errors.passport_issue_date,
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography>{'Expiry Date'}</Typography>
              <MobileDatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                orientation="landscape"
                value={formik.values.passport_expiry_date}
                onChange={(value) =>
                  formik.setFieldValue('passport_expiry_date', value)
                }
                slotProps={{
                  textField: {
                    ...formik.getFieldProps('passport_expiry_date'),
                    error:
                      formik.touched.passport_expiry_date &&
                      Boolean(formik.errors.passport_expiry_date),
                    helperText:
                      formik.touched.passport_expiry_date &&
                      formik.errors.passport_expiry_date,
                  },
                }}
              />
            </Box>
          </Box>

          <Autocomplete
            options={nationalities}
            autoHighlight
            getOptionLabel={(option) => option.nationality}
            onChange={(_, selectedNationality) =>
              formik.setFieldValue(
                'nationality',
                selectedNationality ? selectedNationality.nationality : ''
              )
            }
            value={
              formik.values.nationality
                ? nationalities.find(
                    ({ nationality }) =>
                      nationality === formik.values.nationality
                  )
                : null
            }
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.nationality} ({option.code})
              </Box>
            )}
            renderInput={(params) => (
              <OneTextField
                OneLabel="Nationality"
                placeholder="Select your nationality"
                error={
                  formik.touched.nationality &&
                  Boolean(formik.errors.nationality)
                }
                helperText={
                  formik.touched.nationality && formik.errors.nationality
                }
                {...formik.getFieldProps('nationality')}
                {...params}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />

          <OneTextField
            OneLabel="National ID"
            placeholder="Enter your national ID number"
            error={
              formik.touched.national_id_number &&
              Boolean(formik.errors.national_id_number)
            }
            helperText={
              formik.touched.national_id_number &&
              formik.errors.national_id_number
            }
            {...formik.getFieldProps('national_id_number')}
          />
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              columnGap: 2,
              alignItems: 'start',
            }}
          >
            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography>{'Issued on'}</Typography>
              <MobileDatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                orientation="landscape"
                value={formik.values.national_id_number_issue_date}
                onChange={(value) =>
                  formik.setFieldValue('national_id_number_issue_date', value)
                }
                maxDate={dayjs(new Date())}
                slotProps={{
                  textField: {
                    ...formik.getFieldProps('national_id_number_issue_date'),
                    error:
                      formik.touched.national_id_number_issue_date &&
                      Boolean(formik.errors.national_id_number_issue_date),
                    helperText:
                      formik.touched.national_id_number_issue_date &&
                      formik.errors.national_id_number_issue_date,
                  },
                }}
              />
            </Box>
            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography>{'Expiry Date'}</Typography>
              <MobileDatePicker
                openTo="year"
                views={['year', 'month', 'day']}
                orientation="landscape"
                value={formik.values.national_id_number_expiry_date}
                onChange={(value) =>
                  formik.setFieldValue('national_id_number_expiry_date', value)
                }
                slotProps={{
                  textField: {
                    ...formik.getFieldProps('national_id_number_expiry_date'),
                    error:
                      formik.touched.national_id_number_expiry_date &&
                      Boolean(formik.errors.national_id_number_expiry_date),
                    helperText:
                      formik.touched.national_id_number_expiry_date &&
                      formik.errors.national_id_number_expiry_date,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            columnGap: 1,
            alignItems: 'center',
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => onBack(formik.values)}
          >
            Back
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

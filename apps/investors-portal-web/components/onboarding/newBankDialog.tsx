import { Autocomplete, Box, Button, Dialog, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { bankAccountTypes } from '../../lib/bank_account_types';
import { nationalities } from '../../lib/nationalities';
import { OneTextField } from '../utils/OneTextField';

export interface NewBankDialogProps {
  closeDialog: () => void;
  isDialogOpen: boolean;
  handleAddBank: (newBank: NewBankData) => void;
}

export interface NewBankData {
  bank_name: string;
  account_type: string;
  bank_account_number: string;
  bank_routing_number: string;
  swift_code: string;
  IBAN: string;
  bank_country: string;
  bank_address: string;
  account_holder_name: string;
}

export default function NewBankDialog({
  isDialogOpen,
  closeDialog,
  handleAddBank,
}: NewBankDialogProps) {
  const initialValues: NewBankData = {
    account_holder_name: '',
    account_type: '',
    bank_account_number: '',
    bank_address: '',
    bank_country: '',
    bank_name: '',
    bank_routing_number: '',
    IBAN: '',
    swift_code: '',
  };
  const validationSchema = Yup.object().shape({
    account_holder_name: Yup.string().required(),
    bank_account_number: Yup.string().required(),
    bank_address: Yup.string().required(),
    bank_name: Yup.string().required(),
    bank_routing_number: Yup.string().required(),
    IBAN: Yup.string().required(),
    swift_code: Yup.string().required(),
    bank_country: Yup.string()
      .oneOf(
        nationalities.map(({ country }) => country),
        'Select a country from dropdown'
      )
      .required(),
    account_type: Yup.string()
      .oneOf(bankAccountTypes, 'Select a type from dropdown')
      .required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleAddBank(values);
      closeDialog();
      resetForm();
    },
  });

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 2,
        },
      }}
    >
      <Typography
        variant="h5"
        lineHeight={3}
        p={2}
        borderBottom={'1px solid #EBEBEB'}
      >
        Add Bank Details
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box sx={{ my: 3, px: 2, display: 'grid', rowGap: 3 }}>
          <OneTextField
            OneLabel="Bank Name"
            placeholder="AFRILAND FIRST BANK"
            required
            autoFocus
            error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
            helperText={formik.touched.bank_name && formik.errors.bank_name}
            {...formik.getFieldProps('bank_name')}
          />

          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'start',
              columnGap: 2,
            }}
          >
            <Autocomplete
              options={nationalities}
              autoHighlight
              getOptionLabel={(option) => option.country}
              onChange={(_, selectedCountry) =>
                formik.setFieldValue(
                  'bank_country',
                  selectedCountry ? selectedCountry.country : ''
                )
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.country} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <OneTextField
                  OneLabel="Country of Bank"
                  placeholder="Select your bank's country"
                  error={
                    formik.touched.bank_country &&
                    Boolean(formik.errors.bank_country)
                  }
                  helperText={
                    formik.touched.bank_country && formik.errors.bank_country
                  }
                  {...formik.getFieldProps('bank_country')}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
            <OneTextField
              OneLabel="Bank Address"
              placeholder="Enter your bank's address"
              required
              error={
                formik.touched.bank_address &&
                Boolean(formik.errors.bank_address)
              }
              helperText={
                formik.touched.bank_address && formik.errors.bank_address
              }
              {...formik.getFieldProps('bank_address')}
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'start',
              columnGap: 2,
            }}
          >
            <OneTextField
              OneLabel="Bank Routing Number"
              placeholder="Enter bank's routing number"
              required
              error={
                formik.touched.bank_routing_number &&
                Boolean(formik.errors.bank_routing_number)
              }
              helperText={
                formik.touched.bank_routing_number &&
                formik.errors.bank_routing_number
              }
              {...formik.getFieldProps('bank_routing_number')}
            />
            <OneTextField
              OneLabel="SWIFT Code"
              placeholder="CCEICMCX"
              required
              error={
                formik.touched.swift_code && Boolean(formik.errors.swift_code)
              }
              helperText={formik.touched.swift_code && formik.errors.swift_code}
              {...formik.getFieldProps('swift_code')}
            />
          </Box>

          <Autocomplete
            options={bankAccountTypes.sort((a, b) => (a > b ? 1 : -1))}
            autoHighlight
            //   getOptionLabel={(option) => option}
            onChange={(_, selectedAccountType) =>
              formik.setFieldValue('account_type', selectedAccountType ?? '')
            }
            renderOption={(props, accountType) => (
              <Box component="li" {...props}>
                {accountType}
              </Box>
            )}
            renderInput={(params) => (
              <OneTextField
                OneLabel="Account Type"
                placeholder="Select your account type"
                error={
                  formik.touched.account_type &&
                  Boolean(formik.errors.account_type)
                }
                helperText={
                  formik.touched.account_type && formik.errors.account_type
                }
                {...formik.getFieldProps('account_type')}
                {...params}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
          />

          <OneTextField
            OneLabel="Account Holder Name"
            placeholder="John Doe"
            required
            error={
              formik.touched.account_holder_name &&
              Boolean(formik.errors.account_holder_name)
            }
            helperText={
              formik.touched.account_holder_name &&
              formik.errors.account_holder_name
            }
            {...formik.getFieldProps('account_holder_name')}
          />

          <OneTextField
            OneLabel="Bank Account Number"
            placeholder="07122031001"
            required
            error={
              formik.touched.bank_account_number &&
              Boolean(formik.errors.bank_account_number)
            }
            helperText={
              formik.touched.bank_account_number &&
              formik.errors.bank_account_number
            }
            {...formik.getFieldProps('bank_account_number')}
          />

          <OneTextField
            OneLabel="IBAN"
            placeholder="CM21-10005-00003-07122031001-64"
            required
            error={formik.touched.IBAN && Boolean(formik.errors.IBAN)}
            helperText={formik.touched.IBAN && formik.errors.IBAN}
            {...formik.getFieldProps('IBAN')}
          />
        </Box>
        <Box p={2} borderTop="1px solid #EBEBEB">
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add Bank
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

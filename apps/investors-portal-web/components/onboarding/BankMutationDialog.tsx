import { Autocomplete, Box, Button, Dialog, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { nationalities } from '../../lib/nationalities';
import { OneTextField } from '../utils/OneTextField';
import { BANK_ACCOUNT_TYPES } from '../../lib/bank.constants';

export interface NewBankDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
  handleAddBank: (newBank: NewBankData) => void;
  handleEditBank: (bank: NewBankData) => void;
  data?: NewBankData;
}

export interface NewBankData {
  temp_id: string;
  bank_name: string;
  account_type: string;
  bank_account_number: string;
  bank_routing_number: string;
  swift_code: string;
  IBAN: string;
  bank_country: string;
  bank_address: string;
  account_holder_name: string;
  is_default: boolean;
}

export default function NewBankDialog({
  isDialogOpen,
  closeDialog,
  handleAddBank,
  handleEditBank,
  data,
}: NewBankDialogProps) {
  const initialValues: NewBankData = data ?? {
    temp_id: '',
    account_holder_name: '',
    account_type: '',
    bank_account_number: '',
    bank_address: '',
    bank_country: '',
    bank_name: '',
    bank_routing_number: '',
    IBAN: '',
    swift_code: '',
    is_default: false,
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
      .oneOf(BANK_ACCOUNT_TYPES, 'Select a type from dropdown')
      .required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (data) {
        handleEditBank(values);
      } else handleAddBank(values);
      close();
    },
  });

  function close() {
    closeDialog();
    formik.resetForm();
  }

  return (
    <Dialog
      open={isDialogOpen}
      onClose={close}
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
        {`${data ? 'Edit' : 'Add'} Bank Details`}
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
              value={
                formik.values.bank_country
                  ? nationalities.find(
                      ({ country }) => country === formik.values.bank_country
                    )
                  : null
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
            options={BANK_ACCOUNT_TYPES.sort((a, b) => (a > b ? 1 : -1))}
            autoHighlight
            value={
              formik.values.account_type
                ? BANK_ACCOUNT_TYPES.find(
                    (accountType) => accountType === formik.values.account_type
                  )
                : null
            }
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              data &&
              data.IBAN === formik.values.IBAN &&
              data.account_holder_name === formik.values.account_holder_name &&
              data.account_type === formik.values.account_type &&
              data.bank_account_number === formik.values.bank_account_number &&
              data.bank_address === formik.values.bank_address &&
              data.bank_country === formik.values.bank_country &&
              data.bank_name === formik.values.bank_name &&
              data.bank_routing_number === formik.values.bank_routing_number &&
              data.swift_code === formik.values.swift_code
            }
          >
            {data ? 'Save Changes' : 'Add Bank'}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

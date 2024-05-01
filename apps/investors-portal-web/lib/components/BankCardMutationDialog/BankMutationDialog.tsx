import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NATIONALITIES } from '../../constants/nationalities.constants';
import { OneTextField } from '../../utils/OneTextField';
import { BANK_ACCOUNT_TYPES } from '../../constants/bank.constants';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BankAccountSchema,
  bankAccountSchema,
} from '../../modules/payment-source/payment-source.schema';
import NTextField from '../Fields/NTextField';
import DialogHeader from '../Dialog/DialogHeader';
import { HStack } from '../Stack/Stack';

export interface BankMutationDialogProps extends DialogProps {
  handleAddBank: (newBank: BankSchema) => void;
  handleEditBank: (bank: BankSchema) => void;
  data?: BankSchema;
}

export interface BankSchema {
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

export const BankCardMutationDialog: FC<BankMutationDialogProps> = ({
  onClose,
  handleAddBank,
  handleEditBank,
  data,
  ...props
}) => {
  const form = useForm<BankAccountSchema>({
    defaultValues: {
      nickname: '',
      bank_name: '',
      account_number: '',
      account_holder_name: '',
      account_type: '',
      bank_country: '',
      currency: '',
      routing_number: '',
      swift_code: '',
      iban: '',
      sort_code: '',
      bsb_number: '',
      bank_code: '',
      branch_code: '',
      branch_address: '',
      is_primary: false,
    },
    resolver: zodResolver(bankAccountSchema),
  });

  const handleValidSubmit: SubmitHandler<BankAccountSchema> = (data) => {
    // TODO: Mutation
  };

  return (
    <Dialog
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 2,
        },
      }}
      {...props}
    >
      <DialogHeader>
        <Typography variant="h5">
          {`${data ? 'Edit' : 'Add'} Bank Details`}
        </Typography>
      </DialogHeader>

      <DialogContent>
        <Box
          component="form"
          onSubmit={form.handleSubmit(handleValidSubmit, console.error)}
          sx={{ display: 'grid', rowGap: 3 }}
        >
          <NTextField
            control={form.control}
            name="bank_name"
            label="Bank Name"
            placeholder="Chase Bank"
            isRequired
            autoFocus
          />

          <Controller
            control={form.control}
            name="bank_country"
            render={({ field, fieldState }) => {
              return (
                <Autocomplete
                  options={NATIONALITIES}
                  autoHighlight
                  getOptionLabel={(option) => option.country}
                  onChange={(_, selectedCountry) =>
                    selectedCountry?.code
                      ? field.onChange(selectedCountry?.code)
                      : undefined
                  }
                  value={NATIONALITIES.find(
                    (nationality) => nationality.code === field.value
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      {option.country} ({option.code})
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Select your bank's country"
                      {...params}
                    />
                  )}
                />
              );
            }}
          />

          <HStack gap={2}>
            <NTextField
              name="routing_number"
              control={form.control}
              label="Bank Routing Number"
              placeholder="000000000000"
              isRequired
            />

            <NTextField
              name="swift_code"
              control={form.control}
              label="SWIFT Code"
              placeholder="CCEICMCX"
              isRequired
            />
          </HStack>

          {/* <Autocomplete
              options={BANK_ACCOUNT_TYPES.sort((a, b) => (a > b ? 1 : -1))}
              autoHighlight
              value={
                formik.values.account_type
                  ? BANK_ACCOUNT_TYPES.find(
                      (accountType) =>
                        accountType === formik.values.account_type
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
            /> */}

          <NTextField
            control={form.control}
            name="account_holder_name"
            label="Account Holder Name"
            placeholder="John Doe"
            isRequired
          />

          <NTextField
            control={form.control}
            name="account_number"
            label="Account Number"
            placeholder="07122031001"
            isRequired
          />

          <NTextField
            control={form.control}
            name="iban"
            label="IBAN"
            placeholder="CM21-10005-00003-07122031001-64"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button type="submit" variant="contained" color="secondary">
          Cancel
        </Button>

        <Button type="submit" variant="contained" color="primary">
          {data ? 'Save Changes' : 'Add Bank'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

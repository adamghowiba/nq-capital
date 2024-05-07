import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  TextField,
  Typography,
  autocompleteClasses,
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
import { ArrowDropDownIcon } from '@mui/x-date-pickers';

export interface BankMutationDialogProps extends DialogProps {
  onSave: (type: 'edit' | 'create', bank: BankAccountSchema) => void;
  mode?: { type: 'create' } | { type: 'edit'; data: BankAccountSchema };
}

export const BankCardMutationDialog: FC<BankMutationDialogProps> = ({
  onClose,
  mode,
  onSave,
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
    if (mode?.type === 'edit') {
      onSave('edit', data);
      return;
    }

    onSave('create', data);
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
          {`${mode?.type === 'edit' ? 'Edit' : 'Add'} Bank Details`}
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
                <FormControl required>
                  <FormLabel>Bank Country</FormLabel>
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
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select your bank's country"
                        {...params}
                        size="medium"
                      />
                    )}
                  />
                </FormControl>
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

          <Controller
            control={form.control}
            name="account_type"
            render={({ field, fieldState }) => {
              return (
                <FormControl required>
                  <FormLabel>Account type</FormLabel>
                  <Autocomplete
                    options={BANK_ACCOUNT_TYPES.sort((a, b) =>
                      a > b ? 1 : -1
                    )}
                    autoHighlight
                    onChange={(_, bankAccountType) =>
                      field.onChange(bankAccountType || '')
                    }
                    value={BANK_ACCOUNT_TYPES.find(
                      (accountType) => accountType === field.value
                    )}
                    renderOption={(props, accountType) => (
                      <Box component="li" {...props}>
                        {accountType}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        placeholder="Select account type"
                        {...params}
                        size="medium"
                      />
                    )}
                  />
                </FormControl>
              );
            }}
          />

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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          onClick={() => onClose?.({}, 'escapeKeyDown')}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={form.handleSubmit(handleValidSubmit, console.error)}
        >
          {mode?.type === 'edit' ? 'Save Changes' : 'Add Bank'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

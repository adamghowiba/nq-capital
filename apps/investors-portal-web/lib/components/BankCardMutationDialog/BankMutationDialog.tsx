import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NATIONALITIES } from '../../constants/nationalities.constants';
import {
  BankAccountSchema,
  bankAccountSchema,
} from '../../modules/payment-source/payment-source.schema';
import DialogHeader from '../Dialog/DialogHeader';
import NTextField from '../Fields/NTextField';
import { HStack } from '@nq-capital/nui';

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
  const modeData = mode?.type === 'edit' ? mode?.data : undefined;

  const form = useForm<BankAccountSchema>({
    defaultValues: {
      nickname: modeData?.nickname || '',
      bank_name: modeData?.bank_name || '',
      account_number: modeData?.account_number || '',
      account_holder_name: modeData?.account_holder_name || '',
      account_type: modeData?.account_type || 'CHECKING',
      bank_country: modeData?.bank_country || '',
      currency: modeData?.currency || '',
      routing_number: modeData?.routing_number || '',
      swift_code: modeData?.swift_code || '',
      iban: modeData?.iban || '',
      sort_code: modeData?.sort_code || '',
      bsb_number: modeData?.bsb_number || '',
      bank_code: modeData?.bank_code || '',
      branch_code: modeData?.branch_code || '',
      branch_address: modeData?.branch_address || '',
      is_primary: modeData?.is_primary || false,
    },
    values: modeData,
    shouldUnregister: true,
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
      onClose={onClose}
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

          {/* FIX: add back */}
          {/* <Controller
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

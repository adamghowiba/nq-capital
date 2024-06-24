import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  Drawer,
  DrawerProps,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  NTextField,
  VStack,
} from '@nq-capital/nui';
import { formatUSDCurrency } from '@nq-capital/utils';
import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
  useAddInvestmentMutation,
  useListFundsQuery,
  useListInvestorsQuery,
  useListTransactionsQuery,
  useWithdrawalMutation,
} from '../../gql/gql-client';
import {
  InvestmentSchema,
  WithdrawalSchema,
  investmentSchema,
  withdrawalSchema,
} from '../../modules/investments/investment.schema';
import { toast } from 'sonner';
import { parseApiError } from '../../utils/error.utils';

export interface WithdrawalMutationDrawerProps extends DrawerProps {}

export const WithdrawalMutationDrawer: FC<WithdrawalMutationDrawerProps> = ({
  ...props
}) => {
  const form = useForm<WithdrawalSchema>({
    defaultValues: {
      amount: 0,
      bank_account_id: undefined,
      investor_id: undefined,
    },
    resolver: zodResolver(withdrawalSchema),
  });

  const queryClient = useQueryClient();

  const investorsQuery = useListInvestorsQuery(
    {},
    { staleTime: Infinity, select: (data) => data.investors }
  );

  const addInvestmentMutation = useWithdrawalMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useListTransactionsQuery.getKey(),
      });
      form.reset();
      props?.onClose?.({}, 'backdropClick');
    },
  });

  const handleValidSubmission: SubmitHandler<InvestmentSchema> = (data) => {
    const promise = addInvestmentMutation.mutateAsync({
      withdrawalInput: {
        amount: data.amount,
        investor_id: data.investor_id,
      },
    });

    toast.promise(promise, {
      loading: 'Adding withdrawal...',
      success: 'Withdrawal added successfully',
      error: parseApiError,
    });
  };

  return (
    <>
      <Drawer
        anchor="right"
        elevation={0}
        PaperProps={{ bgcolor: 'transparent', sx: { bgcolor: 'transparent' } }}
        component="form"
        {...props}
      >
        <DrawerContent>
          <DrawerHeader onClose={() => props?.onClose?.({}, 'backdropClick')}>
            <Typography>New Withdrawal</Typography>
          </DrawerHeader>

          <DrawerBody>
            <VStack gap={3}>
              <Controller
                control={form.control}
                name="amount"
                render={({ field, fieldState }) => (
                  <FormControl required error={fieldState.invalid}>
                    <FormLabel>Amount</FormLabel>

                    <NumericFormat
                      prefix="$"
                      thousandSeparator
                      customInput={TextField}
                      value={field.value || '0'}
                      onValueChange={(values, sourceInfo) =>
                        field.onChange(values.floatValue)
                      }
                      fullWidth
                    />

                    <FormHelperText>
                      {form.formState?.errors?.amount?.message ||
                        'Amount to withdrawal from the investor account'}
                    </FormHelperText>
                  </FormControl>
                )}
              />

              <Controller
                control={form.control}
                name="investor_id"
                render={({ field, fieldState }) => (
                  <FormControl required error={fieldState.invalid}>
                    <FormLabel>Investor</FormLabel>

                    <Autocomplete
                      {...field}
                      options={investorsQuery.data || []}
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      onChange={(event, investor) =>
                        field.onChange(investor?.id)
                      }
                      value={investorsQuery.data?.find(
                        (investor) => investor.id === field.value
                      )}
                      itemID="id"
                      renderInput={(params) => (
                        <TextField placeholder="Select investor" {...params} />
                      )}
                      fullWidth
                    />

                    <FormHelperText>
                      {fieldState?.error?.message ||
                        'Select an investor that deposited the amount'}
                    </FormHelperText>
                  </FormControl>
                )}
              />

              {/* TODO: Unsure of having bank account for withdrawal on admin side. Remove or implement */}
              {/* <Controller
                control={form.control}
                name="bank_account_id"
                render={({ field, fieldState }) => (
                  <FormControl error={fieldState.invalid}>
                    <FormLabel>Fund</FormLabel>

                    <Autocomplete
                      {...field}
                      options={fundsQuery.data || []}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, fund) => field.onChange(fund?.id)}
                      value={fundsQuery.data?.find(
                        (fund) => fund.id === field.value
                      )}
                      renderInput={(params) => (
                        <TextField placeholder="Select fund" {...params} />
                      )}
                      renderOption={(props, option, state, ownerState) => {
                        return (
                          <Box component="li" {...props}>
                            <VStack>
                              <Typography>{option.name}</Typography>
                              <Typography color="gray" fontSize="12px">
                                Balance: {formatUSDCurrency(option.balance)}
                              </Typography>
                            </VStack>
                          </Box>
                        );
                      }}
                      fullWidth
                    />

                    <FormHelperText>
                      {form.formState?.errors?.amount?.message ||
                        'Select the fund associated with the investment, if no fund is selected the default fund will be used'}
                    </FormHelperText>
                  </FormControl>
                )}
              /> */}

              {/* TODO: Remove or implement */}
              {/* <NTextField
                control={form.control}
                name="notes"
                label="Notes"
                multiline
                minRows={4}
                helperText="Notes or description of the investment"
              /> */}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => props.onClose?.({}, 'backdropClick')}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(handleValidSubmission, console.error)}
            >
              Add withdrawal
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

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
} from '../../gql/gql-client';
import {
  InvestmentSchema,
  investmentSchema,
} from '../../modules/investments/investment.schema';

export interface InvestmentMutationDrawerProps extends DrawerProps {}

export const InvestmentMutationDrawer: FC<InvestmentMutationDrawerProps> = ({
  ...props
}) => {
  const form = useForm<InvestmentSchema>({
    defaultValues: {
      amount: 0,
      reference_id: '',
    },
    resolver: zodResolver(investmentSchema),
  });

  const queryClient = useQueryClient();

  const investorsQuery = useListInvestorsQuery(
    {},
    { staleTime: Infinity, select: (data) => data.investors }
  );

  const fundsQuery = useListFundsQuery(
    {},
    { staleTime: Infinity, select: (data) => data.funds }
  );

  const addInvestmentMutation = useAddInvestmentMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useListTransactionsQuery.getKey(),
      });
    },
    onMutate: () => {
      props?.onClose?.({}, 'backdropClick');
    },
  });

  const handleValidSubmission: SubmitHandler<InvestmentSchema> = (data) => {
    addInvestmentMutation.mutate({
      addInvestmentInput: {
        amount: data.amount,
        // TODO: Handle this being required, but shouldn't be required
        fund_id: data.fund_id,
        investor_id: data.investor_id,
        notes: data.notes,
        reference_id: data.reference_id,
      },
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
            <Typography>Add investment</Typography>
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
                        'Amount you would like to invest in USD'}
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

              <Controller
                control={form.control}
                name="fund_id"
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
              />

              <NTextField
                control={form.control}
                name="reference_id"
                label="Reference ID"
                placeholder="CHS-092-1"
                helperText="Attach a custom reference ID"
              />

              <NTextField
                control={form.control}
                name="notes"
                label="Notes"
                multiline
                minRows={4}
                helperText="Notes or description of the investment"
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={form.handleSubmit(handleValidSubmission, console.error)}
            >
              Create investment
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default InvestmentMutationDrawer;

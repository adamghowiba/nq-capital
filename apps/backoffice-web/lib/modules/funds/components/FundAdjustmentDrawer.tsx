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
  NCurrencyField,
  NTextField,
  VStack,
} from '@nq-capital/nui';
import {
  useAdjustFundMutation,
  useCreateFundMutation,
  useListFundAdjustmentsQuery,
  useListFundsQuery,
} from '../../../../lib/gql/gql-client';
import { parseApiError } from '../../../../lib/utils/error.utils';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  FundAdjustmentSchema,
  FundSchema,
  fundAdjustmentSchema,
  fundSchema,
} from '../fund.schema';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { formatUSDCurrency } from '@nq-capital/utils';

export interface FundAdjustmentDrawerProps extends DrawerProps {}

export const FundAdjustmentDrawer: FC<FundAdjustmentDrawerProps> = ({
  ...props
}) => {
  const queryClient = useQueryClient();

  const form = useForm<FundAdjustmentSchema>({
    defaultValues: {
      fund_id: NaN,
    },
    resolver: zodResolver(fundAdjustmentSchema),
  });

  const fundsQuery = useListFundsQuery({}, { select: (data) => data.funds });

  const adjustmentMutation = useAdjustFundMutation({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: useListFundAdjustmentsQuery.getKey({})
      })
      form.reset();
    },
    onMutate: () => {
      props.onClose?.({}, 'backdropClick');
    }
  });

  const handleAdjustFund: SubmitHandler<FundAdjustmentSchema> = async (
    data: FundAdjustmentSchema
  ) => {
    const adjustmentPromise = adjustmentMutation.mutateAsync({
      adjustFundInput: {
        amount: data.amount,
        description: data.description,
        fund_id: data.fund_id,
      },
    });

    toast.promise(adjustmentPromise, {
      loading: 'Creating adjustment...',
      success: `Adjustment for ${formatUSDCurrency(
        data.amount
      )} created successfully`,
      error: (error) => parseApiError(error, { allowMessage: true }),
    });
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        bgcolor: 'transparent',
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: 'transparent',
        },
      }}
      {...props}
    >
      <DrawerContent>
        <DrawerHeader onClose={() => props.onClose?.({}, 'backdropClick')}>
          <Typography>New Fund</Typography>
        </DrawerHeader>

        <DrawerBody>
          <VStack gap={3}>
            <Controller
              control={form.control}
              name="fund_id"
              render={({ field, fieldState }) => (
                <FormControl error={fieldState.invalid} required>
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

            <NCurrencyField
              control={form.control}
              name="amount"
              label="Amount"
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <LoadingButton
            variant="contained"
            fullWidth
            loading={adjustmentMutation.isPending}
            onClick={form.handleSubmit(handleAdjustFund, console.error)}
          >
            Create Fund
          </LoadingButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

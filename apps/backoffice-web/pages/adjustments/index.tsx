import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Box as MUIBox,
  TextField,
  Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Box, CustomDataGrid, NCurrencyField, VStack } from '@nq-capital/nui';
import { formatUSDCurrency } from '@nq-capital/utils';
import { useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ErrorCard } from '../../lib/components/ErrorCard/ErrorCard';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListFundAdjustmentsQuery,
  useAdjustFundMutation,
  useListFundAdjustmentsQuery,
  useListFundsQuery,
} from '../../lib/gql/gql-client';
import { parseApiError } from 'apps/backoffice-web/lib/utils/error.utils';

const adjustmentSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
  fund_id: z.number(),
});

type AdjustmentSchema = z.infer<typeof adjustmentSchema>;

const Adjustments = ({ ...props }) => {
  const form = useForm<AdjustmentSchema>({
    defaultValues: {
      amount: 0,
      description: '',
    },
    resolver: zodResolver(adjustmentSchema),
  });

  const fundsQuery = useListFundsQuery(
    {},
    { staleTime: Infinity, select: (data) => data.funds }
  );

  const adjustmentsQuery = useListFundAdjustmentsQuery(
    {},
    { select: (data) => data.fundAdjustments }
  );

  const adjustmentMutation = useAdjustFundMutation({
    onSuccess: () => {
      adjustmentsQuery.refetch();
      form.reset();
    },
  });

  const handleAdjustFund: SubmitHandler<AdjustmentSchema> = async (
    data: AdjustmentSchema
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

  const adjustmentColumns = useMemo((): GridColDef<
    ListFundAdjustmentsQuery['fundAdjustments'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        valueFormatter: (params) => formatUSDCurrency(params.value || 0),
        renderCell: (params) => (
          <Typography
            color={
              params.row.amount > 0
                ? 'success.light'
                : params.row.amount < 0
                ? 'error.light'
                : undefined
            }
          >
            {params?.formattedValue}
          </Typography>
        ),
      },
      {
        field: 'balance_before',
        headerName: 'Balance before',
        width: 150,
        valueFormatter: (params) => formatUSDCurrency(params.value || 0),
      },
      {
        field: 'balance_after',
        headerName: 'Balance after',
        width: 150,
        valueFormatter: (params) => formatUSDCurrency(params.value || 0),
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 150,
        valueFormatter: (params) => params.value || '-',
      },
      {
        field: 'fund_id',
        headerName: 'Fund ID',
        width: 150,
      },
      {
        field: 'adjusted_by_user_id',
        headerName: 'Adjusted by',
        width: 150,
      },
      {
        field: 'created_at',
        headerName: 'Created date',
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
        width: 150,
      },
    ];
  }, []);

  return (
    <Screen>
      <VStack gap={2} mb={4}>
        <Typography variant="h3">Create adjustment (TEST)</Typography>

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
                value={fundsQuery.data?.find((fund) => fund.id === field.value)}
                renderInput={(params) => (
                  <TextField placeholder="Select fund" {...params} />
                )}
                renderOption={(props, option, state, ownerState) => {
                  return (
                    <MUIBox component="li" {...props}>
                      <VStack>
                        <Typography>{option.name}</Typography>
                        <Typography color="gray" fontSize="12px">
                          Balance: {formatUSDCurrency(option.balance)}
                        </Typography>
                      </VStack>
                    </MUIBox>
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

        <NCurrencyField control={form.control} name="amount" label="Amount" />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 'auto' }}
          onClick={form.handleSubmit(handleAdjustFund, console.error)}
        >
          Create
        </Button>
      </VStack>

      <Box h="600px">
        <CustomDataGrid
          columns={adjustmentColumns}
          rows={adjustmentsQuery.data || []}
          loading={adjustmentsQuery.isLoading}
        />
      </Box>
    </Screen>
  );
};

export default Adjustments;

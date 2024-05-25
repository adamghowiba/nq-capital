import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Box, CustomDataGrid, NCurrencyField, VStack } from '@nq-capital/nui';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListFundAdjustmentsQuery,
  useAdjustFundMutation,
  useListFundAdjustmentsQuery,
} from '../../lib/gql/gql-client';
import React, { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { formatUSDCurrency } from '@nq-capital/utils';

const adjustmentSchema = z.object({
  amount: z.number(),
  description: z.string().optional(),
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
    await adjustmentMutation.mutateAsync({
      adjustFundInput: {
        amount: data.amount,
        description: data.description,
        fund_id: 2,
        adjusted_by_user_id: 1,
      },
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

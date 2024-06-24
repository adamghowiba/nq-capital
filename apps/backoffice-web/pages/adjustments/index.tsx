import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Box, CustomDataGrid, PageHeader } from '@nq-capital/nui';
import { formatUSDCurrency } from '@nq-capital/utils';
import { FundAdjustmentDrawer } from '../../lib/modules/funds/components/FundAdjustmentDrawer';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListFundAdjustmentsQuery,
  useAdjustFundMutation,
  useListFundAdjustmentsQuery,
  useListFundsQuery,
} from '../../lib/gql/gql-client';
import {
  FundAdjustmentSchema,
  fundAdjustmentSchema,
} from '../../lib/modules/funds/fund.schema';

const Adjustments = ({ ...props }) => {
  const [isFundDrawerOpen, setIsFundDrawerOpen] = useState<boolean>(false);

  const form = useForm<FundAdjustmentSchema>({
    defaultValues: {
      amount: 0,
      description: '',
    },
    resolver: zodResolver(fundAdjustmentSchema),
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
    <>
      <Screen>
        <PageHeader
          title="Fund adjustment"
          subtitle="Fund adjustments are used to adjust the balance of a fund. This can be used to show profits, losses, or any other adjustments to the fund balance balance."
          actions={
            <>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setIsFundDrawerOpen(true)}
              >
                Create Fund
              </Button>
            </>
          }
        />

        <Box h="600px">
          <CustomDataGrid
            columns={adjustmentColumns}
            rows={adjustmentsQuery.data || []}
            loading={adjustmentsQuery.isLoading}
          />
        </Box>
      </Screen>

      <FundAdjustmentDrawer
        open={isFundDrawerOpen}
        onClose={() => setIsFundDrawerOpen(false)}
      />
    </>
  );
};

export default Adjustments;

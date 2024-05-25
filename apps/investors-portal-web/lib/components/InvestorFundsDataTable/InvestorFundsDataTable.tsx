import React, { FC, useMemo } from 'react';
import {
  ListInvestorFundsQuery,
  useListInvestorFundsQuery,
} from '../../gql/gql-client';
import { GridColDef } from '@mui/x-data-grid';
import { formatUSDCurrency } from '../../utils/currency.utils';
import { Box, CustomDataGrid } from '@nq-capital/nui';

export interface InvestorFundsDataTableProps {}

const InvestorFundsDataTable: FC<InvestorFundsDataTableProps> = ({
  ...props
}) => {
  const investorFunds = useListInvestorFundsQuery(
    {},
    { select: (data) => data.investorFunds }
  );

  const columns = useMemo((): GridColDef<
    ListInvestorFundsQuery['investorFunds']['data'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'fund_name',
        headerName: 'Fund',
        valueGetter: (params) => params.row.fund.name,
        flex: 1,
      },
      {
        field: 'balance',
        headerName: 'Balance',
        valueFormatter: (params) => formatUSDCurrency(params.value || 0),
        flex: 1,
      },
      {
        field: 'stake_percentage',
        headerName: 'Stake',
        valueFormatter: (params) => `${params.value}%`,
        flex: 1,
      },
      {
        field: 'invested_amount',
        headerName: 'Invested amount',
        valueFormatter: (params) => formatUSDCurrency(params.value || 0),
        flex: 1,
      },
    ];
  }, []);

  return (
    <Box height={'600px'} mt={5}>
      <CustomDataGrid
        title="Funds"
        columns={columns}
        rows={investorFunds.data?.data || []}
        loading={investorFunds.isLoading}
      />
    </Box>
  );
};

export default InvestorFundsDataTable;

import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import {
  Box,
  CustomDataGrid,
  HStack,
  NAvatar,
  NLink,
  PageHeader,
  VStack,
} from '@nq-capital/nui';
import { formatISOForTable, formatUSDCurrency, padId } from '@nq-capital/utils';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListFundInvestorsQuery,
  useListFundInvestorsQuery,
  useRetrieveFundQuery
} from '../../lib/gql/gql-client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { NextPageWithLayout } from '../_app';

const FundDetailPage: NextPageWithLayout = ({ ...props }) => {
  const router = useRouter();
  const fundId = +(router.query.fundId as unknown as number);

  const fund = useRetrieveFundQuery(
    {
      id: fundId,
    },
    { enabled: !!fundId, select: (data) => data.fund }
  );

  const fundKPIS = useMemo(() => {
    if (!fund.data) return [];

    return [
      {
        label: 'Current Balance',
        value: formatUSDCurrency(fund.data.balance),
      },
      {
        label: 'Investors',
        value: 0,
      },
      {
        label: 'Default Fund',
        value: 'No',
      },
    ];
  }, [fund.data]);

  const fundInvestors = useListFundInvestorsQuery(
    {
      fund_id: fundId,
    },
    { select: (data) => data.investorFunds?.data, enabled: !!fundId }
  );

  const fundInvestorColumns = useMemo((): GridColDef<
    ListFundInvestorsQuery['investorFunds']['data'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        valueFormatter: ({ value }) => padId(value),
      },
      {
        field: 'investor',
        headerName: 'Investor',
        width: 250,
        valueGetter: (params) =>
          `${params.row.investor?.first_name} ${params.row.investor.last_name}` ||
          'N/A',
        renderCell: (params) => (
          <NLink href={`/users/${params.row.investor.id}`} underline="none">
            <HStack align="center" gap={1.5}>
              <NAvatar size="sm">{params.row?.investor?.first_name?.[0]} </NAvatar>
              <Typography>
                {params.row.investor?.first_name}{' '}
                {params.row.investor.last_name}
              </Typography>
            </HStack>
          </NLink>
        ),
      },
      {
        field: 'invested_amount',
        headerName: 'Investment Amount',
        width: 150,
        valueFormatter: ({ value }) => formatUSDCurrency(value),
      },
      {
        field: 'stake_percentage',
        headerName: 'Stake Percentage',
        width: 150,
        valueFormatter: ({ value }) => `${(value * 100 as number)?.toFixed(2)}%`,
      },
      {
        field: 'balance',
        headerName: 'Current Balance',
        width: 150,
        valueFormatter: ({ value }) => formatUSDCurrency(value),
      },
      {
        field: 'created_at',
        width: 150,
        headerName: 'Joined Date',
        valueFormatter: ({ value }) => formatISOForTable(value),
      },
    ];
  }, []);

  if (fund.isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!fund.isSuccess) {
    return <Typography>Failed to run server</Typography>;
  }

  return (
    <Screen>
      <PageHeader
        title={fund.data.name}
        subtitle="Fund details below"
        actions={
          <>
            <Button>Edit</Button>
          </>
        }
      />

      <HStack gap={9} borderBottom="1px solid" borderColor="#F1F1F1" pb={3}>
        {fundKPIS.map((kpi) => (
          <VStack key={kpi.label} gap={0.5}>
            <Typography variant="subtitle2" color="#808080">
              {kpi.label}
            </Typography>
            <Typography color="#202020">{kpi.value}</Typography>
          </VStack>
        ))}
      </HStack>

      <Box h="700px">
        <CustomDataGrid
          loading={fundInvestors.isLoading}
          rows={fundInvestors.data || []}
          columns={fundInvestorColumns}
          checkboxSelection
          disableRowSelectionOnClick
          // filterModel={filters}
          // renderSelectActions={({ selectedRows }) => {
          //   return <>{selectedRows.length === 1 && <></>}</>;
          // }}
        />
      </Box>
    </Screen>
  );
};

export default FundDetailPage;

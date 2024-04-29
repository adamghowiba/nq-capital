import { Button, Typography } from '@mui/material';
import Box from '../lib/components/Box/Box';
import { Stat } from '../lib/components/KPICard/KPICard';
import NLink from '../lib/components/Link/Link';
import Screen from '../lib/components/Screen/Screen';
import { HStack } from '../lib/components/Stack/Stack';
import CustomDataGrid from '../lib/components/StyledDataGrid/CustomDataGrid';
import TransactionTypeChip from '../lib/components/TransactionTypeBadge/TransactionTypeBadge';
import { useListTransactionsQuery } from '../lib/gql/gql-client';
import AccountValueChart from '../lib/modules/home/AccountValueChart';
import { formatUSDCurrency } from '../lib/utils/currency.utils';
import { formatISOForTable } from '../lib/utils/date.utils';
import { useState } from 'react';
import {
  EmptyTransactionCard,
  EmptyTransactions,
} from '../lib/modules/transactions/components/EmpyTransactions';
import PageHeader from '../lib/components/PageHeader/PageHeader';

const Index = () => {
  const [dateFilter, setDateFilter] = useState<'year' | 'month'>('month');

  const transactionsQuery = useListTransactionsQuery(
    {},
    { select: (res) => res.transactions }
  );

  return (
    <>
      <Screen h="100%" w="100%">
        <PageHeader
          title="Overview"
          actions={
            <>
              <Button variant="contained" color="secondary">
                Filter
              </Button>
              <Button variant="contained" color="secondary">
                Export
              </Button>
            </>
          }
        />

        <HStack gap={2}>
          <Stat
            tooltip="The total amount you've invested"
            title="Total invested"
            value={formatUSDCurrency(50000)}
            change={{
              type: 'increase',
              value: formatUSDCurrency(1000),
            }}
          />
          <Stat
            title="Current Value"
            tooltip="Current portfolio value"
            value={formatUSDCurrency(50000)}
            change={{
              type: 'increase',
              value: formatUSDCurrency(1000),
            }}
          />
          <Stat
            title="Pending Transactions"
            tooltip="Pending transaction amount"
            value={formatUSDCurrency(50000)}
            change={{
              type: 'increase',
              value: formatUSDCurrency(1000),
            }}
          />
        </HStack>

        <AccountValueChart
          onChangeDateFilter={setDateFilter}
          dateFilter={dateFilter}
        />

        <Box height="400px">
          <CustomDataGrid
            title="Transactions"
            rows={transactionsQuery.data || []}
            loading={transactionsQuery.isLoading}
            slots={{
              noRowsOverlay: EmptyTransactions,
            }}
            slotProps={{
              noRowsOverlay: {
                sx: {
                  height: '100%',
                },
              },
            }}
            columns={[
              {
                field: 'id',
                headerName: 'ID',
                valueFormatter: (params) => `#${params.value}`,
                renderCell: (params) => (
                  <NLink href={`/transactions/${params.value}`}>
                    {params.formattedValue}
                  </NLink>
                ),
                width: 80,
              },
              {
                field: 'created_at',
                headerName: 'Date',
                width: 150,
                valueFormatter: (params) => formatISOForTable(params.value),
              },
              {
                field: 'amount',
                headerName: 'Amount',
                width: 150,
                valueFormatter: (params) => formatUSDCurrency(params.value),
              },
              {
                field: 'balance_after',
                headerName: 'Balance after',
                width: 150,
                valueFormatter: (params) => formatUSDCurrency(params.value),
              },
              {
                field: 'description',
                headerName: 'Description',
                width: 150,
                valueGetter: (params) => '-',
              },
              {
                field: 'type',
                headerName: 'Type',
                width: 150,
                renderCell: (params) => (
                  <TransactionTypeChip label={params.value} />
                ),
              },
            ]}
          />
        </Box>
      </Screen>
    </>
  );
};

export default Index;

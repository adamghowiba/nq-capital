import caretDown12Filled from '@iconify/icons-fluent/caret-down-12-filled';
import { Button, Typography } from '@mui/material';
import Box from '../../lib/components/Box/Box';
import { Stat } from '../../lib/components/KPICard/KPICard';
import NLink from '../../lib/components/Link/Link';
import Screen from '../../lib/components/Screen/Screen';
import { HStack } from '../../lib/components/Stack/Stack';
import CustomDataGrid from '../../lib/components/StyledDataGrid/CustomDataGrid';
import TransactionTypeChip from '../../lib/components/TransactionTypeBadge/TransactionTypeBadge';
import {
  TransactionType,
  useListTransactionsQuery,
} from '../../lib/gql/gql-client';
import AccountValueChart from '../../lib/modules/home/AccountValueChart';
import { formatUSDCurrency } from '../../lib/utils/currency.utils';
import { formatISOForTable } from '../../lib/utils/date.utils';
import { FC, useEffect, useState } from 'react';
import {
  EmptyTransactionCard,
  EmptyTransactions,
} from '../../lib/modules/transactions/components/EmpyTransactions';
import PageHeader from '../../lib/components/PageHeader/PageHeader';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Icon } from '@iconify/react';
import {
  ButtonTab,
  ButtonTabs,
} from 'apps/investors-portal-web/lib/components/Tabs/ButtonTabs';

type TransactionTypeFilter = TransactionType | 'ALL';

interface TransactionsToolbar {
  selectedType?: TransactionTypeFilter;
  onChangeSelectedType?: (type: TransactionTypeFilter) => void;
}

const TransactionsToolbar: FC<TransactionsToolbar> = ({
  selectedType: selectedTypeProp,
  onChangeSelectedType,
  ...props
}) => {
  const TRANSACTION_TYPES: TransactionTypeFilter[] = [
    'ALL',
    'ADJUSTMENT',
    'DEPOSIT',
    'FEE',
    'REFUND',
    'WITHDRAWAL',
  ];

  const selectedType = selectedTypeProp ?? 'ALL';

  return (
    <GridToolbarContainer sx={{ border: 'none', py: 2 }}>
      <HStack
        gap={1}
        width={'60%'}
        overflow="auto"
        sx={{
          scrollbarWidth: 'none',
        }}
      >
        <ButtonTabs
          onChange={(event, value) =>
            onChangeSelectedType?.(value as TransactionTypeFilter)
          }
          value={selectedType}
        >
          {TRANSACTION_TYPES.map((type) => (
            <ButtonTab
              key={type}
              value={type}
              sx={(theme) => ({
                textTransform: 'capitalize',
              })}
              label={type.toLowerCase()}
            />

            // <Button
            //   variant="contained"
            //   color={selectedType === type ? 'primary' : 'secondary'}
            //   key={type}
            //   onClick={() => onChangeSelectedType?.(type)}
            //   sx={{
            //     textTransform: 'capitalize',
            //     flexShrink: 0,
            //     minWidth: 0,
            //     borderRadius: '100px',
            //     minHeight: 0,
            //     '&.MuiButton-sizeMedium': {
            //       height: '32px',
            //     },
            //   }}
            // >
            //   {type?.toLowerCase()}
            // </Button>
          ))}
        </ButtonTabs>
      </HStack>

      <HStack ml="auto" gap={1}>
        <Button variant="contained" color="secondary">
          Filter
        </Button>
        <Button variant="contained" color="secondary">
          Export
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon icon={caretDown12Filled} width={15} height={15} />}
        >
          Create New
        </Button>
      </HStack>
    </GridToolbarContainer>
  );
};

const TransactionsPage = ({ ...props }) => {
  const [selectedTransactionType, setSelectedTransactionType] =
    useState<TransactionTypeFilter>('ALL');

  const transactionsQuery = useListTransactionsQuery(
    {},
    { select: (res) => res.transactions }
  );

  console.log(selectedTransactionType);

  return (
    <>
      <Screen gap={0.5}>
        <PageHeader title="Transactions" />

        <Box height="700px">
          <CustomDataGrid
            rows={transactionsQuery.data || []}
            loading={transactionsQuery.isLoading}
            slots={{
              noRowsOverlay: EmptyTransactions,
              toolbar: TransactionsToolbar,
            }}
            slotProps={{
              noRowsOverlay: {
                sx: {
                  height: '100%',
                },
              },
              toolbar: {
                selectedType: selectedTransactionType,
                onChangeSelectedType: setSelectedTransactionType,
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

export default TransactionsPage;

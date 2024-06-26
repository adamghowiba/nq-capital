import caretDown12Filled from '@iconify/icons-fluent/caret-down-12-filled';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';
import { GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import {
  Box,
  ButtonTab,
  ButtonTabs,
  HStack,
  MenuButton,
  MenuList,
  NMenu,
  NMenuItem,
  StyledTab,
  StyledTabs,
} from '@nq-capital/nui';
import { FC, useState } from 'react';
import NLink from '../../lib/components/Link/Link';
import PageHeader from '../../lib/components/PageHeader/PageHeader';
import Screen from '../../lib/components/Screen/Screen';
import CustomDataGrid from '../../lib/components/StyledDataGrid/CustomDataGrid';
import TransactionTypeChip from '../../lib/components/TransactionTypeBadge/TransactionTypeBadge';
import {
  TransactionType,
  useListTransactionsQuery,
} from '../../lib/gql/gql-client';
import { EmptyTransactions } from '../../lib/modules/transactions/components/EmpyTransactions';
import { formatUSDCurrency } from '../../lib/utils/currency.utils';
import { formatISOForTable } from '../../lib/utils/date.utils';

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
  const apiRef = useGridApiContext();

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
        <StyledTabs
          onChange={(event, value) =>
            onChangeSelectedType?.(value as TransactionTypeFilter)
          }
          value={selectedType}
        >
          {TRANSACTION_TYPES.map((type) => (
            <StyledTab
              key={type}
              value={type}
              sx={(theme) => ({
                textTransform: 'capitalize',
              })}
              label={type.toLowerCase()}
            />
          ))}
        </StyledTabs>
      </HStack>

      <HStack ml="auto" gap={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => apiRef.current.exportDataAsCsv()}
        >
          Export
        </Button>

        <NMenu>
          <MenuButton>
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon icon={caretDown12Filled} width={15} height={15} />}
            >
              Create New
            </Button>
          </MenuButton>

          <MenuList>
            <NMenuItem>Withdrawal</NMenuItem>
            {/* <NMenuItem>Investment</NMenuItem> */}
            {/* <NMenuItem>Support</NMenuItem> */}
          </MenuList>
        </NMenu>
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
            filterModel={{
              items: [
                {
                  field: 'type',
                  operator: 'equals',
                  value:
                    selectedTransactionType === 'ALL'
                      ? ''
                      : selectedTransactionType,
                },
              ],
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

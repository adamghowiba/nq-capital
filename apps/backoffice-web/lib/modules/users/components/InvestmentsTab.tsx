import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import {
  Box,
  ColoredChip,
  CustomDataGrid,
  HStack,
  NAvatar,
  NLink,
  TRANSACTION_TYPE_COLOR_MAP,
  VStack,
} from '@nq-capital/nui';
import { formatISOForTable, formatUSDCurrency, padId } from '@nq-capital/utils';
import { FC, useMemo } from 'react';
import {
  ListTransactionsQuery,
  useListTransactionsQuery,
} from '../../../gql/gql-client';

export interface InvestmentsTabProps {
  investorId: number;
}

export const InvestmentsTab: FC<InvestmentsTabProps> = ({ investorId, ...props }) => {
  const transactionsQuery = useListTransactionsQuery(
    {
      investorId
    },
    { select: (data) => data.transactions, refetchOnMount: false, staleTime: Infinity, }
  );

  const transactionColumns = useMemo((): GridColDef<
    ListTransactionsQuery['transactions'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 130,
        renderCell: (params) => (
          <NLink href={`/transactions/${params.value}`}>
            {padId(params.row.id)}
          </NLink>
        ),
      },
      {
        field: 'investor',
        headerName: 'Investor',
        width: 300,
        renderCell: (params) => {
          return (
            <NLink
              href={
                !!params.row?.investor && `/users/${params.row.investor.id}`
              }
              underline="none"
            >
              <HStack gap={2} align="center">
                <NAvatar size="sm">
                  {params.row.investor?.first_name.substring(0, 1)}
                </NAvatar>

                <VStack gap={0}>
                  <Typography fontSize="13px">
                    {params.row.investor?.first_name}{' '}
                    {params.row.investor?.last_name}
                  </Typography>
                  <Typography color="grey.500" fontSize="13px">
                    {params.row.investor?.email}
                  </Typography>
                </VStack>
              </HStack>
            </NLink>
          );
        },
        valueGetter: (params) =>
          `${params.row.investor?.first_name} ${params.row.investor?.last_name}`,
      },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 150,
        valueFormatter: (params) => formatUSDCurrency(params.value),
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
        field: 'type',
        headerName: 'Type',
        width: 200,
        renderCell: (params) => (
          <ColoredChip
            colorSchema={TRANSACTION_TYPE_COLOR_MAP[params.row.type || 'FEE']}
            sx={{ textTransform: 'capitalize' }}
            label={params.value?.toLowerCase?.()}
          />
        ),
      },
      {
        field: 'fund_name',
        headerName: 'Fund',
        width: 200,
        valueGetter: (params) => params.row.fund?.name || '-',
        renderCell: (params) => (
          <NLink href={!!params.row.fund && `/funds/${params.value}`}>
            {params.value}
          </NLink>
        ),
      },
      {
        field: 'created_at',
        headerName: 'Date',
        width: 150,
        valueFormatter: (params) => formatISOForTable(params.value),
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 150,
        valueGetter: (params) => '-',
      },
    ];
  }, []);

  return (
    <>
      <Box h="700px">
        <CustomDataGrid
          loading={transactionsQuery.isLoading}
          rows={transactionsQuery.data || []}
          columns={transactionColumns}
          slots={{
            toolbar: undefined,
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                investor: false
              }
            }
          }}
        />
      </Box>
    </>
  );
};

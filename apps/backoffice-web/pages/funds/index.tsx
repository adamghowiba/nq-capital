import { Button } from '@mui/material';
import {
  GridColDef
} from '@mui/x-data-grid';
import {
  Box,
  CustomDataGrid,
  NLink,
  PageHeader
} from '@nq-capital/nui';
import { formatISOForTable, formatUSDCurrency, padId } from '@nq-capital/utils';
import { useMemo, useState } from 'react';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListFundsQuery,
  useListFundsQuery,
  useUpdateFundMutation,
} from '../../lib/gql/gql-client';
import { FundMutationDrawer } from '../../lib/modules/funds/components/FundMutationDrawer';
import { NextPageWithLayout } from '../_app';

const FundsListPage: NextPageWithLayout = ({ ...props }) => {
  const [isFundDrawerOpen, setIsFundDrawerOpen] = useState<boolean>(false);

  const fundsQuery = useListFundsQuery({}, { select: (data) => data.funds });
  const updateFundMutation = useUpdateFundMutation();

  const handleSetPrimaryFund = (fundId: number) => {
    updateFundMutation.mutateAsync({
      updateFundInput: {
        id: fundId,
      },
    });
  };

  const fundColumns = useMemo((): GridColDef<
    ListFundsQuery['funds'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        valueFormatter: ({ value }) => padId(value),
        renderCell: (params) => (
          <NLink href={`/funds/${params.value}`}>{params.formattedValue}</NLink>
        ),
      },
      {
        field: 'name',
        headerName: 'Fund Name',
        width: 200,
      },
      {
        field: 'balance',
        headerName: 'Current Balance',
        width: 200,
        valueFormatter: ({ value }) => formatUSDCurrency(value),
      },
      {
        field: 'is_primary',
        headerName: 'Primary',
        description:
          'Mark a fund as the primary fund. Primary funds will be used as the default fund for certain operations',
        valueFormatter: ({ value }) => (value ? 'Yes' : 'No'),
      },
      // TODO: Add in or remove
      // {
      //   field: 'investors',
      //   headerName: 'Investors',
      //   width: 200,
      // },
      {
        field: 'created_at',
        headerName: 'Created',
        width: 200,
        valueFormatter: ({ value }) => formatISOForTable(value),
      },
      {
        field: 'updated_at',
        headerName: 'Updated',
        width: 200,
        valueFormatter: ({ value }) => formatISOForTable(value),
      },
      // {
      //   field: 'actions',
      //   headerName: '',
      //   sortable: false,
      //   filterable: false,
      //   renderCell: (params) => {
      //     return (
      //       <NMenu>
      //         <MenuButton>
      //           <IconButton>
      //             <Icon icon={moreVerticalIcon} fontSize={20} />
      //           </IconButton>
      //         </MenuButton>

      //         <MenuList>
      //           <NMenuItem>Make primary</NMenuItem>
      //           <NMenuItem>Delete</NMenuItem>
      //         </MenuList>
      //       </NMenu>
      //     );
      //   },
      // },
    ];
  }, []);

  return (
    <>
      <Screen gap={3}>
        <PageHeader
          title="Funds"
          subtitle="Create, manage, and track your investment funds."
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

        <Box h="700px">
          <CustomDataGrid
            loading={fundsQuery.isLoading}
            rows={fundsQuery.data || []}
            columns={fundColumns}
            checkboxSelection
            disableRowSelectionOnClick
            // filterModel={filters}
            renderSelectActions={({ selectedRows }) => {
              return (
                <>
                  {selectedRows.length === 1 && (
                    <>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        // onClick={() =>
                        //   deleteTicketMutation.mutate({
                        //     id: selectedRows[0] as number,
                        //   })
                        // }
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </>
              );
            }}
          />
        </Box>
      </Screen>

      <FundMutationDrawer
        open={isFundDrawerOpen}
        onClose={() => setIsFundDrawerOpen(false)}
      />
    </>
  );
};

export default FundsListPage;

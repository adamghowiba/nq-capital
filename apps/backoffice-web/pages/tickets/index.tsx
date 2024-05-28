import { TabContext } from '@mui/lab';
import { Button } from '@mui/material';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';
import {
  Box,
  ColoredChip,
  ConfirmationModal,
  CustomDataGrid,
  MenuButton,
  MenuList,
  NLink,
  NMenu,
  NMenuItem,
  PageHeader,
  StyledTab,
  StyledTabs,
  TICKET_STATUS_COLOR_MAP,
  TICKET_TYPE_COLOR_MAP,
  useConfirmation,
} from '@nq-capital/nui';
import { formatISOForTable, padId } from '@nq-capital/utils';
import { useEffect, useMemo, useState } from 'react';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListTickersQuery,
  TicketStatus,
  useDeleteTicketMutation,
  useListTickersQuery,
  useUpdateTicketMutation,
} from '../../lib/gql/gql-client';
import { NextPageWithLayout } from '../_app';
import { toast } from 'sonner';
import { parseApiError } from '../../lib/utils/error.utils';

const TickerPage: NextPageWithLayout = ({ ...props }) => {
  const deleteConfirmation = useConfirmation<{ ticketId: number }>();

  const [tabValue, setTabValue] = useState<'open' | 'closed'>('open');
  const [filters, setFilters] = useState<GridFilterModel>({
    items: [],
  });

  const ticketsQuery = useListTickersQuery(undefined, {
    select: (data) => data.tickets,
  });

  const updateTicketMutation = useUpdateTicketMutation({
    onSuccess: () => {
      ticketsQuery.refetch();
    },
  });
  const deleteTicketMutation = useDeleteTicketMutation({
    onSuccess: () => {
      ticketsQuery.refetch();
      deleteConfirmation.onClose();
    },
  });

  const updateTicketStatus = (ticketId: number, status: TicketStatus) => {
    const promise = updateTicketMutation.mutateAsync({
      updateTicketInput: { id: ticketId, status },
    });

    toast.promise(promise, {
      loading: 'Updating ticket status...',
      success: `Ticket status updated to '${status
        .toLocaleLowerCase()
        .replace('_', ' ')}'`,
      error: parseApiError,
    });
  };

  const handleDeleteTicket = (ticketId: number) => {
    const promise = deleteTicketMutation.mutateAsync({
      id: ticketId,
    });

    toast.promise(promise, {
      loading: 'Deleting ticket...',
      success: 'Ticket deleted successfully!',
      error: parseApiError,
    });
  };

  const ticketColumns = useMemo((): GridColDef<
    ListTickersQuery['tickets'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        renderCell: (params) => (
          <NLink href={`/tickets/${params.value}`}>
            {padId(params.row.id)}
          </NLink>
        ),
      },
      {
        field: 'title',
        headerName: 'Title',
        valueGetter: (params) =>
          params.row?.data?.title || params.row.data.subject,
        width: 200,
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 120,
        renderCell: (params) => (
          <ColoredChip
            label={params.value?.toLowerCase?.()}
            colorSchema={TICKET_TYPE_COLOR_MAP[params.row.type]}
            sx={{
              textTransform: 'capitalize',
            }}
          />
        ),
      },
      {
        field: 'description',
        headerName: 'Description',
        valueGetter: (params) => params.row?.data?.description || '-',
        width: 200,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 200,
        renderCell: (params) => (
          <ColoredChip
            label={params.value?.replace('_', ' ')?.toLowerCase?.()}
            colorSchema={TICKET_STATUS_COLOR_MAP[params.row.status]}
            sx={{
              textTransform: 'capitalize',
            }}
          />
        ),
      },
      {
        field: 'created_at',
        headerName: 'Created Date',
        valueFormatter: (params) => formatISOForTable(params.value),
        width: 200,
      },
      {
        field: 'updated_at',
        headerName: 'Last Updated',
        valueFormatter: (params) => formatISOForTable(params.value),
        width: 200,
      },
    ];
  }, []);

  useEffect(() => {
    if (tabValue === 'open') {
      setFilters({
        items: [
          {
            field: 'status',
            operator: 'isAnyOf',
            value: ['OPEN', 'UNDER_REVIEW'],
          },
        ],
      });
    }

    if (tabValue === 'closed') {
      setFilters({
        items: [
          {
            field: 'status',
            operator: 'equals',
            value: 'CLOSED',
          },
        ],
      });
    }
  }, [tabValue]);

  return (
    <>
      <Screen>
        <PageHeader title="Tickets" />

        <TabContext value={tabValue}>
          <StyledTabs
            value={tabValue}
            onChange={(event, value) => setTabValue(value)}
            aria-label="Switch tabs"
            sx={{ width: 'auto', marginRight: 'auto' }}
          >
            <StyledTab
              label="Open"
              value="open"
              sx={{ padding: '4px 10px', minHeight: '25px' }}
            />
            <StyledTab
              label="Closed"
              value="closed"
              sx={{ padding: '4px 10px', minHeight: '25px' }}
            />
          </StyledTabs>

          <Box h="700px">
            <CustomDataGrid
              loading={ticketsQuery.isLoading}
              rows={ticketsQuery.data || []}
              columns={ticketColumns}
              checkboxSelection
              disableRowSelectionOnClick
              filterModel={filters}
              renderSelectActions={({ selectedRows }) => {
                return (
                  <>
                    {selectedRows.length === 1 && (
                      <>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            // deleteTicketMutation.mutate({
                            //   id: selectedRows[0] as number,
                            // })
                            deleteConfirmation.onOpen({
                              ticketId: selectedRows[0] as number,
                            })
                          }
                        >
                          Delete
                        </Button>

                        <NMenu>
                          <MenuButton>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Change status
                            </Button>
                          </MenuButton>

                          <MenuList>
                            <NMenuItem
                              onClick={() =>
                                updateTicketStatus(
                                  selectedRows[0] as number,
                                  'CLOSED'
                                )
                              }
                            >
                              Closed
                            </NMenuItem>
                            <NMenuItem
                              onClick={() =>
                                updateTicketStatus(
                                  selectedRows[0] as number,
                                  'OPEN'
                                )
                              }
                            >
                              Open
                            </NMenuItem>
                            <NMenuItem
                              onClick={() =>
                                updateTicketStatus(
                                  selectedRows[0] as number,
                                  'UNDER_REVIEW'
                                )
                              }
                            >
                              Under review
                            </NMenuItem>
                          </MenuList>
                        </NMenu>
                      </>
                    )}
                  </>
                );
              }}
            />
          </Box>
        </TabContext>
      </Screen>

      <ConfirmationModal
        title="Delete Ticket?"
        maxWidth={'400px'}
        content={`Are you sure you want to delete ticket #${padId(deleteConfirmation.open?.ticketId || 0)}? This action cannot be undone, and
        the user will not be notified about this deletion.`}
        {...deleteConfirmation.getConfirmationProps()}
        onConfirm={(data) => handleDeleteTicket(data.ticketId)}
        isLoading={deleteTicketMutation.isPending}
      />
    </>
  );
};

export default TickerPage;

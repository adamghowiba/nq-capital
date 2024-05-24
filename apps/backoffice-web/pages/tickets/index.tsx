import { TabContext } from '@mui/lab';
import { Button } from '@mui/material';
import { GridColDef, GridFilterModel } from '@mui/x-data-grid';
import {
  Box,
  ChipColorSchema,
  ColoredChip,
  CustomDataGrid,
  MenuButton,
  MenuList,
  NLink,
  NMenu,
  NMenuItem,
  PageHeader,
  StyledTab,
  StyledTabs
} from '@nq-capital/nui';
import { formatISOForTable } from '@nq-capital/utils';
import { useEffect, useMemo, useState } from 'react';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  InvestorAccountStatus,
  InvitationStatus,
  ListTickersQuery,
  TicketStatus,
  TicketType,
  useDeleteTicketMutation,
  useListTickersQuery,
  useUpdateTicketMutation
} from '../../lib/gql/gql-client';
import { NextPageWithLayout } from '../_app';

const TickerPage: NextPageWithLayout = ({ ...props }) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
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
  const deleteTicketMutation = useDeleteTicketMutation();

  const updateTicketStatus = (ticketId: number, status: TicketStatus) => {
    updateTicketMutation.mutate({
      updateTicketInput: { id: ticketId, status },
    });
  };

  const TICKET_TYPE_COLOR_MAP: Record<TicketType, ChipColorSchema> = {
    DOCUMENT_REQUEST: 'blue',
    SUPPORT: 'green',
  };

  const TICKET_STATUS_COLOR_MAP: Record<TicketStatus, ChipColorSchema> = {
    CLOSED: 'neutral',
    OPEN: 'green',
    UNDER_REVIEW: 'blue',
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
            #{params.row.id.toString().padStart(5, '0')}{' '}
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
            operator: 'equals',
            value: 'OPEN',
          },
        ],
      });
    }

    if (tabValue === 'closed') {
      setFilters({
        items: [
          {
            field: 'status',
            operator: 'isAnyOf',
            value: ['CLOSED', 'UNDER_REVIEW'],
          },
        ],
      });
    }
  }, [tabValue]);

  return (
    <>
      <Screen>
        <PageHeader
          title="Tickets"
        />

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
                            deleteTicketMutation.mutate({
                              id: selectedRows[0] as number,
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
                              Resolved
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
    </>
  );
};

export default TickerPage;

import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import PageHeader from '../../lib/components/PageHeader/PageHeader';
import Screen from '../../lib/components/Screen/Screen';
import TickerMutationDrawer from '../../lib/modules/tickets/components/TicketMutationDrawer';
import { NextPageWithLayout } from '../_app';
import { GridColDef } from '@mui/x-data-grid';
import {
  ListTickersQuery,
  TicketType,
  useListTickersQuery,
} from '../../lib/gql/gql-client';
import { PathParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { formatISOForTable } from '../../lib/utils/date.utils';
import CustomDataGrid from '../../lib/components/StyledDataGrid/CustomDataGrid';
import Box from '../../lib/components/Box/Box';
import NLink from '../../lib/components/Link/Link';
import ColoredChip, {
  ChipColorSchema,
  ColoredChipProps,
} from '../../lib/components/ColoredChip/ColoredChip';

const TicketsPage: NextPageWithLayout = ({ ...props }) => {
  const [isTicketDrawerOpen, setIsTicketDrawerOpen] = useState(false);
  const ticketsQuery = useListTickersQuery(
    {},
    { select: (res) => res.tickets }
  );

  const TICKET_TYPE_COLOR_MAP: Record<TicketType, ChipColorSchema> = {
    DOCUMENT_REQUEST: 'blue',
    SUPPORT: 'green',
  };

  const ticketColumns = useMemo((): GridColDef<
    ListTickersQuery['tickets'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        renderCell: (params) => (
          <NLink href={`/tickets/${params.value}`}>#{params.value} </NLink>
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
        width: 200,
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

  return (
    <>
      <Screen gap={0.5}>
        <PageHeader
          title="Tickets"
          actions={
            <>
              <Button
                onClick={() => setIsTicketDrawerOpen((open) => !open)}
                variant="contained"
              >
                Create New
              </Button>
            </>
          }
        />
        <Box h="700px">
          <CustomDataGrid
            rows={ticketsQuery.data || []}
            loading={ticketsQuery.isLoading}
            columns={ticketColumns}
          />
        </Box>
      </Screen>

      <TickerMutationDrawer
        mode={{
          type: 'create',
        }}
        open={isTicketDrawerOpen}
        onClose={() => setIsTicketDrawerOpen(false)}
      />
    </>
  );
};

export default TicketsPage;

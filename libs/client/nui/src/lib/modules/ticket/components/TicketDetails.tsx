import { Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { formatISOForTable, padId } from '@nq-capital/utils';
import { DateTime } from 'luxon';
import { FC, ReactNode } from 'react';
import { TicketEntity } from '../../../../schema';
import { HStack } from '../../../components/Stack/Stack';
import { Box } from '../../../components/Box/Box';
import { TICKET_STATUS_COLOR_MAP } from '../../../constants/color-map.constants';
import { CHIP_COLOR_MAP } from '../../../components/ColoredChip/ColoredChip';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TicketDetailsProps
  extends Pick<
    TicketEntity,
    'id' | 'type' | 'status' | 'priority' | 'updated_at' | 'created_at'
  > {}

export const TicketDetails: FC<TicketDetailsProps> = ({
  created_at,
  id,
  priority,
  status,
  type,
  updated_at,
  ...props
}) => {
  const ticketData: { label: string; value: ReactNode }[] = [
    {
      label: 'ID',
      value: padId(id),
    },
    {
      label: 'Ticket Type',
      value: type,
    },
    {
      label: 'Status',
      value: (
        <Box
          color={
            CHIP_COLOR_MAP[TICKET_STATUS_COLOR_MAP[status || 'OPEN']].color
          }
        >
          {status}
        </Box>
      ),
    },
    {
      label: 'Urgency',
      value: priority,
    },
    {
      label: 'Last Updated',
      value: formatISOForTable(updated_at),
    },
    {
      label: 'Days Open',
      value: created_at
        ? Math.abs(
            Math.ceil(DateTime.fromISO(created_at).diffNow('days')?.days)
          ) || 1
        : '-',
    },
  ];

  return (
    <Grid
      container
      width="100%"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#F1F1F1"
      spacing={3}
    >
      {ticketData.map((data) => {
        return (
          <Grid key={data.label} mobile={6}>
            <HStack w="100%">
              <Typography
                variant="body2"
                sx={{ width: '140px', color: '#808080' }}
              >
                {data.label}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: '#202020' }}
                component="div"
              >
                {data.value}
              </Typography>
            </HStack>
          </Grid>
        );
      })}
    </Grid>
  );
};

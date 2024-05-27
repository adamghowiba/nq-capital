import { Typography } from '@mui/material';
import { formatISOForTable } from '@nq-capital/utils';
import { FC, ReactNode } from 'react';
import { TicketStatus } from '../../../../schema';
import { ColoredChip } from '../../../components/ColoredChip/ColoredChip';
import { HStack, VStack } from '../../../components/Stack/Stack';
import { TICKET_STATUS_COLOR_MAP } from '../../../constants/color-map.constants';

export interface TicketHeaderProps {
  /**
   * Ticket status
  */
 status: TicketStatus;
 createdIsoDate: string
 actions?: ReactNode
 /**
  * @default 'Ticket Details'
  */
 title?: string;
}

export const TicketHeader: FC<TicketHeaderProps> = ({
  title = 'Ticket Details',
  status,
  createdIsoDate,
  actions,
  ...props
}) => {
  return (
    <HStack>
      <VStack>
        <HStack gap={1} alignItems="center">
          <Typography variant="h2">{title}</Typography>

          <ColoredChip
            label={status}
            colorSchema={TICKET_STATUS_COLOR_MAP[status || 'OPEN']}
            size="small"
          />
        </HStack>
        <Typography variant="subtitle2">
          {formatISOForTable(createdIsoDate)}
        </Typography>
      </VStack>

      <HStack ml="auto" alignSelf="start" gap={1}>
        {actions}
      </HStack>
    </HStack>
  );
};

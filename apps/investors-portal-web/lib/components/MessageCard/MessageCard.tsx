import React, { FC } from 'react';
import { HStack, VStack } from '../Stack/Stack';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { stringifyISODate } from '../../utils/date.utils';
import { DateTime } from 'luxon';
import CheckBadgeIcon from '../Icons/CheckBadgeIcon';

export interface MessageCardProps {
  displayName: string;
  isVerified?: boolean;
  content: string;
  /**
   * ISO date time for the message
   */
  date: string;
}

const MessageCard: FC<MessageCardProps> = ({
  content,
  date,
  displayName,
  isVerified,
  ...props
}) => {
  const formattedFullDate = DateTime.fromISO(date).toLocaleString(
    DateTime.DATETIME_SHORT
  );

  return (
    <>
      <HStack align="start" gap={1.5}>
        <Avatar
          sx={{
            width: '28px',
            height: '28px',
            fontSize: '14px',
            bgcolor: '#EBEBEB',
            color: '#646464',
          }}
        >
          {displayName.slice(0, 1)}
        </Avatar>

        <VStack gap={0.8}>
          <HStack mt="3px" gap={0.5}>
            <Typography
              component="span"
              sx={{ color: '#202020' }}
              fontWeight="semibold"
              lineHeight="1"
            >
              You
            </Typography>

            {isVerified && <CheckBadgeIcon />}

            <Tooltip title={formattedFullDate}>
              <Typography sx={{ color: '#8D8D8D' }} ml={0.8} lineHeight="1">
                {stringifyISODate(date)}
              </Typography>
            </Tooltip>
          </HStack>

          <Typography sx={{ color: '#646464' }}>{content}</Typography>
        </VStack>
      </HStack>
    </>
  );
};

export default MessageCard;

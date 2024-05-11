import React, { FC } from 'react';
import { HStack, VStack } from '../Stack/Stack';
import { Avatar, Box, Tooltip, Typography } from '@mui/material';
import { stringifyISODate } from '../../utils/date.utils';
import { DateTime } from 'luxon';
import CheckBadgeIcon from '../Icons/CheckBadgeIcon';
import { AssetEntity } from '../../gql/gql-client';
import FileChip from '../FileChip/FileChip';
import { downloadFile } from '../../utils/download.utils';

export interface MessageCardProps {
  displayName: string;
  isVerified?: boolean;
  content: string;
  /**
   * ISO date time for the message
   */
  date: string;
  files?: Pick<
    AssetEntity,
    'original_name' | 'url' | 'asset_type' | 'mime_type'
  >[];
}

const MessageCard: FC<MessageCardProps> = ({
  content,
  date,
  displayName,
  isVerified,
  files,
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

          {!!files?.length && (
            <HStack gap={1} overflow="auto" sx={{ scrollbarWidth: 'none' }}>
              {files?.map((file) => (
                <FileChip
                  key={file.url}
                  fileName={file.original_name}
                  fileType={file.asset_type}
                  onClick={() =>
                    downloadFile(file.url, { filename: file.original_name })
                  }
                />
              ))}
            </HStack>
          )}
        </VStack>
      </HStack>
    </>
  );
};

export default MessageCard;
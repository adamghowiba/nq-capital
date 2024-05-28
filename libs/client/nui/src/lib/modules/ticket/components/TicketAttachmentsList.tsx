import documentIcon from '@iconify/icons-fluent/document-100-16-filled';
import { Icon } from '@iconify/react';
import { Typography } from '@mui/material';
import { getFormattedFileSize } from '@nq-capital/utils';
import { AssetEntity } from '../../../../schema';
import { FC } from 'react';
import { HStack, VStack } from '../../../components/Stack/Stack';

export interface TicketAttachmentsListProps {
  assets: Pick<AssetEntity, 'id' | 'original_name' | 'size'>[];
}

export const TicketAttachmentsList: FC<TicketAttachmentsListProps> = ({
  assets,
  ...props
}) => {
  return (
    <VStack gap={1.5}>
      <Typography>Attachments</Typography>
      {assets?.map((asset) => {
        return (
          <HStack key={asset.id} color="#646464" gap={1}>
            <Icon icon={documentIcon} width={16} height={16} />
            <Typography sx={{ color: '#646464' }} fontWeight="600">
              {asset.original_name}
            </Typography>

            {asset.size && (
              <Typography sx={{ color: '#BBBBBB' }}>
                {getFormattedFileSize(asset.size)}
              </Typography>
            )}
          </HStack>
        );
      })}
    </VStack>
  );
};

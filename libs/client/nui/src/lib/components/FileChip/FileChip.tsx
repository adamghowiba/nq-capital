import document16Filled from '@iconify/icons-fluent/document-16-filled';
import documentBulletList16Filled from '@iconify/icons-fluent/document-bullet-list-16-filled';
import documentImage16Filled from '@iconify/icons-fluent/document-image-16-filled';
import { Icon, IconifyIcon } from '@iconify/react';
import { Chip, ChipProps, Typography } from '@mui/material';
import { FileType } from '@nq-capital/utils';
import { FC } from 'react';
import { HStack } from '../Stack/Stack';

export interface FileChipProps
  extends Pick<ChipProps, 'onClick' | 'onDelete' | 'sx'> {
  fileType: FileType;
  fileName: string;
}

const FILE_TYPE_ICON_MAP: Record<FileType, IconifyIcon> = {
  CSV: documentBulletList16Filled,
  EXCEL: documentBulletList16Filled,
  PDF: document16Filled,
  IMAGE: documentImage16Filled,
  WORD: documentBulletList16Filled,
  UNKNOWN: document16Filled,
};

export const FileChip: FC<FileChipProps> = ({
  fileType,
  fileName,
  ...props
}) => {
  const fileIcon = FILE_TYPE_ICON_MAP[fileType];
  return (
    <Chip
      size="small"
      label={
        <HStack gap={0.5}>
          <Icon icon={fileIcon} />
          <Typography variant="body2">{fileName}</Typography>
        </HStack>
      }
      sx={{
        flexShrink: 0,
      }}
      {...props}
    />
  );
};

export default FileChip;

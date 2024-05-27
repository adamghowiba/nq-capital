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
  /**
   * Optional href for the file, will open a new tab when clicked
   */
  href?: string;
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
  href,
  ...props
}) => {
  const fileIcon = FILE_TYPE_ICON_MAP[fileType];
  return (
    <Chip
      size="small"
      component={href ? 'a' : "div"}
      label={
        <HStack gap={0.5}>
          <Icon icon={fileIcon} />
          <Typography variant="body2">{fileName}</Typography>
        </HStack>
      }
      href={href}
      target="_blank"
      sx={{
        flexShrink: 0,
        cursor: 'pointer'
      }}
      {...props}
    />
  );
};

export default FileChip;

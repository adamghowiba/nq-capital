import { Icon } from '@iconify/react';
import { IconButton, InputProps, styled } from '@mui/material';
import React, { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import add12Icon from '@iconify/icons-fluent/add-12-filled';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export interface UploadIconButtonProps extends InputHTMLAttributes<any> {}

export const UploadIconButton: FC<UploadIconButtonProps> = ({ ...props }) => {
  return (
    <IconButton sx={{ bgcolor: '#F1F1F1' }} role={undefined} component="label">
      <VisuallyHiddenInput
        type="file"
        multiple
        accept=".xlsx,.xls,.pdf,.txt,.json,.png,.jpg"
        {...props}
      />
      <Icon icon={add12Icon} width={16} height={16} />
    </IconButton>
  );
};

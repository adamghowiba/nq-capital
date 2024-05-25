import React, { FC } from 'react';
import { Stack } from '@mui/material';
import { StackPropsExtended } from '@nq-capital/nui';

export interface ScreenProps extends StackPropsExtended {}

export const Screen: FC<ScreenProps> = ({ children, ...props }) => {
  return (
    <Stack py="24px" px="24px" gap={2} {...props}>
      {children}
    </Stack>
  );
};

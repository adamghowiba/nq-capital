import React, { FC } from 'react';
import { Box, BoxPropsExtended } from '../Box/Box';

export interface DialogHeaderProps extends BoxPropsExtended {}

export const DialogHeader: FC<DialogHeaderProps> = ({ children, ...props }) => {
  return (
      <Box
        p={3}
        py={2}
        sx={{ borderBottom: '1px solid', borderColor: '#F1F1F1', ...props?.sx }}
        {...props}
      >
        {children}
      </Box>
  );
};

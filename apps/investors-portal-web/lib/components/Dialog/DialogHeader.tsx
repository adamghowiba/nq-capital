import React, { FC } from 'react';
import Box, { BoxPropsExtended } from '../Box/Box';

export interface DialogHeaderProps extends BoxPropsExtended {}

const DialogHeader: FC<DialogHeaderProps> = ({ children, ...props }) => {
  return (
    <>
      <Box
        p={3}
        sx={{ borderBottom: '1px solid', borderColor: 'divider', ...props?.sx }}
        {...props}
      >
        {children}
      </Box>
    </>
  );
};

export default DialogHeader;

import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { BoxPropsExtended } from '../Box/Box';

export interface DrawerBodyProps extends PropsWithChildren, BoxPropsExtended {}

export const DrawerBody: FC<DrawerBodyProps> = ({ children, ...props }) => {
  return (
    <Box p={3} py="12px" flexGrow={1} overflow="auto" {...props}>
      {children}
    </Box>
  );
};

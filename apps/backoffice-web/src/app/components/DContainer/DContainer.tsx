import Box, { BoxProps } from '@mui/material/Box';
import React, { FC, PropsWithChildren } from 'react';

export interface DContainerProps extends BoxProps, PropsWithChildren {}

const DContainer: FC<DContainerProps> = ({ children, ...rest }) => {
  return (
    <>
      <Box px="60px" {...rest}>{children}</Box>
    </>
  );
};

export default DContainer;

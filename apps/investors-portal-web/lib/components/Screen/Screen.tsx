import React, { FC } from 'react';
import Box, { BoxPropsExtended } from '../Box/Box';
import { Stack } from '@mui/material';
import { StackPropsExtended } from '../Stack/Stack';

export interface ScreenProps extends StackPropsExtended {}

const Screen: FC<ScreenProps> = ({ children, ...props }) => {
  return (
    <>
      <Stack py="40px" px="80px" gap={5} {...props}>
        {children}
      </Stack>
    </>
  );
};

export default Screen;

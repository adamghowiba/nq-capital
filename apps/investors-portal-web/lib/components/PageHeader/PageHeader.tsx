import React, { FC, ReactNode } from 'react';
import Box from '../Box/Box';
import { Typography, useTheme } from '@mui/material';
import { HStack, StackPropsExtended } from '../Stack/Stack';

export interface PageHeaderProps {
  title: ReactNode;
  actions?: ReactNode;
  ContainerProps?: StackPropsExtended
}

const PageHeader: FC<PageHeaderProps> = ({ title, actions, ContainerProps, ...props }) => {

  return (
    <>
      <HStack w="100%" align="center" {...ContainerProps}>
        <Typography variant="h2" component="div" >
          {title}
        </Typography>

        <HStack ml="auto" gap={2}>{actions}</HStack>
      </HStack>
    </>
  );
};

export default PageHeader;

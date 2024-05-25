import { Typography } from '@mui/material';
import { Box, HStack, VStack } from '@nq-capital/nui';
import React, { FC, PropsWithChildren, ReactNode } from 'react';

export interface DataGroupProps extends PropsWithChildren {
  title: string;
  isExpandable?: boolean;
}

export const DataGroup: FC<DataGroupProps> = ({
  title,
  isExpandable,
  children,
  ...props
}) => {
  return (
    <>
      <VStack w="full">
        <HStack
          w="full"
          bgcolor="#F9F9F9"
          px="12px"
          minHeight="40px"
          py="8px"
          borderRadius="8px"
        >
          <Typography>{title}</Typography>
        </HStack>

        <Box w="full">{children}</Box>
      </VStack>
    </>
  );
};

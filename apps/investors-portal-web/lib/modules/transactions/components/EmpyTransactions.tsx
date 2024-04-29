import { Button, Typography } from '@mui/material';
import Box from '../../../../lib/components/Box/Box';
import {
  HStack,
  StackPropsExtended,
  VStack,
} from '../../../../lib/components/Stack/Stack';
import React, { FC } from 'react';

export interface EmptyTransactionsProps extends StackPropsExtended {}

export const EmptyTransactions: FC<EmptyTransactionsProps> = ({ ...props }) => {
  return (
    <>
      <VStack
        justify="center"
        align="center"
        textAlign="center"
        gap={0.5}
        w="367px"
        mx="auto"
        {...props}
      >
        <EmptyTransactionCard />

        <Typography mt={2}>No Transactions found</Typography>
        <Typography color="#8D8D8D" fontWeight="400">
          Start adding transactions to track your financial activity
        </Typography>

        <Button variant="outlined" sx={{ mt: 1 }}>
          Add transaction
        </Button>
      </VStack>
    </>
  );
};

export const EmptyTransactionCard: FC<any> = ({ ...props }) => {
  return (
    <HStack
      p="14px"
      gap={1.5}
      width="100%"
      border="1px solid #EBEBEB"
      borderRadius="16px"
    >
      <Box w="32px" h="32px" bgcolor="#F1F1F1" borderRadius="8px" />

      <VStack w="full" gap={1}>
        <Box w="60%" h="12px" bgcolor="#F1F1F1" borderRadius="6px" />
        <Box w="40%" h="12px" bgcolor="#F1F1F1" borderRadius="6px" />
      </VStack>
    </HStack>
  );
};

import { HStack, VStack } from '@nq-capital/nui';
import React, { FC } from 'react';

export interface ErrorCardProps {
  code?: string;
  statusCode?: number;
  name?: string;
  message?: string;
  path?: string;
  showToUser?: boolean;
  meta?: Record<string, any>;
}

export const ErrorCard: FC<ErrorCardProps> = ({
  code,
  message,
  name,
  statusCode,
  meta,
  ...props
}) => {
  return (
    <>
      <VStack bgcolor="#F9FAFB" borderColor="1px solid #F3F4F6" color="#374151" p="12px" borderRadius="4px">
        <HStack>
          <span>Code</span>
          <span>{code}</span>
        </HStack>

        <HStack>
          <span>Status Code</span>
          <span>{statusCode}</span>
        </HStack>

        <HStack>
          <span>Name</span>
          <span>{name}</span>
        </HStack>
      </VStack>
    </>
  );
};

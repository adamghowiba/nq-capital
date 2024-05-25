import { FC, PropsWithChildren } from 'react';
import { HStack } from '../Stack/Stack';

export interface DrawerFooterProps extends PropsWithChildren {}

export const DrawerFooter: FC<DrawerFooterProps> = ({ children, ...props }) => {
  return (
    <HStack px={3} py="12px" justifyContent="end" gap={1}>
      {children}
    </HStack>
  );
};

import { HStack } from '@nq-capital/nui';
import { FC, PropsWithChildren } from 'react';

export interface DrawerFooterProps extends PropsWithChildren {}

const DrawerFooter: FC<DrawerFooterProps> = ({ children, ...props }) => {
  return (
    <HStack px={3} py="12px" justifyContent="end" gap={1}>
      {children}
    </HStack>
  );
};

export default DrawerFooter;

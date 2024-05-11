import { BoxPropsExtended, HStack, StackPropsExtended } from '@nq-capital/nui';
import React, { FC, ReactNode } from 'react';
import { IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';
import Link from 'next/link';

export interface SidebarItemProps extends StackPropsExtended {
  icon: ReactNode;
  isActive?: boolean;
  href?: string;
}

const SidebarItem: FC<SidebarItemProps> = ({
  children,
  icon,
  isActive,
  href,
  ...props
}) => {
  return (
    <>
      <HStack
        h="36px"
        w="full"
        px="12px"
        align="center"
        lineHeight="1"
        color="#202020"
        gap={2}
        component={href ? Link : 'div'}
        fontWeight={500}
        // @ts-expect-error MUI doesn't inherit the `href` prop
        href={href}
        sx={{
          appearance: 'none',
          outline: 'none',
          border: 'none',
          margin: '0',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'background-color 0.1s ease',
          ':hover': {
            bgcolor: 'rgba(5, 5, 255, 0.03)',
          },
        }}
        {...(isActive
          ? { color: '#5B5BD6', bgcolor: 'rgba(5, 5, 255, 0.05)' }
          : undefined)}
      >
        <Box color={isActive ? '#5B5BD6' : '#646464'}>{icon}</Box>

        {children}
      </HStack>
    </>
  );
};

export default SidebarItem;

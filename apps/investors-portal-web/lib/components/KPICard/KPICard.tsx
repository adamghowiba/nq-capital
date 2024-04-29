import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Box, { BoxPropsExtended } from '../Box/Box';
import { Tooltip, Typography } from '@mui/material';
import ColoredChip from '../ColoredChip/ColoredChip';
import { HStack, StackPropsExtended, VStack } from '../Stack/Stack';
import { Icon } from '@iconify/react';
import info16FilledIcon from '@iconify/icons-fluent/info-16-filled';

export interface KPICardProps extends PropsWithChildren, StackPropsExtended {}

export const KPICard: FC<KPICardProps> = ({ children, ...props }) => {
  return (
    <VStack
      border="1px solid"
      borderColor="divider"
      p={3}
      height={'150px'}
      width="100%"
      borderRadius="16px"
      {...props}
    >
      {children}
    </VStack>
  );
};

export interface KPICardTitleProps extends PropsWithChildren {
  tooltip?: ReactNode;
}

export const KPICardTitle: FC<KPICardTitleProps> = ({
  children,
  tooltip,
  ...props
}) => {
  return (
    <>
      <HStack>
        <Typography fontSize="16px">{children}</Typography>

        {tooltip && (
          <Tooltip title={tooltip}>
            <Icon
              icon={info16FilledIcon}
              width={20}
              height={20}
              color="#BBBBBB"
              style={{
                marginLeft: '5px',
              }}
            />
          </Tooltip>
        )}
      </HStack>
    </>
  );
};

export interface KPICardValueProps extends PropsWithChildren {}

export const KPICardValue: FC<KPICardValueProps> = ({ children, ...props }) => {
  return (
    <Typography fontSize="24px" fontWeight="600">
      {children}
    </Typography>
  );
};

export interface KPICardChangeProps extends PropsWithChildren {
  /**
   * @default 'increase'
   */
  type?: 'increase' | 'decrease';
  variant?: 'value';
}

export const KPICardChange: FC<KPICardChangeProps> = ({
  children,
  type = 'increase',
  variant = 'value',
  ...props
}) => {
  return (
    <ColoredChip
      colorSchema={type === 'increase' ? 'green' : 'red'}
      label={children}
    />
  );
};

export interface StatProps extends KPICardTitleProps, KPICardValueProps {
  title: ReactNode;
  value: ReactNode;
  tooltip?: ReactNode;
  change?: Omit<KPICardChangeProps, 'children'> & { value: ReactNode };
}

export const Stat: FC<StatProps> = ({ title, value, tooltip, change }) => {
  return (
    <KPICard display="flex" justifyContent="space-between">
      <KPICardTitle tooltip={tooltip}>{title}</KPICardTitle>
      <HStack gap={1}>
        <KPICardValue>{value}</KPICardValue>
        {change && (
          <KPICardChange {...change}>
            {change.type === 'increase' ? '+' : '-'} {change.value}
          </KPICardChange>
        )}
      </HStack>
    </KPICard>
  );
};

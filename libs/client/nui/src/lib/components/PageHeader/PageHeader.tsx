import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { HStack, StackPropsExtended } from '../Stack/Stack';

export interface PageHeaderProps {
  title: ReactNode;
  actions?: ReactNode;
  ContainerProps?: StackPropsExtended;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  actions,
  ContainerProps,
  ...props
}) => {
  return (
    <HStack w="100%" align="center" {...ContainerProps}>
      <Typography variant="h2" component="div">
        {title}
      </Typography>

      <HStack ml="auto" gap={2}>
        {actions}
      </HStack>
    </HStack>
  );
};

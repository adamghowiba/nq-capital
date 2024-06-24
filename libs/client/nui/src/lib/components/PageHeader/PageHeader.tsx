import { Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { HStack, StackPropsExtended, VStack } from '../Stack/Stack';

export interface PageHeaderProps {
  title: ReactNode;
  actions?: ReactNode;
  subtitle?: ReactNode;
  ContainerProps?: StackPropsExtended;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  actions,
  subtitle,
  ContainerProps,
  ...props
}) => {
  return (
    <HStack w="100%" align="center" {...ContainerProps}>
      <VStack>
        <Typography variant="h2" component="div">
          {title}
        </Typography>

        <Typography variant="subtitle2" component="div" maxWidth="60ch">
          {subtitle}
        </Typography>
      </VStack>

      <HStack ml="auto" gap={2}>
        {actions}
      </HStack>
    </HStack>
  );
};

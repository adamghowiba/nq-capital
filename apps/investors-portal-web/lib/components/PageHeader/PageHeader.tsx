import { Typography } from '@mui/material';
import { HStack, StackPropsExtended } from '@nq-capital/nui';
import { FC, ReactNode } from 'react';

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

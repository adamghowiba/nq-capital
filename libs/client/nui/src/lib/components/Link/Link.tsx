import React, { FC } from 'react';
import NextLink from 'next/link';
import MUILink, { LinkProps as MUILinkProps } from '@mui/material/Link';

export interface NLinkProps extends MUILinkProps {}

export const NLink: FC<NLinkProps> = ({ children, ...props }) => {
  return (
    <MUILink component={NextLink} {...props}>
      {children}
    </MUILink>
  );
};

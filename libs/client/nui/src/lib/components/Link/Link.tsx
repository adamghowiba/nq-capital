import React, { FC } from 'react';
import NextLink from 'next/link';
import MUILink, { LinkProps as MUILinkProps } from '@mui/material/Link';

export interface NLinkProps extends Omit<MUILinkProps, 'href'> {
  href?: string | number | boolean;
}

export const NLink: FC<NLinkProps> = ({
  children,
  href,
  underline,
  ...props
}) => {
  return (
    <MUILink
      component={href ? NextLink : 'div'}
      href={href || ''}
      {...props}
      underline={href ? underline : 'none'}
    >
      {children}
    </MUILink>
  );
};

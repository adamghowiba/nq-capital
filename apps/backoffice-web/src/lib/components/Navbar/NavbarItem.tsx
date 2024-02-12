import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavbarItemProps extends PropsWithChildren {
  href: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ children, href, ...props }) => {
  return (
    <>
      <Link href={href}>
        <Button variant="text" sx={{ color: 'white', textTransform: 'unset' }}>
          {children}
        </Button>
      </Link>

      <style jsx>{``}</style>
    </>
  );
};

export default NavbarItem;

'use client';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import DContainer from '../DContainer/DContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({ ...props }) => {
  const pathname = usePathname();

  const NAVBAR_ITEMS: {
    name: string;
    href: string;
    isDisabled?: boolean;
    dropdown?: { name: string; href: string }[];
  }[] = [
    {
      name: 'Overview',
      href: '/',
    },
    {
      name: 'Tickets',
      href: '/tickets',
    },
    {
      name: 'Transactions',
      href: '/transactions',
    },
  ];

  const getActiveItem = () => {
    const activeItem = NAVBAR_ITEMS.find((item) => item.href === pathname);

    return activeItem;
  };

  const activeItem = getActiveItem();

  return (
    <>
      <Stack
        direction="row"
        bgcolor="white"
        height="48px"
        borderBottom="1px solid #EBEBEB"
      >
        <DContainer>
          <Stack direction="row" height="100%">
            {NAVBAR_ITEMS.map((item) => (
              <Link key={item.name} href={item.href}>
                <Stack
                  height="100%"
                  borderBottom="2px solid"
                  borderColor={
                    item.name === activeItem?.name ? 'black' : 'transparent'
                  }
                  alignItems="center"
                  justifyContent="center"
                  px={2}
                  color={item.name === activeItem?.name ? '#202020' : '#8D8D8D'}
                  sx={{
                    transition: 'color 0.1s linear',
                    '&:hover': {
                      color: 'black',
                    },
                    cursor: 'pointer',
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    <Typography
                      color={'inherit'}
                      fontSize="14px"
                      fontWeight="500"
                      lineHeight="1"
                    >
                      {item.name}
                    </Typography>
                  </Stack>
                </Stack>
              </Link>
            ))}
          </Stack>
        </DContainer>
      </Stack>
    </>
  );
};

export default Navbar;

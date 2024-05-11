import { HStack, StackPropsExtended, VStack } from '@nq-capital/nui';
import Image from 'next/image';
import React, { FC, ReactNode } from 'react';
import SidebarItem from './SidebarItem';
import { Typography } from '@mui/material';
import homeIcon from '@iconify/icons-fluent/home-16-filled';
import settingsIcon from '@iconify/icons-fluent/settings-16-filled';
import infoIcon from '@iconify/icons-fluent/info-16-filled';
import drawerIcon from '@iconify/icons-fluent/drawer-20-filled';
import creditCardIcon from '@iconify/icons-fluent/wallet-credit-card-16-filled';
import people20FilledIcon from '@iconify/icons-fluent/people-20-filled';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

export type SidebarProps = StackPropsExtended

const NAVBAR_ITEMS: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: 'Overview',
    href: '/',
    icon: <Icon icon={homeIcon} width={18} height={18} />,
  },
  {
    name: 'Tickets',
    href: '/tickets',
    icon: <Icon icon={drawerIcon} width={18} height={18} />,
  },
  {
    name: 'Investments',
    href: '/investments',
    icon: <Icon icon={creditCardIcon} width={18} height={18} />,
  },
  {
    name: 'Investors',
    href: '/investors',
    icon: <Icon icon={people20FilledIcon} width={18} height={18} />,
  },
];

const Sidebar: FC<SidebarProps> = ({ children, ...props }) => {
  const router = useRouter();

  const getActiveItem = () => {
    const activeItem = NAVBAR_ITEMS.find(
      (item) => item.href === router.pathname
    );

    return activeItem;
  };

  const activeItem = getActiveItem();

  return (
    <>
      <VStack h="full" width="272px" bgcolor="#F9F9F9" px={2}>
        <HStack gap={1.5} h="64px" px={1.5}>
          <Image
            src="/images/colored_logo.png"
            alt="logo"
            width={20}
            height={20}
          />
          <Typography
            fontSize="22px"
            color="#272962"
            variant="h2"
            fontWeight="600"
          >
            NQCapital
          </Typography>
        </HStack>

        <VStack gap={0.5} h="full">
          {NAVBAR_ITEMS.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              key={item.href}
              isActive={activeItem?.name === item.name}
            >
              {item.name}
            </SidebarItem>
          ))}

          <VStack gap="inherit" mt="auto" py={1.5}>
            <SidebarItem icon={<Icon icon={infoIcon} width={18} height={18} />} >
              Help
            </SidebarItem>

            <SidebarItem
              icon={<Icon icon={settingsIcon} width={18} height={18} />}
              href="/settings"
            >
              Settings
            </SidebarItem>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default Sidebar;

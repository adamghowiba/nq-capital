import arrowLeftIcon from '@iconify/icons-fluent/arrow-left-24-filled';
import { Icon } from '@iconify/react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import DContainer from '../../../components/DContainer/DContainer';
import {
  HStack,
  StackPropsExtended,
  VStack,
} from '../../../components/Stack/Stack';

export interface SettingsNavbarProps {
  maxWidth?: string | number;
  ContainerProps?: StackPropsExtended;
}

const NAVBAR_ITEMS: { label: string; key: string; href: string }[] = [
  { label: 'General', key: '', href: '/settings' },
  {
    label: 'Notifications',
    key: 'notifications',
    href: '/settings/notifications',
  },
  { label: 'Security', key: 'security', href: '/settings/security' },
  { label: 'Billing', key: 'billing', href: '/settings/billing' },
];

const SettingsNavbar: FC<SettingsNavbarProps> = ({
  maxWidth = '700px',
  ContainerProps,
  ...props
}) => {
  const router = useRouter();
  const path = router.pathname;

  const activeTab = useMemo(() => {
    const activeTab = NAVBAR_ITEMS.find((item) => path === item.href);

    return activeTab || NAVBAR_ITEMS[0];
  }, [path]);

  return (
    <>
      <VStack
        borderBottom="1px solid"
        borderColor="divider"
        width="100%"
        {...ContainerProps}
      >
        <DContainer width="100%" maxWidth={maxWidth} mx={'auto'}>
          <HStack mb={4}>
            <Button
              variant="text"
              startIcon={<Icon icon={arrowLeftIcon} width={15} height={15} />}
            >
              Back
            </Button>
          </HStack>

          <Typography mb={2} ml={2} variant="h2">
            {activeTab.label}
          </Typography>

          <Tabs value={activeTab.key}>
            {NAVBAR_ITEMS.map((item) => {
              const isActive = item.key === activeTab?.key;

              return (
                <Tab
                  LinkComponent={Link}
                  href={item.href}
                  label={item.label}
                  value={item.key}
                  key={item.key}
                  sx={{
                    fontWeight: isActive ? '600' : '500',
                    textTransform: 'capitalize',
                    color: isActive ? 'text.primary' : '#8D8D8D',
                  }}
                />
              );
            })}
          </Tabs>
        </DContainer>
      </VStack>
    </>
  );
};

export default SettingsNavbar;

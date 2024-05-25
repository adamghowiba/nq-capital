import { Typography } from '@mui/material';
import {
  HStack,
  StackPropsExtended,
  VStack
} from '@nq-capital/nui';
import { FC, ReactNode } from 'react';

export type SettingsTab =
  | 'general'
  | 'notifications'
  | 'security'
  | 'team'
  | 'billing';

export interface SettingsSidebarProps {
  activeTab?: SettingsTab;
  onTabChange?: (tab: SettingsTab) => void;
}

const SettingsSidebar: FC<SettingsSidebarProps> = ({
  activeTab,
  onTabChange,
  ...props
}) => {
  return (
    <>
      <VStack gap={2}>
        <Typography variant="h2" mb={2}>
          Settings
        </Typography>

        <VStack gap={0.5}>
          <Typography variant="h6">Profile</Typography>

          <SettingsSidebarItem
            isActive={activeTab === 'general'}
            onClick={() => onTabChange?.('general')}
          >
            General
          </SettingsSidebarItem>
          <SettingsSidebarItem
            isActive={activeTab === 'notifications'}
            onClick={() => onTabChange?.('notifications')}
          >
            Notifications
          </SettingsSidebarItem>
          <SettingsSidebarItem
            isActive={activeTab === 'security'}
            onClick={() => onTabChange?.('security')}
          >
            Security
          </SettingsSidebarItem>
        </VStack>

        <VStack gap={0.5}>
          <Typography variant="h6">Company</Typography>

          <SettingsSidebarItem
            onClick={() => onTabChange?.('team')}
            isActive={activeTab === 'team'}
          >
            Team
          </SettingsSidebarItem>
          <SettingsSidebarItem
            onClick={() => onTabChange?.('billing')}
            isActive={activeTab === 'billing'}
          >
            Billing
          </SettingsSidebarItem>
        </VStack>
      </VStack>
    </>
  );
};

interface SettingsSidebarItemProps extends StackPropsExtended {
  leftIcon?: ReactNode;
  isActive?: boolean;
}

const SettingsSidebarItem: FC<SettingsSidebarItemProps> = ({
  children,
  leftIcon,
  isActive,
  ...props
}) => {
  return (
    <HStack
      component="button"
      bgcolor={isActive ? '#F1F1F1' : 'transparent'}
      borderRadius="6px"
      px="12px"
      height="36px"
      aria-selected={isActive}
      className={isActive ? 'settings-sidebar-item--active' : ''}
      sx={{
        outline: 'none',
        appearance: 'none',
        margin: 0,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        color: isActive ? '#202020' : '#8D8D8D',
        '&:not(.settings-sidebar-item--active):hover': {
          bgcolor: 'rgb(241, 241, 241, 0.3)',
        },
      }}
      {...props}
    >
      {leftIcon}
      <Typography color="inherit" fontWeight="500">
        {children}
      </Typography>
    </HStack>
  );
};

export default SettingsSidebar;

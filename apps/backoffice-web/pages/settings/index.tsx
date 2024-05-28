import { Box } from '@nq-capital/nui';
import { Screen } from '../../lib/components/Screen/Screen';
import GeneralSettingsTab from '../../lib/modules/settings/components/GeneralSettings';
import SettingsSidebar, {
  SettingsTab,
} from '../../lib/modules/settings/components/SettingsSidebar';
import { ReactNode, useState } from 'react';
import NotificationSettingsScreen from '../../lib/modules/settings/components/NotificationSettings';
import { SecuritySettingsTab } from '../../lib/modules/settings/components/SecuritySettings';

const SettingsPage = ({ ...props }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  const SETTINGS_TAB_MAP: Record<SettingsTab, ReactNode> = {
    general: <GeneralSettingsTab />,
    notifications: <NotificationSettingsScreen />,
    security: <SecuritySettingsTab />,
    billing: <NotificationSettingsScreen />,
    team: <NotificationSettingsScreen />,
  };

  return (
    <>
      <Screen display="grid" gridTemplateColumns="200px auto" gap={10}>
        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <Box maxWidth="700px">{SETTINGS_TAB_MAP[activeTab]}</Box>
      </Screen>
    </>
  );
};

export default SettingsPage;

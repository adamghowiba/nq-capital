import React, { FC, PropsWithChildren } from 'react';
import SettingsNavbar from '../modules/settings/components/SettingsNavbar';
import Screen from '../components/Screen/Screen';

export interface SettingsLayoutProps extends PropsWithChildren {}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children, ...props }) => {
  const maxWidth: string | number = '900px';

  return (
    <>
      <SettingsNavbar maxWidth={maxWidth} />

      <Screen width="100%" maxWidth={maxWidth} mx="auto" gap={0}>
        {children}
      </Screen>
    </>
  );
};

export default SettingsLayout;

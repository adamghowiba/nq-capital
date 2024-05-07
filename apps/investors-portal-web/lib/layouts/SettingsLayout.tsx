import React, { FC, PropsWithChildren } from 'react';
import SettingsNavbar from '../modules/settings/components/SettingsNavbar';
import Screen from '../components/Screen/Screen';
import { Box } from '@mui/material';

export interface SettingsLayoutProps extends PropsWithChildren {}

const SettingsLayout: FC<SettingsLayoutProps> = ({ children, ...props }) => {
  const maxWidth: string | number = '900px';

  return (
    <>
      <Box height="100vh" overflow="hidden">
        <SettingsNavbar maxWidth={maxWidth} />

        <Box height="100%" overflow="auto">
          <Screen
            width="100%"
            maxWidth={maxWidth}
            mx="auto"
            gap={0}
            height="100%"
          >
            {children}
          </Screen>
        </Box>
      </Box>
    </>
  );
};

export default SettingsLayout;

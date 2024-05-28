import { Alert, AlertTitle } from '@mui/material';
import React, { FC } from 'react';

export interface NotificationSettingsScreenProps {}

const NotificationSettingsScreen: FC<NotificationSettingsScreenProps> = ({
  ...props
}) => {
  return (
    <>
      <Alert severity="warning">
        <AlertTitle>Section is under development</AlertTitle>
        We are currently working on this feature. Please check back later.
      </Alert>
    </>
  );
};

export default NotificationSettingsScreen;

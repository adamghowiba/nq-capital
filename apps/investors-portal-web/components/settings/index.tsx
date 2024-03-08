import { Dialog } from '@mui/material';
import { useState } from 'react';
import DialogTransition from '../utils/DialogTransition';
import SettingsHeader from './header';
import SettingsTopbar from './topbar';

export interface SettingsDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}
export default function SettingsDialog({
  closeDialog,
  isDialogOpen,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={closeDialog}
      TransitionComponent={DialogTransition}
    >
      <SettingsTopbar handleBack={closeDialog} />
      <SettingsHeader
        activeTab={activeTab}
        handleTabChange={(tabNumber) => setActiveTab(tabNumber)}
      />
    </Dialog>
  );
}

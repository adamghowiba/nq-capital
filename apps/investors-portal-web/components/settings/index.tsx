import { Box, Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import ListBanks from '../onboarding/listBanks';
import { NewBankData } from '../onboarding/newBankDialog';
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
  const [isLoadingBanks, setIsLoadingBanks] = useState<boolean>(false);
  const [bankAccounts, setBankAccounts] = useState<NewBankData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingBanks(true);
    //TODO: CALL API HERE TO LOAD BANKS
    setTimeout(() => {
      setIsLoadingBanks(false);
      setBankAccounts([]);
    }, 3000);
  }, []);

  function changeDefaultBank(bank: NewBankData) {
    setIsSubmitting(true);
    //TODO: CALL API HER TO CHANGE DEFAULT BANK AND MUTATE AFTERWARDS.
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  }

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
      <Box sx={{ paddingTop: 5, display: 'grid', justifyItems: 'center' }}>
        <Box sx={{ width: '604px' }}>
          <ListBanks
            bankAccounts={bankAccounts}
            isSubmitting={isSubmitting}
            handleChangeDefault={changeDefaultBank}
          />
        </Box>
      </Box>
    </Dialog>
  );
}

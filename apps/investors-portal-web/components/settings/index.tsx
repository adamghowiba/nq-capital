import { Box, Dialog } from '@mui/material';
import { useEffect, useState } from 'react';
import ListBanks from '../onboarding/listBanks';
import { NewBankData } from '../onboarding/newBankDialog';
import DialogTransition from '../utils/DialogTransition';
import General from './general';
import SettingsHeader, { ISettingsTabItem } from './header';
import Security from './security';
import SettingsTopbar from './topbar';

export interface SettingsDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export type SettingsActiveTab = 1 | 2 | 3 | 4;
export default function SettingsDialog({
  closeDialog,
  isDialogOpen,
}: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsActiveTab>(1);
  const [isLoadingBanks, setIsLoadingBanks] = useState<boolean>(false);
  const [bankAccounts, setBankAccounts] = useState<NewBankData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const settingsTabItems: ISettingsTabItem[] = [
    { position: 1, label: 'General' },
    { position: 2, label: 'Security' },
    { position: 3, label: 'Billing' },
  ];

  function close() {
    closeDialog();
    setActiveTab(1);
  }

  useEffect(() => {
    if (isDialogOpen && activeTab === 4) {
      setIsLoadingBanks(true);
      //TODO: CALL API HERE TO LOAD BANKS
      setTimeout(() => {
        setIsLoadingBanks(false);
        setBankAccounts([]);
      }, 3000);
    }
  }, [activeTab, isDialogOpen]);

  function changeDefaultBank(bankAccount: NewBankData) {
    setIsSubmitting(true);
    //TODO: CALL API HERE TO CHANGE DEFAULT BANK AND MUTATE AFTERWARDS.
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  }

  function createNewBankAccount(newBankAccount: NewBankData) {
    //TODO: CALL API HERE TO CREATE NEW BANK and mutate bank data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  }

  function deleteBankAccount(bankAccount: NewBankData) {
    //TODO: CALL API HERE TO DELETE PROVIDED BANK ACCOUNT and mutate bank data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  }

  function editBankAccount(bankAccount: NewBankData) {
    //TODO: CALL API HERE TO EDIT PROVIDED BANK ACCOUNT WITH PROVIDED DATA and mutate bank data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  }

  const tabComponent = {
    1: <General />,
    2: null,
    3: <Security />,
    4: (
      <ListBanks
        bankAccounts={bankAccounts}
        isSubmitting={isSubmitting}
        areAccountsLoading={isLoadingBanks}
        handleChangeDefault={changeDefaultBank}
        handleCreateNewAccount={createNewBankAccount}
        handleDeleteAccount={deleteBankAccount}
        handleEditAccount={editBankAccount}
      />
    ),
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={close}
      TransitionComponent={DialogTransition}
    >
      <SettingsTopbar handleBack={close} />
      <SettingsHeader
        tabItems={settingsTabItems}
        activeTab={activeTab}
        handleTabChange={(tabNumber) => setActiveTab(tabNumber)}
      />
      <Box sx={{ paddingTop: 5, display: 'grid', justifyItems: 'center' }}>
        <Box sx={{ width: '604px' }}>{tabComponent[activeTab]}</Box>
      </Box>
    </Dialog>
  );
}

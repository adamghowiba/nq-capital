import add from '@iconify/icons-fluent/add-24-filled';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import OneIcon from '../utils/OneIcon';
import BankCard from './bankCard';
import NewBankDialog, { NewBankData } from './newBankDialog';
import StepHeader from './stepHeader';

export interface FinancialInformationProps {
  data: NewBankData[];
  isSubmitting: boolean;
  onNext: (banks: NewBankData[]) => void;
  onBack: (banks: NewBankData[]) => void;
}
export default function FinancialInformation({
  data,
  onNext,
  onBack,
  isSubmitting,
}: FinancialInformationProps) {
  const [isNewBankDialogOpen, setIsNewBankDialogOpen] =
    useState<boolean>(false);

  const [bankAccounts, setBankAccounts] = useState<NewBankData[]>(data);
  const [editableBank, setEditableBank] = useState<NewBankData>();

  function handleAddBank(newBankAccount: NewBankData) {
    setBankAccounts((prev) => {
      if (bankAccounts.length === 0)
        return [
          { ...newBankAccount, temp_id: crypto.randomUUID(), is_default: true },
        ];
      return [...prev, { ...newBankAccount, temp_id: crypto.randomUUID() }];
    });
  }

  function handleDeleteBank(bank: NewBankData) {
    setBankAccounts((prev) => {
      const newBanks = prev.filter(({ temp_id }) => temp_id !== bank.temp_id);
      const defaultBank = newBanks.find(({ is_default }) => is_default);
      if (defaultBank) return newBanks;
      return newBanks.map((nb, index) => {
        if (index === 0) return { ...nb, is_default: true };
        return nb;
      });
    });
  }

  function handleEditBank(bank: NewBankData) {
    setBankAccounts((prev) => {
      return prev.map((nb) => {
        if (nb.temp_id === bank.temp_id) return bank;
        return nb;
      });
    });
  }

  function handleChangeDefault(newDefaultBank: NewBankData) {
    setBankAccounts((prev) => {
      return prev.map((bank) => {
        if (bank.temp_id === newDefaultBank.temp_id)
          return { ...newDefaultBank, is_default: true };
        return { ...bank, is_default: false };
      });
    });
  }

  return (
    <>
      <NewBankDialog
        data={editableBank}
        isDialogOpen={isNewBankDialogOpen || !!editableBank}
        closeDialog={() => {
          setEditableBank(undefined);
          setIsNewBankDialogOpen(false);
        }}
        handleAddBank={handleAddBank}
        handleEditBank={handleEditBank}
      />
      <Box width={500} sx={{ display: 'grid', rowGap: 5 }}>
        <StepHeader
          subtitle="Share details about your invested funds and preferred bank accounts."
          title="Financial Information"
        />
        <Box sx={{ display: 'grid', rowGap: 8 }}>
          <Box sx={{ display: 'grid', rowGap: 2 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                alignItems: 'center',
              }}
            >
              <Typography>Bank Details</Typography>
              {bankAccounts.length > 0 && (
                <OneIcon
                  icon={add}
                  title="Add new bank"
                  fontSize={16}
                  iconColor="#808080"
                  onClick={() => setIsNewBankDialogOpen(true)}
                  disabled={isSubmitting}
                />
              )}
            </Box>
            {bankAccounts.length === 0 ? (
              <Box
                component={Button}
                fullWidth
                size="large"
                onClick={() => setIsNewBankDialogOpen(true)}
                sx={{
                  border: '2px dotted #E4E4E4',
                  color: '#BBBBBB',
                  '&.MuiButtonBase-root': {
                    paddingTop: '22px',
                    paddingBottom: '22px',
                  },
                }}
              >
                Add Bank Detail
              </Box>
            ) : (
              bankAccounts.map((bank, index) => (
                <BankCard
                  key={index}
                  bank={bank}
                  disabled={isSubmitting}
                  onDelete={() => handleDeleteBank(bank)}
                  onEdit={() => setEditableBank(bank)}
                  onMakeDefault={() => handleChangeDefault(bank)}
                />
              ))
            )}
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => onBack(bankAccounts)}
            >
              Back
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => onNext(bankAccounts)}
              endIcon={
                isSubmitting && (
                  <CircularProgress color="primary" thickness={5} size={14} />
                )
              }
            >
              {isSubmitting ? 'Submitting' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import add from '@iconify/icons-fluent/add-24-filled';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import OneIcon from '../utils/OneIcon';
import BankCard from './bankCard';
import NewBankDialog, { NewBankData } from './newBankDialog';
import BankCardSkeleton from '../settings/bankCardSkeleton';

interface ListBanksProps {
  bankAccounts: NewBankData[];
  isSubmitting: boolean;
  handleDeleteAccount: (bank: NewBankData) => void;
  handleChangeDefault: (bank: NewBankData) => void;
  handleEditAccount: (bank: NewBankData) => void;
  handleCreateNewAccount: (bank: NewBankData) => void;
  areAccountsLoading?: boolean;
}
export default function ListBanks({
  bankAccounts = [],
  isSubmitting,
  areAccountsLoading: areBanksLoading = false,
  handleChangeDefault,
  handleDeleteAccount,
  handleEditAccount,
  handleCreateNewAccount,
}: ListBanksProps) {
  const [isNewBankDialogOpen, setIsNewBankDialogOpen] =
    useState<boolean>(false);
  const [editableBank, setEditableBank] = useState<NewBankData>();

  return (
    <>
      <NewBankDialog
        data={editableBank}
        isDialogOpen={isNewBankDialogOpen || !!editableBank}
        closeDialog={() => {
          setEditableBank(undefined);
          setIsNewBankDialogOpen(false);
        }}
        handleAddBank={handleCreateNewAccount}
        handleEditBank={handleEditAccount}
      />
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
        {areBanksLoading ? (
          [...new Array(3)].map((_, index) => <BankCardSkeleton key={index} />)
        ) : bankAccounts.length === 0 ? (
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
              onDelete={() => handleDeleteAccount(bank)}
              onEdit={() => setEditableBank(bank)}
              onMakeDefault={() => handleChangeDefault(bank)}
            />
          ))
        )}
      </Box>
    </>
  );
}

import add from '@iconify/icons-fluent/add-24-filled';
import { Box, Button, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { BankCard } from '../../../../lib/components/BankCard/BankCard';
import {
  BankCardMutationDialog,
  BankMutationDialogProps,
} from '../../../../lib/components/BankCardMutationDialog/BankMutationDialog';
import OneIcon from '../../../utils/OneIcon';
import { OnboardingSchema } from '../onboarding.schema';
import StepHeader from './StepHeader';

export interface FinancialInformationProps {}

export const FinancialInformation: FC<FinancialInformationProps> = ({
  ...props
}) => {
  const form = useFormContext<OnboardingSchema>();

  const bankAccounts = form.watch('bank_accounts') || [];

  const bankAccountForm = useFieldArray({
    name: 'bank_accounts',
    control: form.control,
  });

  const [isNewBankDialogOpen, setIsNewBankDialogOpen] = useState<
    undefined | (BankMutationDialogProps['mode'] & { index?: number })
  >(undefined);

  const handleSaveBankAccount: BankMutationDialogProps['onSave'] = (
    type,
    value
  ) => {
    if (type === 'create') {
      bankAccountForm.append(value);
    }

    if (type === 'edit' && isNewBankDialogOpen?.index !== undefined) {
      bankAccountForm.update(isNewBankDialogOpen.index, value);
    }

    setIsNewBankDialogOpen(undefined);
  };

  const setPrimaryBank = (index: number) => {
    bankAccounts.forEach((bank, i) => {
      bankAccountForm.update(i, {
        ...bank,
        is_primary: i === index ? true : false,
      });
    });
  };

  return (
    <>
      <BankCardMutationDialog
        mode={isNewBankDialogOpen}
        open={!!isNewBankDialogOpen}
        onClose={() => {
          setIsNewBankDialogOpen(undefined);
        }}
        onSave={handleSaveBankAccount}
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
                  onClick={() => setIsNewBankDialogOpen({ type: 'create' })}
                  // disabled={isSubmitting}
                />
              )}
            </Box>

            {bankAccounts.length === 0 ? (
              <Box
                component={Button}
                fullWidth
                size="large"
                onClick={() => setIsNewBankDialogOpen({ type: 'create' })}
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
                  accountNumber={bank.account_number}
                  bankName={bank.bank_name}
                  isDefault={bank.is_primary}
                  onDelete={() => bankAccountForm.remove(index)}
                  onEdit={() => {
                    console.log('Opening', bank.bank_name, index);

                    setIsNewBankDialogOpen({
                      type: 'edit',
                      data: bank,
                      index,
                    });
                  }}
                  onMakeDefault={() => setPrimaryBank(index)}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

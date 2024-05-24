import add12FilledIcon from '@iconify/icons-fluent/add-12-filled';
import { Icon } from '@iconify/react';
import { IconButton, Typography } from '@mui/material';
import { HStack, VStack } from '@nq-capital/nui';
import { useState } from 'react';
import { BankCard } from '../../lib/components/BankCard/BankCard';
import {
  BankCardMutationDialog,
  BankMutationDialogProps,
} from '../../lib/components/BankCardMutationDialog/BankMutationDialog';
import {
  CreateBankAccountInput,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useListBankAccountsQuery,
  useUpdateBankAccountMutation,
} from '../../lib/gql/gql-client';
import SettingsLayout from '../../lib/layouts/SettingsLayout';
import SettingsFieldGroup from '../../lib/modules/settings/components/SettingsFieldGroup';
import {
  InferGetInvestorSSP,
  getInvestorSSP,
} from '../../lib/modules/settings/get-investor-ssr';
import { NextPageWithLayout } from '../_app';

const BillingPage: NextPageWithLayout<InferGetInvestorSSP> = ({
  investor,
  ...props
}) => {
  const [bankAccountDialogState, setBankAccountState] = useState<
    BankMutationDialogProps['mode'] | undefined
  >(undefined);

  // TODO: Make sure listing is only for investor
  const bankAccountsQuery = useListBankAccountsQuery(
    {},
    { select: (data) => data.bankAccounts }
  );

  const deleteBankAccountMutation = useDeleteBankAccountMutation({
    onSuccess: () => {
      bankAccountsQuery.refetch();
    },
  });
  const createBankAccountMutation = useCreateBankAccountMutation({
    onSuccess: () => {
      bankAccountsQuery.refetch();
    },
  });

  const updateBankAccountMutation = useUpdateBankAccountMutation({
    onSuccess: () => {
      setBankAccountState(undefined);

      bankAccountsQuery.refetch();
    },
  });

  const handleBankSave: BankMutationDialogProps['onSave'] = (type, bank) => {
    const preparedData: CreateBankAccountInput = {
      account_holder_name: bank.account_holder_name,
      account_number: bank.account_number,
      bank_country: bank.bank_country,
      bank_name: bank.bank_name || 'Unknown',
      currency: bank.currency,
      bank_code: bank.bank_code,
      branch_address: bank.branch_address,
      branch_code: bank.branch_code,
      bsb_number: bank.bsb_number,
      iban: bank.iban,
      is_primary: bank.is_primary,
      nickname: bank.nickname,
      routing_number: bank.routing_number,
      sort_code: bank.sort_code,
      swift_code: bank.swift_code,
      type: bank.account_type,
    };

    if (type === 'create') {
      createBankAccountMutation.mutate({
        createBankAccountInput: preparedData,
      });
    }

    // TODO: Reenable editing
    // if (
    //   bankAccountDialogState?.type === 'edit' &&
    //   bankAccountDialogState.data.id
    // )
    //   updateBankAccountMutation.mutate({
    //     updateBankAccountInput: {
    //       id: bankAccountDialogState.data.id,
    //       ...preparedData,
    //     },
    //   });
  };

  return (
    <>
      <SettingsFieldGroup component="form">
        <HStack justify="space-between" align="center">
          <Typography>Bank Details</Typography>

          <IconButton onClick={() => setBankAccountState({ type: 'create' })}>
            <Icon icon={add12FilledIcon} width={18} height={18} />
          </IconButton>
        </HStack>

        <VStack gap={3}>
          {bankAccountsQuery.data?.map((bank) => {
            return (
              <BankCard
                key={bank.id}
                accountNumber={bank.account_number}
                bankName={bank.bank_name}
                isDefault={bank.is_primary}
                onDelete={() =>
                  deleteBankAccountMutation.mutate({ id: bank.id })
                }
                // onEdit={() => setBankAccountState({ type: 'edit', data: bank })}
                onEdit={() => null}
                onMakeDefault={() =>
                  updateBankAccountMutation.mutate({
                    updateBankAccountInput: {
                      id: bank.id,
                      is_primary: true,
                    },
                  })
                }
              />
            );
          })}
        </VStack>
      </SettingsFieldGroup>

      <BankCardMutationDialog
        open={!!bankAccountDialogState}
        mode={bankAccountDialogState}
        onSave={handleBankSave}
        onClose={() => setBankAccountState(undefined)}
      />
    </>
  );
};

export const getServerSideProps = getInvestorSSP();

BillingPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default BillingPage;

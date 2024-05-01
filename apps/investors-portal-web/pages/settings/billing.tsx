import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import NTextField from '../../lib/components/Fields/NTextField';
import { HStack, VStack } from '../../lib/components/Stack/Stack';
import { useUpdateInvestorMutation } from '../../lib/gql/gql-client';
import {
  InferGetInvestorSSP,
  getInvestorSSP,
} from '../../lib/modules/settings/get-investor-ssr';
import { SubmitHandler, useForm } from 'react-hook-form';
import SettingsLayout from '../../lib/layouts/SettingsLayout';
import SettingsFieldGroup from '../../lib/modules/settings/components/SettingsFieldGroup';
import {
  SecuritySettingsSchema,
  securitySettingsSchema,
} from '../../lib/modules/settings/settings.schema';
import { NextPageWithLayout } from '../_app';
import { IconButton, Typography } from '@mui/material';
import add12FilledIcon from '@iconify/icons-fluent/add-12-filled';
import { Icon } from '@iconify/react';
import { BankCard } from '../../lib/components/BankCard/BankCard';
import { BankCardMutationDialog } from 'apps/investors-portal-web/lib/components/BankCardMutationDialog/BankMutationDialog';

const BillingPage: NextPageWithLayout<InferGetInvestorSSP> = ({
  investor,
  ...props
}) => {
  const form = useForm<SecuritySettingsSchema>({
    defaultValues: {
      current_password: '',
      new_password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(securitySettingsSchema),
  });

  const investorMutation = useUpdateInvestorMutation();

  const handleValidSubmit: SubmitHandler<SecuritySettingsSchema> = (data) => {
    investorMutation.mutate({
      updateInvestorInput: {
        id: investor.id,
        password: data.new_password,
      },
    });
  };

  return (
    <>
      <SettingsFieldGroup component="form">
        <HStack justify="space-between" align="center">
          <Typography>Bank Details</Typography>

          <IconButton>
            <Icon icon={add12FilledIcon} width={18} height={18} />
          </IconButton>
        </HStack>

        <VStack gap={3}>
          <BankCard
            accountNumber={'1234567890'}
            bankName={'First Bank'}
            isDefault={true}
            onDelete={() => ''}
            onEdit={() => ''}
            onMakeDefault={() => ''}
          />

          <LoadingButton
            loading={investorMutation.isPending}
            variant="contained"
            color="primary"
            sx={{ mr: 'auto' }}
            onClick={form.handleSubmit(handleValidSubmit, console.error)}
          >
            Submit
          </LoadingButton>
        </VStack>
      </SettingsFieldGroup>

      <BankCardMutationDialog
        open={true}
        handleAddBank={() => ''}
        handleEditBank={() => ''}
      />
    </>
  );
};

export const getServerSideProps = getInvestorSSP();

BillingPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default BillingPage;

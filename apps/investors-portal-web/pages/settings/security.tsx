import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { NTextField, VStack } from '@nq-capital/nui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateInvestorMutation } from '../../lib/gql/gql-client';
import SettingsLayout from '../../lib/layouts/SettingsLayout';
import SettingsFieldGroup from '../../lib/modules/settings/components/SettingsFieldGroup';
import {
  InferGetInvestorSSP,
  getInvestorSSP,
} from '../../lib/modules/settings/get-investor-ssr';
import {
  SecuritySettingsSchema,
  securitySettingsSchema,
} from '../../lib/modules/settings/settings.schema';
import { NextPageWithLayout } from '../_app';
import { toast } from 'sonner';
import { parseApiError } from '../../lib/utils/error.utils';

const SecurityPage: NextPageWithLayout<InferGetInvestorSSP> = ({
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

  const investorMutation = useUpdateInvestorMutation({
    onMutate: () => {
      form.reset()
    }
  });

  const handleValidSubmit: SubmitHandler<SecuritySettingsSchema> = (data) => {
    const promise = investorMutation.mutateAsync({
      updateInvestorInput: {
        id: investor.id,
        password: data.new_password,
      },
    });

    toast.promise(promise, {
      loading: 'Updating password...',
      success: 'Password updated successfully',
      error: parseApiError
    });
  };

  return (
    <>
      <SettingsFieldGroup component="form">
        <VStack gap={3}>
          <NTextField
            name="current_password"
            control={form.control}
            label="Current Password"
            type="password"
          />

          <NTextField
            name="new_password"
            control={form.control}
            label="New Password"
            type="password"
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
    </>
  );
};

export const getServerSideProps = getInvestorSSP();

SecurityPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default SecurityPage;

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import NTextField from '../../lib/components/Fields/NTextField';
import { VStack } from '../../lib/components/Stack/Stack';
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

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { NTextField, VStack } from '@nq-capital/nui';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SecuritySettingsSchema,
  securitySettingsSchema,
} from '../settings.schema';
import SettingsFieldGroup from './SettingsFieldGroup';

export interface SecuritySettingsTabProps {}

export const SecuritySettingsTab: FC<SecuritySettingsTabProps> = ({
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

  const handleValidSubmit: SubmitHandler<SecuritySettingsSchema> = (data) => {};

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
            // loading={investorMutation.isPending}
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

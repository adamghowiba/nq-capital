import {
  AuthLayout,
  ForgotPasswordForm,
  ForgotPasswordFormProps,
  ForgotPasswordSchema,
} from '@nq-capital/nui';
import React, { FC, useState } from 'react';
import { toast } from 'sonner';
import { NextPageWithLayout } from './_app';
import { parseApiError } from '../lib/utils/error.utils';
import { useRequestPasswordResetMutation } from '../lib/gql/gql-client';

const ForgotPage: NextPageWithLayout = ({ ...props }) => {
  const [view, setView] = useState<ForgotPasswordFormProps['view']>('forgot');
  const requestPasswordRestMutation = useRequestPasswordResetMutation();

  const handleRequestPasswordReset = async (data: ForgotPasswordSchema) => {
    const promise = requestPasswordRestMutation.mutateAsync({
      requestPasswordResetInput: {
        email: data.email,
      },
    });

    toast.promise(promise, {
      loading: 'Sending reset email...',
      success: 'Reset email sent',
      error: parseApiError,
    });

    setView('sent');
  };

  return (
    <>
      <AuthLayout>
        <ForgotPasswordForm onSubmit={handleRequestPasswordReset} view={view} />
      </AuthLayout>
    </>
  );
};

ForgotPage.getLayout = (page) => page;

export default ForgotPage;

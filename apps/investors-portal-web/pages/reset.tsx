import { Alert, AlertTitle } from '@mui/material';
import { AuthLayout, ResetPasswordForm, ResetPasswordSchema } from '@nq-capital/nui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import {
  useRestPasswordMutation,
  useValidatePasswordResetTokenMutation,
} from '../lib/gql/gql-client';
import { parseApiError } from '../lib/utils/error.utils';
import { NextPageWithLayout } from './_app';

const ForgotPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ invalidToken, token, invalidTokenReason, ...props }) => {
  const router = useRouter();

  const resetPasswordMutation = useRestPasswordMutation({
    onSuccess: () => {
      router.push('/login');
    },
  });

  const handleRequestPasswordReset = async (data: ResetPasswordSchema) => {
    if (!token) return;

    const promise = resetPasswordMutation.mutateAsync({
      resetPasswordInput: {
        new_password: data.password,
        token: token,
      },
    });

    toast.promise(promise, {
      loading: 'Sending reset email...',
      success: 'Reset email sent',
      error: parseApiError,
    });
  };

  return (
    <>
      <AuthLayout>
        {invalidToken ? (
          <Alert severity="error">
            <AlertTitle>
              Password reset token is{' '}
              {invalidTokenReason === 'expired' ? 'expired' : 'invalid'}
            </AlertTitle>
            {invalidTokenReason === 'expired'
              ? 'The password reset token has expired. Please request a new password reset email.'
              : 'The password reset token is invalid. Please request a new password reset email.'}
          </Alert>
        ) : (
          <ResetPasswordForm
            onSubmit={handleRequestPasswordReset}
            isLoading={resetPasswordMutation.isPending}
          />
        )}
      </AuthLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  invalidTokenReason?: 'expired' | 'notFound' | 'notProvided';
  invalidToken: boolean;
  token: string;
}> = async (context) => {
  const token = context.query.token as string;

  if (!token || typeof token !== 'string')
    throw new Error(
      'Invalid link parameters. Please check the link sent in your email'
    );

  try {
    const response = await useValidatePasswordResetTokenMutation.fetcher({
      validatePasswordResetTokenInput: {
        token: token,
      },
    })();
  } catch (error) {
    return {
      props: {
        invalidToken: true,
        invalidTokenReason: 'expired',
        token: token,
      },
    };
  }

  return {
    props: {
      invalidToken: false,
      token: token,
    },
  };
};

ForgotPage.getLayout = (page) => page;

export default ForgotPage;

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertTitle, Box, Button } from '@mui/material';
import { HStack } from '@nq-capital/nui';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { VStack } from '../../lib/components/Stack/Stack';
import {
  InvitationStatus,
  useCreateInvestorMutation,
  useRetrieveInvitationQuery,
} from '../../lib/gql/gql-client';
import { FinancialInformation } from '../../lib/modules/onboarding/components/FinancialInformation';
import { IdentityVerification } from '../../lib/modules/onboarding/components/IdentityVerification';
import OnboardingTopbar from '../../lib/modules/onboarding/components/OnboardingTopbar';
import { PersonalInformation } from '../../lib/modules/onboarding/components/PersonalInformation';
import {
  OnboardingSchema,
  identitySchema,
  onboardingSchema,
  personalInformationSchema,
} from '../../lib/modules/onboarding/onboarding.schema';
import { transformBankSchemaToInput } from '../../lib/modules/onboarding/onboarding.utils';
import { NextPageWithLayout } from '../_app';

const FORM_STEPS = ['personal', 'identity', 'financial'] as const;
const TOTAL_STEPS = FORM_STEPS.length;
type FormStep = (typeof FORM_STEPS)[number];

const STEP_FIELDS_MAP: Record<FormStep, string[]> = {
  personal: Object.keys(personalInformationSchema.shape),
  identity: Object.keys(identitySchema.shape),
  financial: [],
};

const Onboarding: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const router = useRouter();

  const form = useForm<OnboardingSchema>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      mobile_number: '',
      national_id_number: '',
      national_id_number_expiry_date: '',
      national_id_number_issue_date: '',
      nationality: '',
      passport_number: '',
      passport_expiry_date: '',
      passport_issue_date: '',
      password: '',
      password_confirmation: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(onboardingSchema),
  });

  const currentStepIndex = FORM_STEPS.indexOf(currentStep);

  const createInvestorMutation = useCreateInvestorMutation({
    onSuccess: async () => {
      await router.push('/login');
    },
  });

  const handleNext = async () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex > TOTAL_STEPS) return;

    const stepFields = STEP_FIELDS_MAP[currentStep];

    const isValidCurrentStep = await form.trigger(stepFields as any);

    if (!isValidCurrentStep) return;

    setCurrentStep(FORM_STEPS[nextStepIndex]);
  };

  const handleBack = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex < 0) return;

    setCurrentStep(FORM_STEPS[previousStepIndex]);
  };

  const getStepComponent = (step: FormStep) => {
    if (step === 'identity') return <IdentityVerification />;

    if (step === 'financial') return <FinancialInformation />;

    return <PersonalInformation />;
  };

  const handleValidSubmission: SubmitHandler<OnboardingSchema> = (data) => {
    createInvestorMutation.mutate({
      createInvestorInput: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        mobile_number: data.mobile_number,
        national_id: data.national_id_number,
        password: data.password,
        invitation_code: props.isValid ? props.code : null,
        nationality: data.nationality,
        passport_number: data.passport_number,
        bank_accounts: data.bank_accounts?.map(transformBankSchemaToInput),
      },
    });
  };

  if (!props.isValid) {
    return (
      <VStack w="full" h="full" align="center" justify="center">
        <Alert severity="error">
          <AlertTitle>Invalid invitation code</AlertTitle>
          Please check the invitation email and try again.
        </Alert>
      </VStack>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        flexDirection: 'column',
        display: 'flex',
      }}
    >
      <OnboardingTopbar
        currentStep={currentStepIndex}
        totalSteps={TOTAL_STEPS}
        onBack={handleBack}
        onNext={handleNext}
      />

      <FormProvider {...form}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'auto',
            py: 5,
          }}
        >
          <Box
            sx={{
              maxWidth: '500px',
              width: '100%',
            }}
          >
            {getStepComponent(currentStep)}

            <HStack mt={4} w="full">
              {currentStepIndex !== 0 && (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleBack()}
                >
                  Back
                </Button>
              )}

              {currentStepIndex !== FORM_STEPS.length - 1 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  fullWidth
                >
                  Next
                </Button>
              )}

              {currentStepIndex == FORM_STEPS.length - 1 && (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={form.handleSubmit(
                    handleValidSubmission,
                    console.error
                  )}
                  fullWidth
                >
                  Submit
                </Button>
              )}
            </HStack>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<
  | {
      isValid: false;
      reason: 'invalid_code' | 'no_code' | 'success';
    }
  | { isValid: true; invitationStatus?: InvitationStatus; code: string }
> = async (context) => {
  const code = context.query?.invitation_code as string;

  if (!code)
    return {
      props: {
        reason: 'no_code',
        isValid: false,
      },
    };

  try {
    const invitation = await useRetrieveInvitationQuery.fetcher({
      code: code,
    })();

    if (invitation.invitation.status !== 'PENDING')
      return {
        props: {
          reason: 'invalid_code',
          isValid: false,
        },
      };

    return {
      props: {
        invitationStatus: invitation.invitation.status,
        isValid: true,
        code,
      },
    };
  } catch (error) {
    return {
      props: {
        reason: 'invalid_code',
        isValid: false,
      },
    };
  }
};

Onboarding.getLayout = (page) => page;

export default Onboarding;

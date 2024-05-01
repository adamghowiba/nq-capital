import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BankSchema } from '../../lib/components/BankCardMutationDialog/BankMutationDialog';
import FinancialInformation from '../../lib/modules/onboarding/components/FinancialInformation';
import IdentityVerification, {
  IdentityVerificationData,
} from '../../lib/modules/onboarding/components/IdentityVerification';
import PersonalInformation, {
  PersonalInformationData,
} from '../../lib/modules/onboarding/components/PersonalInformation';
import OnboardingTopbar from '../../lib/modules/onboarding/components/OnboardingTopbar';
import { NextPageWithLayout } from '../_app';

const FORM_STEPS = ['personal', 'identity', 'financial'] as const;
const TOTAL_STEPS = FORM_STEPS.length;
type FormStep = (typeof FORM_STEPS)[number];

const Onboarding: NextPageWithLayout = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('personal');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [personalData, setPersonalData] = useState<PersonalInformationData>();
  const [identityData, setIdentityData] = useState<IdentityVerificationData>();
  const [financialData, setFinancialData] = useState<BankSchema[]>([]);

  const currentStepIndex = FORM_STEPS.indexOf(currentStep);

  const { push } = useRouter();

  const handleNext = () => {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex > TOTAL_STEPS) return;

    setCurrentStep(FORM_STEPS[nextStepIndex]);
  };

  function handleBack() {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex < 0) return;

    setCurrentStep(FORM_STEPS[previousStepIndex]);
  }

  const submitOnboarding = (data: BankSchema[]) => {
    //TODO: call api here to submit onboarding data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      //TODO: move to onbaording route, indicating we're from onboarding to toast.
      push('/?fromOnboarding=true');
      //TODO: in case of failure, set financialData for usage during retry
      setFinancialData(data);
    }, 3000);
  };

  const getStepComponent = (step: FormStep) => {
    if (step === 'personal')
      return (
        <PersonalInformation
          data={personalData}
          onNext={(data) => {
            setPersonalData(data);
            handleNext();
          }}
        />
      );

    if (step === 'identity')
      return (
        <IdentityVerification
          onBack={(data) => {
            setIdentityData(data);
            handleBack();
          }}
          onNext={(data) => {
            setIdentityData(data);
            handleNext();
          }}
          data={identityData}
        />
      );

    if (step === 'financial') {
      return (
        <FinancialInformation
          data={financialData}
          isSubmitting={isSubmitting}
          onBack={(data) => {
            setFinancialData(data);
            handleBack();
          }}
          onNext={(data) => submitOnboarding(data)}
        />
      );
    }

    return (
      <PersonalInformation
        data={personalData}
        onNext={(data) => {
          setPersonalData(data);
          handleNext();
        }}
      />
    );
  };

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
        {getStepComponent(currentStep)}
      </Box>
    </Box>
  );
};

Onboarding.getLayout = (page) => page;

export default Onboarding;

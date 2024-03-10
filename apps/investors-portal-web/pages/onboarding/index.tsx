import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FinancialInformation from '../../components/onboarding/financialInformation';
import IdentityVerification, {
  IdentityVerificationData,
} from '../../components/onboarding/identityVerification';
import { NewBankData } from '../../components/onboarding/newBankDialog';
import PersonalInformation, {
  PersonalInformationData,
} from '../../components/onboarding/personalInformation';
import OnboardingTopbar from '../../components/onboarding/topbar';

type OnboardingStep = 1 | 2 | 3;
export default function Onboarding() {
  const { push } = useRouter();

  const [personalData, setPersonnalData] = useState<PersonalInformationData>();
  const [identityData, setIdentityData] = useState<IdentityVerificationData>();
  const [financialData, setFinancialData] = useState<NewBankData[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  function submitOnboarding(data: NewBankData[]) {
    //TODO: call api here to submit onboarding data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      //TODO: move to onbaording route, indicating we're from onboarding to toast.
      push('/?fromOnboarding=true');
      //TODO: in case of failure, set financialData for usage during retry
      setFinancialData(data);
    }, 3000);
  }

  const stepComponents: Record<OnboardingStep, JSX.Element> = {
    1: (
      <PersonalInformation
        data={personalData}
        onNext={(data) => {
          setPersonnalData(data);
          handleNext(1);
        }}
      />
    ),
    2: (
      <IdentityVerification
        onBack={(data) => {
          setIdentityData(data);
          handleBack();
        }}
        onNext={(data) => {
          setIdentityData(data);
          handleNext(2);
        }}
        data={identityData}
      />
    ),
    3: (
      <FinancialInformation
        data={financialData}
        isSubmitting={isSubmitting}
        onBack={(data) => {
          setFinancialData(data);
          handleBack();
        }}
        onNext={(data) => submitOnboarding(data)}
      />
    ),
  };

  const totalSteps = Object.keys(stepComponents).length;
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(1);

  function getNextStep(
    activeStep: OnboardingStep,
    totalSteps: number
  ): OnboardingStep {
    if (activeStep < totalSteps) return (activeStep + 1) as OnboardingStep;
    return activeStep;
  }

  /**
   * This function handles the movement from one onboarding step to another
   * it can be called from with the individual forms during form submission
   * or through navigation items on the onboarding topbar
   *
   * when called through a form submission:
   * 1. we do required verifications to update maxAccessibleStep.
   * 2. we verify that we we're within step bounds and move to next step.
   *
   * When called through topbar navigation,
   * we verify that we have acess to that step before moving to it
   *
   * @param {number=} formStep - the step of the form thats calling next
   */
  function handleNext(formStep?: number): void {
    setCurrentStep((activeStep) => {
      if (typeof formStep === 'number') {
        if (maxAccessibleStep <= formStep) setMaxAccessibleStep(formStep + 1);
        return getNextStep(activeStep, totalSteps);
      } else {
        if (maxAccessibleStep >= activeStep + 1)
          return getNextStep(activeStep, totalSteps);
        return activeStep;
      }
    });
  }

  function handleBack() {
    setCurrentStep((activeStep: OnboardingStep) => {
      if (activeStep > 1) return (activeStep - 1) as OnboardingStep;
      return activeStep;
    });
  }

  return (
    <Box
      sx={{
        height: '100svh',
        display: 'grid',
        alignContent: 'start',
        rowGap: '100px',
      }}
    >
      <OnboardingTopbar
        currentStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        totalSteps={totalSteps}
      />
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          alignContent: 'start',
        }}
      >
        {stepComponents[currentStep]}
      </Box>
    </Box>
  );
}

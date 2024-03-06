import { Box } from '@mui/material';
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

export default function Onboarding() {
  const totalSteps = 3;
  const [currentStep, setCurrentStep] = useState<number>(1);

  function handleNext() {
    setCurrentStep((activeStep) => {
      if (activeStep < totalSteps) return activeStep + 1;
      return activeStep;
    });
  }

  function handleBack() {
    setCurrentStep((activeStep) => {
      if (activeStep > 1) return activeStep - 1;
      return activeStep;
    });
  }

  const [personalData, setPersonnalData] = useState<PersonalInformationData>();
  const [identityData, setIdentityData] = useState<IdentityVerificationData>();
  const [financialData, setFinancialData] = useState<NewBankData[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  function submitOnboarding(data: NewBankData[]) {
    //TODO: call api here to submit onboarding data
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      //TODO: in case of failure, set financialData for usage during retry
      setFinancialData(data);
    }, 3000);
  }

  function getStepComponent(activeStep: number) {
    switch (activeStep) {
      case 1:
        return (
          <PersonalInformation
            data={personalData}
            onNext={(data) => {
              setPersonnalData(data);
              handleNext();
            }}
          />
        );
      case 2:
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
      case 3:
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
      default:
        return (
          <PersonalInformation
            data={personalData}
            onNext={(data) => {
              setPersonnalData(data);
              handleNext();
            }}
          />
        );
    }
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
        {getStepComponent(currentStep)}
      </Box>
    </Box>
  );
}

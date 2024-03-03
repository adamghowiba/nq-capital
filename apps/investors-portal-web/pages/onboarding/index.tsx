import { Box, Typography } from '@mui/material';
import { nationalities } from '../../lib/nationalities';
import OnboardingTopbar from '../../components/onboarding/topbar';
import { useState } from 'react';
import PersonalInformation from '../../components/onboarding/personalInformation';

export default function Onboarding() {
  const totalSteps = 6;
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
        <PersonalInformation />
      </Box>
    </Box>
  );
}

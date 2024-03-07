import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OneSnackbar from '../components/utils/OneSnackbar';

export function Index() {
  const [isOnboardingToastOpen, setIsOnboardingToastOpen] =
    useState<boolean>(false);

  const {
    query: { fromOnboarding },
  } = useRouter();

  useEffect(() => {
    if (fromOnboarding) setIsOnboardingToastOpen(true);
  }, [fromOnboarding]);
  return (
    <>
      <OneSnackbar
        close={() => setIsOnboardingToastOpen(false)}
        isOpen={isOnboardingToastOpen}
        message="Onboarding Complete"
      />

      <Box height={'100%'}>

      </Box>
    </>
  );
}

export default Index;

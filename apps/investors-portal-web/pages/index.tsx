import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OneSnackbar from '../components/utils/OneSnackbar';
import { gql } from 'graphql-request';
import { ListFundsDocument, useListUsersQuery } from '../lib/gql/gql-client';
// import { useGql } from '../lib/hooks/use-gql';

const ListFunds = gql`
  query ListFunds {
    funds {
      id
      name
    }
  }
`


const Index = () => {
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

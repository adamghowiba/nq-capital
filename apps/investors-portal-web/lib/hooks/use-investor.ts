import { useMeInvestorQuery, useMeQuery } from '../gql/gql-client';

/**
 * Hook to get the investors current session, if any
 */
export const useInvestor = () => {
  const query = useMeInvestorQuery(
    {},
    {
      staleTime: 1000 * 60 * 5, // 5 minutes,
    }
  );

  return {
    isLoading: query.isLoading,
    isPending: query.isPending,
    error: query.error,
    data: query.data?.meInvestor,
    refetch: query.refetch,
  };
};

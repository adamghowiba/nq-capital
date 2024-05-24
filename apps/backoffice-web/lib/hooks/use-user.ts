import { useMeUserQuery } from '../gql/gql-client';

/**
 * Hook to get the investors current session, if any
 */
export const useUser = () => {
  const query = useMeUserQuery(
    {},
    {
      staleTime: 1000 * 60 * 5, // 5 minutes,
    }
  );

  return {
    isLoading: query.isLoading,
    isPending: query.isPending,
    error: query.error,
    data: query.data?.meUser,
    refetch: query.refetch,
  };
};

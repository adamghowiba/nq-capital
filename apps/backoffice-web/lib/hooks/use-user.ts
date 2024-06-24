import { useEffect } from 'react';
import { useMeUserQuery } from '../gql/gql-client';
import { useRouter } from 'next/router';

const PUBLIC_PATHS = ['/login', '/signup', '/forgot-password'];

/**
 * Hook to get the investors current session, if any
 */
export const useUser = () => {
  const router = useRouter();

  const query = useMeUserQuery(
    {},
    {
      staleTime: 1000 * 60 * 5, // 5 minutes,
      retry: false,
    }
  );

  useEffect(() => {
    if (
      !query.data?.meUser &&
      !query.isLoading &&
      !PUBLIC_PATHS.includes(router.pathname)
    ) {
      router.push('/login');
    }
  }, [query.data?.meUser, query.isLoading, router.pathname]);

  return {
    isLoading: query.isLoading,
    isPending: query.isPending,
    error: query.error,
    data: query.data?.meUser,
    refetch: query.refetch,
  };
};

import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import request, { Variables } from 'graphql-request';
import { IsEmptyObject } from 'type-fest';

// Implementation
export function useGql<
  TResult,
  TVariables extends Variables,
  TQueryFnData = TResult,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...options: IsEmptyObject<TVariables> extends true
    ?
        | [
            null | undefined,
            Omit<
              UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
              'queryKey'
            >
          ]
        | [null | undefined]
        | []
    :
        | readonly [
            TVariables,
            Omit<
              UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
              'queryKey'
            >
          ]
        | [TVariables]
) {
  const queryKey = options?.[0]
    ? [(document.definitions[0] as any).name.value, options?.[0]]
    : [(document.definitions[0] as any).name.value];

  const queryOptions = options?.[1] ?? {};

  return useQuery<TQueryFnData, TError, TData>({
    // @ts-expect-error Cannot find viable way to assert query fn data
    queryFn: async ({ queryKey }) =>
      request<TResult, TVariables>(
        'http://localhost:5000/graphql',
        document,
        // @ts-expect-error Cannot find viable way to assert query variable type
        queryKey[1] ? queryKey[1] : undefined
      ),
    ...queryOptions,
    queryKey: queryKey,
  });
}

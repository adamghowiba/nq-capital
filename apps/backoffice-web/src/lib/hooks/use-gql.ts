import request from 'graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  DefaultError,
  QueryKey,
  UseQueryOptions,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';
import { HasRequiredKeys } from 'type-fest';

type CustomQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  'queryKey' | 'queryFn'
>;

// Utility type to check if an object type is empty
type IsEmptyType<T> = keyof T extends never ? true : false;

// Function overloads
export function useGql<TResult, TVariables extends object>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  options?: CustomQueryOptions
): UseQueryResult<TResult>;

export function useGql<TResult>(
  document: TypedDocumentNode<TResult, {}>,
  options?: CustomQueryOptions
): UseQueryResult<TResult>;

// Implementation
export function useGql<TResult, TVariables extends object>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  options?: CustomQueryOptions
): UseQueryResult<TResult> {
  // Implementation remains unchanged, TypeScript will enforce the correct usage based on the function overloads
  return useQuery<TResult>({
    queryFn: async ({ queryKey }) =>
      request<TResult, TVariables>(
        'http://localhost:5000/graphql',
        document,
        queryKey[1] ? queryKey[1] : undefined
      ),
    queryKey: [(document.definitions[0] as any).name.value, variables],
  });
}

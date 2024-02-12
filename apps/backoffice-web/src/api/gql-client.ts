import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"},"credentials":"include"}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile_number?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserEntity;
  removeUser: UserEntity;
  updateUser: UserEntity;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginatedUserEntity = {
  __typename?: 'PaginatedUserEntity';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<UserEntity>>;
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  user: UserEntity;
  users: PaginatedUserEntity;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile_number?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  avatar?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  /** Incremental based user ID */
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile_number?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updated_at: Scalars['DateTime']['output'];
};

/** Role of a given user */
export enum UserRole {
  Admin = 'ADMIN',
  Manager = 'MANAGER'
}

export type ListUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUserEntity', data?: Array<{ __typename?: 'UserEntity', id: number, middle_name?: string | null, avatar?: string | null, mobile_number?: string | null, last_name: string }> | null } };

export type ListReqUsersQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type ListReqUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUserEntity', data?: Array<{ __typename?: 'UserEntity', id: number, middle_name?: string | null, avatar?: string | null, mobile_number?: string | null, last_name: string }> | null } };



export const ListUsersDocument = `
    query ListUsers($limit: Int, $page: Int) {
  users(limit: $limit, page: $page) {
    data {
      id
      middle_name
      avatar
      mobile_number
      last_name
    }
  }
}
    `;

export const useListUsersQuery = <
      TData = ListUsersQuery,
      TError = unknown
    >(
      variables?: ListUsersQueryVariables,
      options?: Omit<UseQueryOptions<ListUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListUsersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListUsers'] : ['ListUsers', variables],
    queryFn: fetcher<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, variables),
    ...options
  }
    )};

useListUsersQuery.getKey = (variables?: ListUsersQueryVariables) => variables === undefined ? ['ListUsers'] : ['ListUsers', variables];


useListUsersQuery.fetcher = (variables?: ListUsersQueryVariables) => fetcher<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, variables);

export const ListReqUsersDocument = `
    query ListReqUsers($limit: Int!, $page: Int!) {
  users(limit: $limit, page: $page) {
    data {
      id
      middle_name
      avatar
      mobile_number
      last_name
    }
  }
}
    `;

export const useListReqUsersQuery = <
      TData = ListReqUsersQuery,
      TError = unknown
    >(
      variables: ListReqUsersQueryVariables,
      options?: Omit<UseQueryOptions<ListReqUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListReqUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListReqUsersQuery, TError, TData>(
      {
    queryKey: ['ListReqUsers', variables],
    queryFn: fetcher<ListReqUsersQuery, ListReqUsersQueryVariables>(ListReqUsersDocument, variables),
    ...options
  }
    )};

useListReqUsersQuery.getKey = (variables: ListReqUsersQueryVariables) => ['ListReqUsers', variables];


useListReqUsersQuery.fetcher = (variables: ListReqUsersQueryVariables) => fetcher<ListReqUsersQuery, ListReqUsersQueryVariables>(ListReqUsersDocument, variables);

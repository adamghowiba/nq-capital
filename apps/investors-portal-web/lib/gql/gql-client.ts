import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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
  /** Prisma Decimal Scalar */
  Decimal: { input: any; output: any; }
};

export type AddFundInvestorsInput = {
  id: Scalars['Int']['input'];
  initial_investment: Scalars['Float']['input'];
  investor_id: Scalars['Int']['input'];
};

export type AddressEntity = {
  __typename?: 'AddressEntity';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  country_code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  postal_zip_code?: Maybe<Scalars['String']['output']>;
  state_province: Scalars['String']['output'];
  street: Scalars['String']['output'];
  street_2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Float']['output'];
};

export type AdjustFundInput = {
  adjusted_by_user_id: Scalars['Int']['input'];
  /**
   * Amount to adjust the fund by. Can be a negative
   * or positive value.
   */
  amount: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fund_id: Scalars['Int']['input'];
};

export type BankAccountEntity = {
  __typename?: 'BankAccountEntity';
  account_holder_name: Scalars['String']['output'];
  account_number: Scalars['String']['output'];
  bank_code?: Maybe<Scalars['String']['output']>;
  bank_country: Scalars['String']['output'];
  bank_name: Scalars['String']['output'];
  branch_address?: Maybe<Scalars['String']['output']>;
  branch_code?: Maybe<Scalars['String']['output']>;
  bsb_number?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  iban?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  investor_id: Scalars['Int']['output'];
  is_primary: Scalars['Boolean']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  routing_number?: Maybe<Scalars['String']['output']>;
  sort_code?: Maybe<Scalars['String']['output']>;
  swift_code?: Maybe<Scalars['String']['output']>;
  type?: Maybe<BankAccountType>;
  updated_at: Scalars['DateTime']['output'];
};

export type BankAccountType =
  | 'CHECKING'
  | 'SAVINGS';

export type BankAccountWithoutInvestorInput = {
  account_holder_name: Scalars['String']['input'];
  account_number: Scalars['String']['input'];
  bank_code?: InputMaybe<Scalars['String']['input']>;
  bank_country: Scalars['String']['input'];
  bank_name: Scalars['String']['input'];
  branch_address?: InputMaybe<Scalars['String']['input']>;
  branch_code?: InputMaybe<Scalars['String']['input']>;
  bsb_number?: InputMaybe<Scalars['String']['input']>;
  currency: Scalars['String']['input'];
  iban?: InputMaybe<Scalars['String']['input']>;
  is_primary?: InputMaybe<Scalars['Boolean']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  routing_number?: InputMaybe<Scalars['String']['input']>;
  sort_code?: InputMaybe<Scalars['String']['input']>;
  swift_code?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountType>;
};

export type CreateFundInput = {
  initial_balance?: InputMaybe<Scalars['Int']['input']>;
  /** Investor fund */
  investors?: InputMaybe<Array<CreateNestedInvestorFundWithoutFundInput>>;
  name: Scalars['String']['input'];
};

export type CreateInvestorInput = {
  account_status?: InputMaybe<InvestorAccountStatus>;
  address_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  bank_accounts?: InputMaybe<Array<BankAccountWithoutInvestorInput>>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_tax_id?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  /** Investor first name */
  first_name: Scalars['String']['input'];
  is_accredited?: InputMaybe<Scalars['Boolean']['input']>;
  last_name: Scalars['String']['input'];
  /** Investor middle name */
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile_number?: InputMaybe<Scalars['String']['input']>;
  national_id?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  passport_number?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNestedInvestorFundWithoutFundInput = {
  initial_investment: Scalars['Float']['input'];
  investor_id: Scalars['Int']['input'];
};

export type CreateTransactionInput = {
  amount: Scalars['Int']['input'];
  balance_after: Scalars['Int']['input'];
  currency_code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['Int']['input']>;
  external_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  status: TransactionStatus;
  type: TransactionType;
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

export type FundEntity = {
  __typename?: 'FundEntity';
  balance: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type InvestorAccountStatus =
  | 'ACTIVE'
  | 'DISABLED'
  | 'ONBOARDING';

export type InvestorEntity = {
  __typename?: 'InvestorEntity';
  account_status?: Maybe<InvestorAccountStatus>;
  address?: Maybe<AddressEntity>;
  address_id?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bank_accounts?: Maybe<Array<BankAccountEntity>>;
  company_name?: Maybe<Scalars['String']['output']>;
  company_tax_id?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  date_of_birth?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_accredited?: Maybe<Scalars['Boolean']['output']>;
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  mobile_number?: Maybe<Scalars['String']['output']>;
  national_id?: Maybe<Scalars['String']['output']>;
  nationality?: Maybe<Scalars['String']['output']>;
  passport_number?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type InvestorFundEntity = {
  __typename?: 'InvestorFundEntity';
  balance: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  fund: FundEntity;
  fund_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  initial_investment: Scalars['Int']['output'];
  invested_amount: Scalars['Float']['output'];
  investor: InvestorEntity;
  investor_balance_in_fund: Scalars['Float']['output'];
  investor_id: Scalars['Int']['output'];
  stake_percentage: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFundInvestors: FundEntity;
  adjustFund: FundEntity;
  createFund: FundEntity;
  createInvestor: InvestorEntity;
  createTransaction: TransactionEntity;
  createUser: UserEntity;
  removeFund: FundEntity;
  removeInvestor: InvestorEntity;
  removeTransaction: TransactionEntity;
  removeUser: UserEntity;
  updateFund: FundEntity;
  updateInvestor: InvestorEntity;
  updateTransaction: TransactionEntity;
  updateUser: UserEntity;
};


export type MutationAddFundInvestorsArgs = {
  addFundInvestorsInput: AddFundInvestorsInput;
};


export type MutationAdjustFundArgs = {
  adjustFundInput: AdjustFundInput;
};


export type MutationCreateFundArgs = {
  createFundInput: CreateFundInput;
};


export type MutationCreateInvestorArgs = {
  createInvestorInput: CreateInvestorInput;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveFundArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveInvestorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateFundArgs = {
  updateFundInput: UpdateFundInput;
};


export type MutationUpdateInvestorArgs = {
  updateInvestorInput: UpdateInvestorInput;
};


export type MutationUpdateTransactionArgs = {
  updateTransactionInput: UpdateTransactionInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type PaginatedInvestorFundEntity = {
  __typename?: 'PaginatedInvestorFundEntity';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<InvestorFundEntity>>;
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
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
  fund: FundEntity;
  funds: Array<FundEntity>;
  investor: InvestorEntity;
  investorFund: Array<InvestorFundEntity>;
  investorFunds: PaginatedInvestorFundEntity;
  investors: Array<InvestorEntity>;
  transaction: TransactionEntity;
  transactions: Array<TransactionEntity>;
  user: UserEntity;
  users: PaginatedUserEntity;
};


export type QueryFundArgs = {
  id: Scalars['Int']['input'];
};


export type QueryInvestorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryInvestorFundArgs = {
  id: Scalars['Int']['input'];
};


export type QueryInvestorFundsArgs = {
  fundId?: InputMaybe<Scalars['Int']['input']>;
  investorId?: InputMaybe<Scalars['Int']['input']>;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
};

export type TransactionEntity = {
  __typename?: 'TransactionEntity';
  amount: Scalars['Int']['output'];
  balance_after: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  currency_code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  status: TransactionStatus;
  type: TransactionType;
  updated_at: Scalars['DateTime']['output'];
};

export type TransactionStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'FAILED'
  | 'PENDING'
  | 'REVERSED';

export type TransactionType =
  | 'ADJUSTMENT'
  | 'DEPOSIT'
  | 'FEE'
  | 'REFUND'
  | 'WITHDRAWAL';

export type UpdateFundInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateInvestorInput = {
  account_status?: InputMaybe<InvestorAccountStatus>;
  address_id?: InputMaybe<Scalars['Int']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_tax_id?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  /** Investor first name */
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  is_accredited?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  /** Investor middle name */
  middle_name?: InputMaybe<Scalars['String']['input']>;
  mobile_number?: InputMaybe<Scalars['String']['input']>;
  national_id?: InputMaybe<Scalars['String']['input']>;
  nationality?: InputMaybe<Scalars['String']['input']>;
  passport_number?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  balance_after?: InputMaybe<Scalars['Int']['input']>;
  currency_code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['Int']['input']>;
  external_id?: InputMaybe<Scalars['String']['input']>;
  fee?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['Int']['input'];
  status?: InputMaybe<TransactionStatus>;
  type?: InputMaybe<TransactionType>;
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
export type UserRole =
  | 'ADMIN'
  | 'MANAGER';

export type ListTestInvestorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTestInvestorsQuery = { __typename?: 'Query', investors: Array<{ __typename?: 'InvestorEntity', id: number, company_name?: string | null, address_id?: number | null, address?: { __typename?: 'AddressEntity', id: number, verified: number, street: string, latitude: number } | null }> };

export type RetrieveInvestorQueryVariables = Exact<{
  investor_id: Scalars['Int']['input'];
}>;


export type RetrieveInvestorQuery = { __typename?: 'Query', investor: { __typename?: 'InvestorEntity', id: number, company_name?: string | null } };

export type CreateCoolInvestorMutationVariables = Exact<{
  createInvestorInput: CreateInvestorInput;
}>;


export type CreateCoolInvestorMutation = { __typename?: 'Mutation', createInvestor: { __typename?: 'InvestorEntity', id: number, company_name?: string | null, company_tax_id?: string | null } };

export type TransactionsAllFragmentFragment = { __typename?: 'TransactionEntity', id: number, type: TransactionType, amount: number, currency_code: string, balance_after: number, description?: string | null, fee?: number | null, external_id?: string | null, status: TransactionStatus, updated_at: any, created_at: any };

export type ListTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'TransactionEntity', id: number, type: TransactionType, amount: number, currency_code: string, balance_after: number, description?: string | null, fee?: number | null, external_id?: string | null, status: TransactionStatus, updated_at: any, created_at: any }> };

export type ListUsersQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRole>;
}>;


export type ListUsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUserEntity', data?: Array<{ __typename?: 'UserEntity', id: number, first_name: string, last_name: string, middle_name?: string | null, avatar?: string | null, mobile_number?: string | null, role: UserRole, email: string, created_at: any, updated_at: any }> | null } };


export const TransactionsAllFragmentFragmentDoc = `
    fragment TransactionsAllFragment on TransactionEntity {
  id
  type
  amount
  currency_code
  balance_after
  description
  fee
  external_id
  status
  updated_at
  created_at
}
    `;
export const ListTestInvestorsDocument = `
    query ListTestInvestors {
  investors {
    id
    company_name
    address_id
    address {
      id
      verified
      street
      latitude
    }
  }
}
    `;

export const useListTestInvestorsQuery = <
      TData = ListTestInvestorsQuery,
      TError = unknown
    >(
      variables?: ListTestInvestorsQueryVariables,
      options?: Omit<UseQueryOptions<ListTestInvestorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListTestInvestorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListTestInvestorsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListTestInvestors'] : ['ListTestInvestors', variables],
    queryFn: fetcher<ListTestInvestorsQuery, ListTestInvestorsQueryVariables>(ListTestInvestorsDocument, variables),
    ...options
  }
    )};

useListTestInvestorsQuery.document = ListTestInvestorsDocument;

useListTestInvestorsQuery.getKey = (variables?: ListTestInvestorsQueryVariables) => variables === undefined ? ['ListTestInvestors'] : ['ListTestInvestors', variables];


useListTestInvestorsQuery.fetcher = (variables?: ListTestInvestorsQueryVariables) => fetcher<ListTestInvestorsQuery, ListTestInvestorsQueryVariables>(ListTestInvestorsDocument, variables);

export const RetrieveInvestorDocument = `
    query RetrieveInvestor($investor_id: Int!) {
  investor(id: $investor_id) {
    id
    company_name
  }
}
    `;

export const useRetrieveInvestorQuery = <
      TData = RetrieveInvestorQuery,
      TError = unknown
    >(
      variables: RetrieveInvestorQueryVariables,
      options?: Omit<UseQueryOptions<RetrieveInvestorQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RetrieveInvestorQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RetrieveInvestorQuery, TError, TData>(
      {
    queryKey: ['RetrieveInvestor', variables],
    queryFn: fetcher<RetrieveInvestorQuery, RetrieveInvestorQueryVariables>(RetrieveInvestorDocument, variables),
    ...options
  }
    )};

useRetrieveInvestorQuery.document = RetrieveInvestorDocument;

useRetrieveInvestorQuery.getKey = (variables: RetrieveInvestorQueryVariables) => ['RetrieveInvestor', variables];


useRetrieveInvestorQuery.fetcher = (variables: RetrieveInvestorQueryVariables) => fetcher<RetrieveInvestorQuery, RetrieveInvestorQueryVariables>(RetrieveInvestorDocument, variables);

export const CreateCoolInvestorDocument = `
    mutation CreateCoolInvestor($createInvestorInput: CreateInvestorInput!) {
  createInvestor(createInvestorInput: $createInvestorInput) {
    id
    company_name
    company_tax_id
  }
}
    `;

export const useCreateCoolInvestorMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateCoolInvestorMutation, TError, CreateCoolInvestorMutationVariables, TContext>) => {
    
    return useMutation<CreateCoolInvestorMutation, TError, CreateCoolInvestorMutationVariables, TContext>(
      {
    mutationKey: ['CreateCoolInvestor'],
    mutationFn: (variables?: CreateCoolInvestorMutationVariables) => fetcher<CreateCoolInvestorMutation, CreateCoolInvestorMutationVariables>(CreateCoolInvestorDocument, variables)(),
    ...options
  }
    )};


useCreateCoolInvestorMutation.fetcher = (variables: CreateCoolInvestorMutationVariables) => fetcher<CreateCoolInvestorMutation, CreateCoolInvestorMutationVariables>(CreateCoolInvestorDocument, variables);

export const ListTransactionsDocument = `
    query ListTransactions {
  transactions {
    ...TransactionsAllFragment
  }
}
    ${TransactionsAllFragmentFragmentDoc}`;

export const useListTransactionsQuery = <
      TData = ListTransactionsQuery,
      TError = unknown
    >(
      variables?: ListTransactionsQueryVariables,
      options?: Omit<UseQueryOptions<ListTransactionsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListTransactionsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListTransactionsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListTransactions'] : ['ListTransactions', variables],
    queryFn: fetcher<ListTransactionsQuery, ListTransactionsQueryVariables>(ListTransactionsDocument, variables),
    ...options
  }
    )};

useListTransactionsQuery.document = ListTransactionsDocument;

useListTransactionsQuery.getKey = (variables?: ListTransactionsQueryVariables) => variables === undefined ? ['ListTransactions'] : ['ListTransactions', variables];


useListTransactionsQuery.fetcher = (variables?: ListTransactionsQueryVariables) => fetcher<ListTransactionsQuery, ListTransactionsQueryVariables>(ListTransactionsDocument, variables);

export const ListUsersDocument = `
    query ListUsers($limit: Int!, $page: Int, $role: UserRole) {
  users(limit: $limit, page: $page, role: $role) {
    data {
      id
      first_name
      last_name
      middle_name
      avatar
      mobile_number
      role
      email
      created_at
      updated_at
    }
  }
}
    `;

export const useListUsersQuery = <
      TData = ListUsersQuery,
      TError = unknown
    >(
      variables: ListUsersQueryVariables,
      options?: Omit<UseQueryOptions<ListUsersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListUsersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListUsersQuery, TError, TData>(
      {
    queryKey: ['ListUsers', variables],
    queryFn: fetcher<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, variables),
    ...options
  }
    )};

useListUsersQuery.document = ListUsersDocument;

useListUsersQuery.getKey = (variables: ListUsersQueryVariables) => ['ListUsers', variables];


useListUsersQuery.fetcher = (variables: ListUsersQueryVariables) => fetcher<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, variables);

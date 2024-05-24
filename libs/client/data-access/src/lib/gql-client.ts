import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { gqlFetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AddInvestmentInput = {
  amount: Scalars['Float']['input'];
  fund_id: Scalars['Int']['input'];
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

export type AssetEntity = {
  __typename?: 'AssetEntity';
  asset_type: AssetType;
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  investor_id?: Maybe<Scalars['Int']['output']>;
  key: Scalars['String']['output'];
  message_id?: Maybe<Scalars['Int']['output']>;
  mime_type: Scalars['String']['output'];
  original_name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type AssetType =
  | 'CSV'
  | 'EXCEL'
  | 'IMAGE'
  | 'PDF'
  | 'UNKNOWN'
  | 'WORD';

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

export type CreateBankAccountInput = {
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

export type CreateTicketInput = {
  assigned_to_user_id?: InputMaybe<Scalars['Int']['input']>;
  data: Scalars['JSON']['input'];
  investor_id?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<TicketPriority>;
  status?: InputMaybe<TicketStatus>;
  type: TicketType;
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

export type InvestorPortfolioEntity = {
  __typename?: 'InvestorPortfolioEntity';
  balance_change_amount: Scalars['Float']['output'];
  balance_change_percentage: Scalars['Float']['output'];
  previous_month: PortfolioTotalEntity;
  total_balance: Scalars['Float']['output'];
  total_invested: Scalars['Float']['output'];
  total_pending_transactions: Scalars['Float']['output'];
};

/** Login user input */
export type LoginInput = {
  /** Email of the user */
  email: Scalars['String']['input'];
  /** Password of the user */
  password: Scalars['String']['input'];
  user_type: UserType;
};

export type LogoutEntity = {
  __typename?: 'LogoutEntity';
  status: Scalars['String']['output'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  assets?: Maybe<Array<AssetEntity>>;
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  edit_count: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  sent_by_investor?: Maybe<InvestorEntity>;
  sent_by_investor_id?: Maybe<Scalars['Int']['output']>;
  sent_by_user?: Maybe<UserEntity>;
  sent_by_user_id?: Maybe<Scalars['Int']['output']>;
  ticket_id?: Maybe<Scalars['Int']['output']>;
  type: UserType;
  updated_at: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addInvestment: FundEntity;
  adjustFund: FundEntity;
  createBankAccount: BankAccountEntity;
  createFund: FundEntity;
  createInvestor: InvestorEntity;
  createMessage: MessageEntity;
  createTicket: TicketEntity;
  createTransaction: TransactionEntity;
  createUser: UserEntity;
  investorLogin: InvestorEntity;
  login: UserEntity;
  logout: LogoutEntity;
  removeAsset: AssetEntity;
  removeBankAccount: BankAccountEntity;
  removeFund: FundEntity;
  removeInvestor: InvestorEntity;
  removeMessage: MessageEntity;
  removeTicket: TicketEntity;
  removeTransaction: TransactionEntity;
  removeUser: UserEntity;
  sendTicketMessage: MessageEntity;
  updateBankAccount: BankAccountEntity;
  updateFund: FundEntity;
  updateInvestor: InvestorEntity;
  updateMessage: MessageEntity;
  updateTicket: TicketEntity;
  updateTransaction: TransactionEntity;
  updateUser: UserEntity;
};


export type MutationAddInvestmentArgs = {
  addInvestmentInput: AddInvestmentInput;
};


export type MutationAdjustFundArgs = {
  adjustFundInput: AdjustFundInput;
};


export type MutationCreateBankAccountArgs = {
  createBankAccountInput: CreateBankAccountInput;
};


export type MutationCreateFundArgs = {
  createFundInput: CreateFundInput;
};


export type MutationCreateInvestorArgs = {
  createInvestorInput: CreateInvestorInput;
};


export type MutationCreateMessageArgs = {
  createMessageInput: SendMessageInput;
};


export type MutationCreateTicketArgs = {
  createTicketInput: CreateTicketInput;
};


export type MutationCreateTransactionArgs = {
  createTransactionInput: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationInvestorLoginArgs = {
  loginInput: LoginInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveAssetArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveBankAccountArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveFundArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveInvestorArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveMessageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTicketArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSendTicketMessageArgs = {
  sendTicketMessageInput: SendTicketMessageInput;
};


export type MutationUpdateBankAccountArgs = {
  updateBankAccountInput: UpdateBankAccountInput;
};


export type MutationUpdateFundArgs = {
  updateFundInput: UpdateFundInput;
};


export type MutationUpdateInvestorArgs = {
  updateInvestorInput: UpdateInvestorInput;
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdateTicketArgs = {
  updateTicketInput: UpdateTicketInput;
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

export type PortfolioTotalEntity = {
  __typename?: 'PortfolioTotalEntity';
  total_balance: Scalars['Float']['output'];
  total_invested: Scalars['Float']['output'];
  total_pending_transactions: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  asset: AssetEntity;
  assets: Array<AssetEntity>;
  bankAccount: BankAccountEntity;
  bankAccounts: Array<BankAccountEntity>;
  fund: FundEntity;
  funds: Array<FundEntity>;
  investor: InvestorEntity;
  investorFund: Array<InvestorFundEntity>;
  investorFunds: PaginatedInvestorFundEntity;
  investorPortfolio: InvestorPortfolioEntity;
  investors: Array<InvestorEntity>;
  me: SessionEntity;
  meInvestor: InvestorEntity;
  meUser: UserEntity;
  message: MessageEntity;
  messages: Array<MessageEntity>;
  ticket: TicketEntity;
  tickets: Array<TicketEntity>;
  transaction: TransactionEntity;
  transactions: Array<TransactionEntity>;
  user: UserEntity;
  users: PaginatedUserEntity;
};


export type QueryAssetArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBankAccountArgs = {
  id: Scalars['Int']['input'];
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


export type QueryInvestorPortfolioArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTicketArgs = {
  id: Scalars['Int']['input'];
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

export type SendMessageInput = {
  content: Scalars['String']['input'];
  type: UserType;
};

export type SendTicketMessageInput = {
  content: Scalars['String']['input'];
  ticket_id: Scalars['Int']['input'];
  type: UserType;
};

export type SessionEntity = {
  __typename?: 'SessionEntity';
  investor?: Maybe<InvestorEntity>;
  user?: Maybe<UserEntity>;
};

export type TicketEntity = {
  __typename?: 'TicketEntity';
  assigned_to_user_id?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  investor_id: Scalars['Int']['output'];
  messages: Array<MessageEntity>;
  priority: TicketPriority;
  status: TicketStatus;
  type: TicketType;
  updated_at: Scalars['DateTime']['output'];
};

/** Priority of ticket */
export type TicketPriority =
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM'
  | 'URGENT';

/** Status of ticket */
export type TicketStatus =
  | 'CLOSED'
  | 'OPEN'
  | 'UNDER_REVIEW';

/** Type of ticket */
export type TicketType =
  | 'DOCUMENT_REQUEST'
  | 'SUPPORT';

export type TransactionEntity = {
  __typename?: 'TransactionEntity';
  amount: Scalars['Int']['output'];
  balance_after: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  currency_code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  investor_id?: Maybe<Scalars['Int']['output']>;
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

export type UpdateBankAccountInput = {
  account_holder_name?: InputMaybe<Scalars['String']['input']>;
  account_number?: InputMaybe<Scalars['String']['input']>;
  bank_code?: InputMaybe<Scalars['String']['input']>;
  bank_country?: InputMaybe<Scalars['String']['input']>;
  bank_name?: InputMaybe<Scalars['String']['input']>;
  branch_address?: InputMaybe<Scalars['String']['input']>;
  branch_code?: InputMaybe<Scalars['String']['input']>;
  bsb_number?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  iban?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  is_primary?: InputMaybe<Scalars['Boolean']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  routing_number?: InputMaybe<Scalars['String']['input']>;
  sort_code?: InputMaybe<Scalars['String']['input']>;
  swift_code?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<BankAccountType>;
};

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

export type UpdateMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  type?: InputMaybe<UserType>;
};

export type UpdateTicketInput = {
  assigned_to_user_id?: InputMaybe<Scalars['Int']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['Int']['input'];
  investor_id?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<TicketPriority>;
  status?: InputMaybe<TicketStatus>;
  type?: InputMaybe<TicketType>;
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

/** Type of user */
export type UserType =
  | 'ADMIN'
  | 'INVESTOR';

export type BankAccountAllFragmentFragment = { __typename?: 'BankAccountEntity', id: number, iban?: string | null, sort_code?: string | null, bsb_number?: string | null, bank_code?: string | null, branch_code?: string | null, branch_address?: string | null, is_primary: boolean, investor_id: number, created_at: any, updated_at: any, nickname?: string | null, bank_name: string, account_number: string, account_holder_name: string, type?: BankAccountType | null, bank_country: string, currency: string, routing_number?: string | null, swift_code?: string | null };

export type InvestorBaseFragmentFragment = { __typename?: 'InvestorEntity', id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any };

export type InvestorAllFragmentFragment = { __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null };

export type UpdateInvestorMutationVariables = Exact<{
  updateInvestorInput: UpdateInvestorInput;
}>;


export type UpdateInvestorMutation = { __typename?: 'Mutation', updateInvestor: { __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null } };

export type CreateBankAccountMutationVariables = Exact<{
  createBankAccountInput: CreateBankAccountInput;
}>;


export type CreateBankAccountMutation = { __typename?: 'Mutation', createBankAccount: { __typename?: 'BankAccountEntity', id: number, iban?: string | null, sort_code?: string | null, bsb_number?: string | null, bank_code?: string | null, branch_code?: string | null, branch_address?: string | null, is_primary: boolean, investor_id: number, created_at: any, updated_at: any, nickname?: string | null, bank_name: string, account_number: string, account_holder_name: string, type?: BankAccountType | null, bank_country: string, currency: string, routing_number?: string | null, swift_code?: string | null } };

export type UpdateBankAccountMutationVariables = Exact<{
  updateBankAccountInput: UpdateBankAccountInput;
}>;


export type UpdateBankAccountMutation = { __typename?: 'Mutation', updateBankAccount: { __typename?: 'BankAccountEntity', id: number, iban?: string | null, sort_code?: string | null, bsb_number?: string | null, bank_code?: string | null, branch_code?: string | null, branch_address?: string | null, is_primary: boolean, investor_id: number, created_at: any, updated_at: any, nickname?: string | null, bank_name: string, account_number: string, account_holder_name: string, type?: BankAccountType | null, bank_country: string, currency: string, routing_number?: string | null, swift_code?: string | null } };

export type AddInvestmentMutationVariables = Exact<{
  addInvestmentInput: AddInvestmentInput;
}>;


export type AddInvestmentMutation = { __typename?: 'Mutation', addInvestment: { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any } };

export type RetrieveInvestorQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RetrieveInvestorQuery = { __typename?: 'Query', investor: { __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null } };

export type InvestorPortfolioQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type InvestorPortfolioQuery = { __typename?: 'Query', investorPortfolio: { __typename?: 'InvestorPortfolioEntity', total_invested: number, total_balance: number, total_pending_transactions: number, balance_change_percentage: number, balance_change_amount: number, previous_month: { __typename?: 'PortfolioTotalEntity', total_invested: number, total_balance: number, total_pending_transactions: number } } };


export const BankAccountAllFragmentFragmentDoc = `
    fragment BankAccountAllFragment on BankAccountEntity {
  id
  iban
  sort_code
  bsb_number
  bank_code
  branch_code
  branch_address
  is_primary
  investor_id
  created_at
  updated_at
  nickname
  bank_name
  account_number
  account_holder_name
  type
  bank_country
  currency
  routing_number
  swift_code
}
    `;
export const InvestorBaseFragmentFragmentDoc = `
    fragment InvestorBaseFragment on InvestorEntity {
  id
  first_name
  middle_name
  last_name
  email
  company_name
  is_accredited
  avatar
  mobile_number
  account_status
  created_at
  updated_at
}
    `;
export const InvestorAllFragmentFragmentDoc = `
    fragment InvestorAllFragment on InvestorEntity {
  company_tax_id
  address {
    id
    street
    street_2
    city
    state_province
    country
    postal_zip_code
    verified
    latitude
    longitude
    country_code
  }
  passport_number
  national_id
  date_of_birth
  nationality
  ...InvestorBaseFragment
}
    `;
export const UpdateInvestorDocument = `
    mutation UpdateInvestor($updateInvestorInput: UpdateInvestorInput!) {
  updateInvestor(updateInvestorInput: $updateInvestorInput) {
    ...InvestorAllFragment
  }
}
    ${InvestorAllFragmentFragmentDoc}
${InvestorBaseFragmentFragmentDoc}`;

export const useUpdateInvestorMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateInvestorMutation, TError, UpdateInvestorMutationVariables, TContext>) => {
    
    return useMutation<UpdateInvestorMutation, TError, UpdateInvestorMutationVariables, TContext>(
      {
    mutationKey: ['UpdateInvestor'],
    mutationFn: (variables?: UpdateInvestorMutationVariables) => gqlFetcher<UpdateInvestorMutation, UpdateInvestorMutationVariables>(UpdateInvestorDocument, variables)(),
    ...options
  }
    )};


useUpdateInvestorMutation.fetcher = (variables: UpdateInvestorMutationVariables, options?: RequestInit['headers']) => gqlFetcher<UpdateInvestorMutation, UpdateInvestorMutationVariables>(UpdateInvestorDocument, variables, options);

export const CreateBankAccountDocument = `
    mutation CreateBankAccount($createBankAccountInput: CreateBankAccountInput!) {
  createBankAccount(createBankAccountInput: $createBankAccountInput) {
    ...BankAccountAllFragment
  }
}
    ${BankAccountAllFragmentFragmentDoc}`;

export const useCreateBankAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBankAccountMutation, TError, CreateBankAccountMutationVariables, TContext>) => {
    
    return useMutation<CreateBankAccountMutation, TError, CreateBankAccountMutationVariables, TContext>(
      {
    mutationKey: ['CreateBankAccount'],
    mutationFn: (variables?: CreateBankAccountMutationVariables) => gqlFetcher<CreateBankAccountMutation, CreateBankAccountMutationVariables>(CreateBankAccountDocument, variables)(),
    ...options
  }
    )};


useCreateBankAccountMutation.fetcher = (variables: CreateBankAccountMutationVariables, options?: RequestInit['headers']) => gqlFetcher<CreateBankAccountMutation, CreateBankAccountMutationVariables>(CreateBankAccountDocument, variables, options);

export const UpdateBankAccountDocument = `
    mutation UpdateBankAccount($updateBankAccountInput: UpdateBankAccountInput!) {
  updateBankAccount(updateBankAccountInput: $updateBankAccountInput) {
    ...BankAccountAllFragment
  }
}
    ${BankAccountAllFragmentFragmentDoc}`;

export const useUpdateBankAccountMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateBankAccountMutation, TError, UpdateBankAccountMutationVariables, TContext>) => {
    
    return useMutation<UpdateBankAccountMutation, TError, UpdateBankAccountMutationVariables, TContext>(
      {
    mutationKey: ['UpdateBankAccount'],
    mutationFn: (variables?: UpdateBankAccountMutationVariables) => gqlFetcher<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>(UpdateBankAccountDocument, variables)(),
    ...options
  }
    )};


useUpdateBankAccountMutation.fetcher = (variables: UpdateBankAccountMutationVariables, options?: RequestInit['headers']) => gqlFetcher<UpdateBankAccountMutation, UpdateBankAccountMutationVariables>(UpdateBankAccountDocument, variables, options);

export const AddInvestmentDocument = `
    mutation AddInvestment($addInvestmentInput: AddInvestmentInput!) {
  addInvestment(addInvestmentInput: $addInvestmentInput) {
    id
    name
    balance
    created_at
    updated_at
  }
}
    `;

export const useAddInvestmentMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AddInvestmentMutation, TError, AddInvestmentMutationVariables, TContext>) => {
    
    return useMutation<AddInvestmentMutation, TError, AddInvestmentMutationVariables, TContext>(
      {
    mutationKey: ['AddInvestment'],
    mutationFn: (variables?: AddInvestmentMutationVariables) => gqlFetcher<AddInvestmentMutation, AddInvestmentMutationVariables>(AddInvestmentDocument, variables)(),
    ...options
  }
    )};


useAddInvestmentMutation.fetcher = (variables: AddInvestmentMutationVariables, options?: RequestInit['headers']) => gqlFetcher<AddInvestmentMutation, AddInvestmentMutationVariables>(AddInvestmentDocument, variables, options);

export const RetrieveInvestorDocument = `
    query RetrieveInvestor($id: Int!) {
  investor(id: $id) {
    ...InvestorAllFragment
  }
}
    ${InvestorAllFragmentFragmentDoc}
${InvestorBaseFragmentFragmentDoc}`;

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
    queryFn: gqlFetcher<RetrieveInvestorQuery, RetrieveInvestorQueryVariables>(RetrieveInvestorDocument, variables),
    ...options
  }
    )};

useRetrieveInvestorQuery.document = RetrieveInvestorDocument;

useRetrieveInvestorQuery.getKey = (variables: RetrieveInvestorQueryVariables) => ['RetrieveInvestor', variables];


useRetrieveInvestorQuery.fetcher = (variables: RetrieveInvestorQueryVariables, options?: RequestInit['headers']) => gqlFetcher<RetrieveInvestorQuery, RetrieveInvestorQueryVariables>(RetrieveInvestorDocument, variables, options);

export const InvestorPortfolioDocument = `
    query InvestorPortfolio($id: Int) {
  investorPortfolio(id: $id) {
    total_invested
    total_balance
    total_pending_transactions
    balance_change_percentage
    balance_change_amount
    previous_month {
      total_invested
      total_balance
      total_pending_transactions
    }
  }
}
    `;

export const useInvestorPortfolioQuery = <
      TData = InvestorPortfolioQuery,
      TError = unknown
    >(
      variables?: InvestorPortfolioQueryVariables,
      options?: Omit<UseQueryOptions<InvestorPortfolioQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<InvestorPortfolioQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<InvestorPortfolioQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['InvestorPortfolio'] : ['InvestorPortfolio', variables],
    queryFn: gqlFetcher<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>(InvestorPortfolioDocument, variables),
    ...options
  }
    )};

useInvestorPortfolioQuery.document = InvestorPortfolioDocument;

useInvestorPortfolioQuery.getKey = (variables?: InvestorPortfolioQueryVariables) => variables === undefined ? ['InvestorPortfolio'] : ['InvestorPortfolio', variables];


useInvestorPortfolioQuery.fetcher = (variables?: InvestorPortfolioQueryVariables, options?: RequestInit['headers']) => gqlFetcher<InvestorPortfolioQuery, InvestorPortfolioQueryVariables>(InvestorPortfolioDocument, variables, options);
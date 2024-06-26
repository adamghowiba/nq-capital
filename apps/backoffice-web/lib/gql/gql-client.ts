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
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AcceptInvestorInvitationInput = {
  address_id?: InputMaybe<Scalars['Int']['input']>;
  bank_accounts?: InputMaybe<Array<BankAccountWithoutInvestorInput>>;
  company_name?: InputMaybe<Scalars['String']['input']>;
  company_tax_id?: InputMaybe<Scalars['String']['input']>;
  date_of_birth?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  /** Investor first name */
  first_name: Scalars['String']['input'];
  invitation_code: Scalars['String']['input'];
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

export type AddInvestmentInput = {
  amount: Scalars['Float']['input'];
  fund_id: Scalars['Int']['input'];
  investor_id: Scalars['Int']['input'];
  /** Additional notes about the investment */
  notes?: InputMaybe<Scalars['String']['input']>;
  /** Custom reference ID for the investment */
  reference_id?: InputMaybe<Scalars['String']['input']>;
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
  size?: Maybe<Scalars['Int']['output']>;
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
  address_id?: InputMaybe<Scalars['Int']['input']>;
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

export type CreateInvitationInput = {
  email: Scalars['String']['input'];
  type: InvitationType;
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
  notes?: InputMaybe<Scalars['String']['input']>;
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

export type FundAdjustmentEntity = {
  __typename?: 'FundAdjustmentEntity';
  adjusted_by_user_id: Scalars['Int']['output'];
  amount: Scalars['Float']['output'];
  balance_after: Scalars['Float']['output'];
  balance_before: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fund_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type FundEntity = {
  __typename?: 'FundEntity';
  balance: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type FundInvestorOverview = {
  __typename?: 'FundInvestorOverview';
  current_balance: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  invested_amount: Scalars['Float']['output'];
  investor_id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
};

export type FundOverviewEntity = {
  __typename?: 'FundOverviewEntity';
  current_amount: Scalars['Float']['output'];
  invested_amount: Scalars['Float']['output'];
  net_returns: Scalars['Float']['output'];
};

export type FundOverviewHistoryEntity = {
  __typename?: 'FundOverviewHistoryEntity';
  data: Array<FundOverviewHistoryItem>;
  timespan: Timespan;
};

export type FundOverviewHistoryItem = {
  __typename?: 'FundOverviewHistoryItem';
  amount: Scalars['Float']['output'];
  date: Scalars['Float']['output'];
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

export type InvitationEntity = {
  __typename?: 'InvitationEntity';
  email: Scalars['String']['output'];
  expires_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  investor_id?: Maybe<Scalars['Int']['output']>;
  invitation_code: Scalars['String']['output'];
  invited_by_user_id: Scalars['Int']['output'];
  resent_count: Scalars['Int']['output'];
  responded_at?: Maybe<Scalars['DateTime']['output']>;
  sent_at: Scalars['DateTime']['output'];
  status: InvitationStatus;
  type: InvitationType;
  updated_at: Scalars['DateTime']['output'];
};

export type InvitationStatus =
  | 'ACCEPTED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'PENDING'
  | 'REVOKED';

export type InvitationType =
  | 'INVESTOR'
  | 'USER';

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
  assets: Array<AssetEntity>;
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
  acceptInvestorInvitation: InvestorEntity;
  addInvestment: FundEntity;
  adjustFund: FundEntity;
  adminLogin: UserEntity;
  archiveNotification: NotificationEntity;
  createBankAccount: BankAccountEntity;
  createFund: FundEntity;
  createInvestor: InvestorEntity;
  createMessage: MessageEntity;
  createTicket: TicketEntity;
  createTransaction: TransactionEntity;
  createUser: UserEntity;
  investorLogin: InvestorEntity;
  inviteInvestor: InvitationEntity;
  inviteUser: InvitationEntity;
  login: UserEntity;
  logout?: Maybe<LogoutEntity>;
  removeAsset: AssetEntity;
  removeBankAccount: BankAccountEntity;
  removeFund: FundEntity;
  removeInvestor: InvestorEntity;
  removeInvitation: InvitationEntity;
  removeMessage: MessageEntity;
  removeTicket: TicketEntity;
  removeTransaction: TransactionEntity;
  removeUser: UserEntity;
  requestPasswordReset: ProfileEntity;
  resetPassword: ProfileEntity;
  sendNotification: NotificationEntity;
  sendTicketMessage: MessageEntity;
  updateBankAccount: BankAccountEntity;
  updateFund: FundEntity;
  updateInvestor: InvestorEntity;
  updateInvitation: InvitationEntity;
  updateMessage: MessageEntity;
  updateNotification: NotificationEntity;
  updateTicket: TicketEntity;
  updateTransaction: TransactionEntity;
  updateUser: UserEntity;
  validatePasswordResetToken: ValidatePasswordResetTokenEntity;
  withdrawal: TransactionEntity;
};


export type MutationAcceptInvestorInvitationArgs = {
  acceptInvestorInvitationInput: AcceptInvestorInvitationInput;
};


export type MutationAddInvestmentArgs = {
  addInvestmentInput: AddInvestmentInput;
};


export type MutationAdjustFundArgs = {
  adjustFundInput: AdjustFundInput;
};


export type MutationAdminLoginArgs = {
  loginInput: LoginInput;
};


export type MutationArchiveNotificationArgs = {
  id: Scalars['Int']['input'];
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


export type MutationInviteInvestorArgs = {
  invitationInput: CreateInvitationInput;
};


export type MutationInviteUserArgs = {
  invitationInput: CreateInvitationInput;
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


export type MutationRemoveInvitationArgs = {
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


export type MutationRequestPasswordResetArgs = {
  requestPasswordResetInput: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};


export type MutationSendNotificationArgs = {
  sendNotificationInput: SendNotificationInput;
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


export type MutationUpdateInvitationArgs = {
  updateInvitationInput: UpdateInvitationInput;
};


export type MutationUpdateMessageArgs = {
  updateMessageInput: UpdateMessageInput;
};


export type MutationUpdateNotificationArgs = {
  updateNotificationInput: UpdateNotificationInput;
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


export type MutationValidatePasswordResetTokenArgs = {
  validatePasswordResetTokenInput: ValidatePasswordResetTokenInput;
};


export type MutationWithdrawalArgs = {
  withdrawalInput: WithdrawalInput;
};

export type NotificationChannel =
  | 'APP'
  | 'EMAIL'
  | 'SMS';

export type NotificationEntity = {
  __typename?: 'NotificationEntity';
  channel: Array<NotificationChannel>;
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  investor?: Maybe<InvestorEntity>;
  investor_id?: Maybe<Scalars['Int']['output']>;
  is_archived: Scalars['Boolean']['output'];
  is_read: Scalars['Boolean']['output'];
  meta?: Maybe<Scalars['JSONObject']['output']>;
  priority: NotificationPriority;
  read_at?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  updated_at: Scalars['DateTime']['output'];
  user?: Maybe<InvestorEntity>;
  user_id?: Maybe<Scalars['Int']['output']>;
};

export type NotificationPriority =
  | 'HIGH'
  | 'LOW'
  | 'MEDIUM'
  | 'URGENT';

export type NotificationType =
  | 'ANNOUNCEMENT'
  | 'GENERAL'
  | 'MESSAGE'
  | 'TICKET'
  | 'TRANSACTION';

export type PaginatedInvestorFundEntity = {
  __typename?: 'PaginatedInvestorFundEntity';
  count: Scalars['Int']['output'];
  data: Array<InvestorFundEntity>;
  hasNextPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
};

export type PaginatedUserEntity = {
  __typename?: 'PaginatedUserEntity';
  count: Scalars['Int']['output'];
  data: Array<UserEntity>;
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

export type ProfileEntity = {
  __typename?: 'ProfileEntity';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
  last_name: Scalars['String']['output'];
  middle_name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  type: UserType;
};

export type Query = {
  __typename?: 'Query';
  asset: AssetEntity;
  assets: Array<AssetEntity>;
  bankAccount: BankAccountEntity;
  bankAccounts: Array<BankAccountEntity>;
  fund: FundEntity;
  fundAdjustments: Array<FundAdjustmentEntity>;
  fundInvestorsOverview: Array<FundInvestorOverview>;
  fundOverview: FundOverviewEntity;
  funds: Array<FundEntity>;
  fundsHistory: FundOverviewHistoryEntity;
  investor: InvestorEntity;
  investorFund: Array<InvestorFundEntity>;
  investorFunds: PaginatedInvestorFundEntity;
  investorPortfolio: InvestorPortfolioEntity;
  investorPortfolioWithStake: InvestorPortfolioEntity;
  investors: Array<InvestorEntity>;
  invitation: InvitationEntity;
  invitations: Array<InvitationEntity>;
  me: SessionEntity;
  meInvestor: InvestorEntity;
  meUser: UserEntity;
  message: MessageEntity;
  messages: Array<MessageEntity>;
  notification: NotificationEntity;
  notifications: Array<NotificationEntity>;
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


export type QueryFundInvestorsOverviewArgs = {
  fund_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryFundOverviewArgs = {
  fund_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryFundsHistoryArgs = {
  fund_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  timespan?: InputMaybe<Timespan>;
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


export type QueryInvestorPortfolioWithStakeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInvitationArgs = {
  code: Scalars['String']['input'];
};


export type QueryInvitationsArgs = {
  emails?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<InvitationStatus>;
  statuses?: InputMaybe<Array<InvitationStatus>>;
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryNotificationsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryTicketArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTransactionsArgs = {
  fundId?: InputMaybe<Scalars['Int']['input']>;
  investorId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<TransactionStatus>>;
  type?: InputMaybe<Array<TransactionType>>;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUsersArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
  role?: InputMaybe<UserRole>;
};

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  new_password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SendMessageInput = {
  content: Scalars['String']['input'];
  type: UserType;
};

export type SendNotificationInput = {
  channel?: InputMaybe<Array<NotificationChannel>>;
  content: Scalars['String']['input'];
  investor_id?: InputMaybe<Scalars['Int']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  title: Scalars['String']['input'];
  type?: InputMaybe<NotificationType>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
};

export type SendTicketMessageInput = {
  content: Scalars['String']['input'];
  ticket_id: Scalars['Int']['input'];
};

export type SessionEntity = {
  __typename?: 'SessionEntity';
  investor?: Maybe<InvestorEntity>;
  user?: Maybe<UserEntity>;
};

export type TicketEntity = {
  __typename?: 'TicketEntity';
  assets?: Maybe<Array<AssetEntity>>;
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

export type Timespan =
  | 'MONTH'
  | 'YEAR';

export type TransactionEntity = {
  __typename?: 'TransactionEntity';
  amount: Scalars['Float']['output'];
  balance_after: Scalars['Float']['output'];
  created_at: Scalars['DateTime']['output'];
  currency_code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  external_id?: Maybe<Scalars['String']['output']>;
  fee?: Maybe<Scalars['Float']['output']>;
  fund?: Maybe<FundEntity>;
  fund_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  investor?: Maybe<InvestorEntity>;
  investor_id?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
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
  address_id?: InputMaybe<Scalars['Int']['input']>;
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

export type UpdateInvitationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  type?: InputMaybe<InvitationType>;
};

export type UpdateMessageInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  type?: InputMaybe<UserType>;
};

export type UpdateNotificationInput = {
  channel?: InputMaybe<Array<NotificationChannel>>;
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  investor_id?: InputMaybe<Scalars['Int']['input']>;
  is_archived?: InputMaybe<Scalars['Boolean']['input']>;
  is_read?: InputMaybe<Scalars['Boolean']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  user_id?: InputMaybe<Scalars['Int']['input']>;
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
  notes?: InputMaybe<Scalars['String']['input']>;
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

export type ValidatePasswordResetTokenEntity = {
  __typename?: 'ValidatePasswordResetTokenEntity';
  /** Expiration date of password reset token */
  expiration_date: Scalars['DateTime']['output'];
};

export type ValidatePasswordResetTokenInput = {
  token: Scalars['String']['input'];
};

export type WithdrawalInput = {
  amount: Scalars['Float']['input'];
  bank_account_id?: InputMaybe<Scalars['Int']['input']>;
  investor_id: Scalars['Int']['input'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', adminLogin: { __typename?: 'UserEntity', id: number, middle_name?: string | null, avatar?: string | null, mobile_number?: string | null, role: UserRole, first_name: string, last_name: string, email: string, created_at: any, updated_at: any } };

export type RequestPasswordResetMutationVariables = Exact<{
  requestPasswordResetInput: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename?: 'ProfileEntity', id?: number | null, first_name: string, last_name: string, type: UserType, email: string } };

export type RestPasswordMutationVariables = Exact<{
  resetPasswordInput: ResetPasswordInput;
}>;


export type RestPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ProfileEntity', id?: number | null, type: UserType, first_name: string, last_name: string, email: string } };

export type ValidatePasswordResetTokenMutationVariables = Exact<{
  validatePasswordResetTokenInput: ValidatePasswordResetTokenInput;
}>;


export type ValidatePasswordResetTokenMutation = { __typename?: 'Mutation', validatePasswordResetToken: { __typename?: 'ValidatePasswordResetTokenEntity', expiration_date: any } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'LogoutEntity', status: string } | null };

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = { __typename?: 'Query', meUser: { __typename?: 'UserEntity', id: number, middle_name?: string | null, avatar?: string | null, mobile_number?: string | null, role: UserRole, first_name: string, last_name: string, email: string, created_at: any, updated_at: any } };

export type AdjustFundMutationVariables = Exact<{
  adjustFundInput: AdjustFundInput;
}>;


export type AdjustFundMutation = { __typename?: 'Mutation', adjustFund: { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any } };

export type ListFundAdjustmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFundAdjustmentsQuery = { __typename?: 'Query', fundAdjustments: Array<{ __typename?: 'FundAdjustmentEntity', id: number, description?: string | null, amount: number, balance_before: number, balance_after: number, fund_id: number, adjusted_by_user_id: number, created_at: any, updated_at: any }> };

export type FundAllFragmentFragment = { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any };

export type CreateFundMutationVariables = Exact<{
  createFundInput: CreateFundInput;
}>;


export type CreateFundMutation = { __typename?: 'Mutation', createFund: { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any } };

export type UpdateFundMutationVariables = Exact<{
  updateFundInput: UpdateFundInput;
}>;


export type UpdateFundMutation = { __typename?: 'Mutation', updateFund: { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any } };

export type ListFundsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListFundsQuery = { __typename?: 'Query', funds: Array<{ __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any }> };

export type RetrieveFundQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RetrieveFundQuery = { __typename?: 'Query', fund: { __typename?: 'FundEntity', id: number, name: string, balance: number, created_at: any, updated_at: any } };

export type FundOverviewQueryVariables = Exact<{
  fund_ids?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type FundOverviewQuery = { __typename?: 'Query', fundOverview: { __typename?: 'FundOverviewEntity', invested_amount: number, current_amount: number, net_returns: number } };

export type FundHistoryOverviewQueryVariables = Exact<{
  timespan: Timespan;
}>;


export type FundHistoryOverviewQuery = { __typename?: 'Query', fundsHistory: { __typename?: 'FundOverviewHistoryEntity', timespan: Timespan, data: Array<{ __typename?: 'FundOverviewHistoryItem', date: number, amount: number }> } };

export type GetFundInvestorsOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFundInvestorsOverviewQuery = { __typename?: 'Query', fundInvestorsOverview: Array<{ __typename?: 'FundInvestorOverview', investor_id: number, first_name: string, last_name: string, email: string, invested_amount: number, current_balance: number }> };

export type ListFundInvestorsQueryVariables = Exact<{
  fund_id?: InputMaybe<Scalars['Int']['input']>;
  investor_id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ListFundInvestorsQuery = { __typename?: 'Query', investorFunds: { __typename?: 'PaginatedInvestorFundEntity', data: Array<{ __typename?: 'InvestorFundEntity', id: number, stake_percentage: number, invested_amount: number, initial_investment: number, created_at: any, updated_at: any, balance: number, investor_balance_in_fund: number, investor: { __typename?: 'InvestorEntity', id: number, first_name: string, last_name: string, company_name?: string | null, account_status?: InvestorAccountStatus | null } }> } };

export type BankAccountAllFragmentFragment = { __typename?: 'BankAccountEntity', id: number, iban?: string | null, sort_code?: string | null, bsb_number?: string | null, bank_code?: string | null, branch_code?: string | null, branch_address?: string | null, is_primary: boolean, investor_id: number, created_at: any, updated_at: any, nickname?: string | null, bank_name: string, account_number: string, account_holder_name: string, type?: BankAccountType | null, bank_country: string, currency: string, routing_number?: string | null, swift_code?: string | null };

export type InvestorBaseFragmentFragment = { __typename?: 'InvestorEntity', id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any };

export type InvestorAllFragmentFragment = { __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null };

export type RetrieveInvestorQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RetrieveInvestorQuery = { __typename?: 'Query', investor: { __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, bank_accounts?: Array<{ __typename?: 'BankAccountEntity', id: number, account_number: string, bank_name: string, bank_country: string, currency: string, is_primary: boolean }> | null, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null } };

export type ListInvestorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListInvestorsQuery = { __typename?: 'Query', investors: Array<{ __typename?: 'InvestorEntity', company_tax_id?: string | null, passport_number?: string | null, national_id?: string | null, date_of_birth?: any | null, nationality?: string | null, id: number, first_name: string, middle_name?: string | null, last_name: string, email: string, company_name?: string | null, is_accredited?: boolean | null, avatar?: string | null, mobile_number?: string | null, account_status?: InvestorAccountStatus | null, created_at: any, updated_at: any, address?: { __typename?: 'AddressEntity', id: number, street: string, street_2?: string | null, city: string, state_province: string, country: string, postal_zip_code?: string | null, verified: number, latitude: number, longitude: number, country_code: string } | null }> };

export type ListInvitationsQueryVariables = Exact<{
  emails?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  status?: InputMaybe<InvitationStatus>;
  statuses?: InputMaybe<Array<InvitationStatus> | InvitationStatus>;
}>;


export type ListInvitationsQuery = { __typename?: 'Query', invitations: Array<{ __typename?: 'InvitationEntity', id: number, email: string, invitation_code: string, status: InvitationStatus, type: InvitationType, investor_id?: number | null, invited_by_user_id: number, resent_count: number, sent_at: any, updated_at: any, expires_at: any }> };

export type InviteInvestorMutationVariables = Exact<{
  invitationInput: CreateInvitationInput;
}>;


export type InviteInvestorMutation = { __typename?: 'Mutation', inviteInvestor: { __typename?: 'InvitationEntity', id: number, email: string, invitation_code: string, status: InvitationStatus, type: InvitationType, sent_at: any, updated_at: any } };

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

export type WithdrawalMutationVariables = Exact<{
  withdrawalInput: WithdrawalInput;
}>;


export type WithdrawalMutation = { __typename?: 'Mutation', withdrawal: { __typename?: 'TransactionEntity', id: number, type: TransactionType, amount: number, currency_code: string, balance_after: number, description?: string | null, fee?: number | null, external_id?: string | null, status: TransactionStatus, updated_at: any, created_at: any } };

export type DeleteInvitationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteInvitationMutation = { __typename?: 'Mutation', removeInvitation: { __typename?: 'InvitationEntity', id: number, email: string, invitation_code: string, status: InvitationStatus, type: InvitationType, investor_id?: number | null, invited_by_user_id: number, resent_count: number, sent_at: any, updated_at: any, expires_at: any } };

export type InvitationBaseFragmentFragment = { __typename?: 'InvitationEntity', id: number, email: string, invitation_code: string, status: InvitationStatus, type: InvitationType, investor_id?: number | null, invited_by_user_id: number, resent_count: number, sent_at: any, updated_at: any, expires_at: any };

export type MessageBaseFragmentFragment = { __typename?: 'MessageEntity', id: number, content: string, type: UserType, sent_by_user_id?: number | null, sent_by_investor_id?: number | null, edit_count: number, updated_at: any, created_at: any, sent_by_user?: { __typename?: 'UserEntity', id: number, first_name: string, last_name: string, avatar?: string | null, role: UserRole } | null, sent_by_investor?: { __typename?: 'InvestorEntity', id: number, first_name: string, last_name: string, avatar?: string | null } | null };

export type TicketsAllFragmentFragment = { __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any };

export type CreateTickerMutationVariables = Exact<{
  createTicketInput: CreateTicketInput;
}>;


export type CreateTickerMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any } };

export type UpdateTicketMutationVariables = Exact<{
  updateTicketInput: UpdateTicketInput;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateTicket: { __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any } };

export type SendTicketMessageMutationVariables = Exact<{
  sendTicketMessageInput: SendTicketMessageInput;
}>;


export type SendTicketMessageMutation = { __typename?: 'Mutation', sendTicketMessage: { __typename?: 'MessageEntity', id: number, content: string, type: UserType, sent_by_user_id?: number | null, sent_by_investor_id?: number | null, edit_count: number, updated_at: any, created_at: any, sent_by_user?: { __typename?: 'UserEntity', id: number, first_name: string, last_name: string, avatar?: string | null, role: UserRole } | null, sent_by_investor?: { __typename?: 'InvestorEntity', id: number, first_name: string, last_name: string, avatar?: string | null } | null } };

export type DeleteTicketMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', removeTicket: { __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any } };

export type ListTickersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListTickersQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any }> };

export type RetrieveTicketQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RetrieveTicketQuery = { __typename?: 'Query', ticket: { __typename?: 'TicketEntity', id: number, data?: any | null, priority: TicketPriority, type: TicketType, status: TicketStatus, investor_id: number, assigned_to_user_id?: number | null, updated_at: any, created_at: any, messages: Array<{ __typename?: 'MessageEntity', id: number, content: string, type: UserType, sent_by_user_id?: number | null, sent_by_investor_id?: number | null, edit_count: number, updated_at: any, created_at: any, assets: Array<{ __typename?: 'AssetEntity', id: number, original_name: string, key: string, url: string, mime_type: string, asset_type: AssetType, created_at: any, updated_at: any }>, sent_by_user?: { __typename?: 'UserEntity', id: number, first_name: string, last_name: string, avatar?: string | null, role: UserRole } | null, sent_by_investor?: { __typename?: 'InvestorEntity', id: number, first_name: string, last_name: string, avatar?: string | null } | null }> } };

export type TransactionsAllFragmentFragment = { __typename?: 'TransactionEntity', id: number, type: TransactionType, amount: number, currency_code: string, balance_after: number, description?: string | null, fee?: number | null, external_id?: string | null, status: TransactionStatus, updated_at: any, created_at: any };

export type ListTransactionsQueryVariables = Exact<{
  fundId?: InputMaybe<Scalars['Int']['input']>;
  investorId?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Array<TransactionStatus> | TransactionStatus>;
  type?: InputMaybe<Array<TransactionType> | TransactionType>;
}>;


export type ListTransactionsQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'TransactionEntity', id: number, type: TransactionType, amount: number, currency_code: string, balance_after: number, description?: string | null, fee?: number | null, external_id?: string | null, status: TransactionStatus, updated_at: any, created_at: any, investor?: { __typename?: 'InvestorEntity', first_name: string, last_name: string, email: string, id: number, avatar?: string | null } | null, fund?: { __typename?: 'FundEntity', name: string, balance: number } | null }> };


export const FundAllFragmentFragmentDoc = `
    fragment FundAllFragment on FundEntity {
  id
  name
  balance
  created_at
  updated_at
}
    `;
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
export const InvitationBaseFragmentFragmentDoc = `
    fragment InvitationBaseFragment on InvitationEntity {
  id
  email
  invitation_code
  status
  type
  investor_id
  invited_by_user_id
  resent_count
  sent_at
  updated_at
  expires_at
}
    `;
export const MessageBaseFragmentFragmentDoc = `
    fragment MessageBaseFragment on MessageEntity {
  id
  content
  type
  sent_by_user_id
  sent_by_investor_id
  sent_by_user {
    id
    first_name
    last_name
    avatar
    role
  }
  sent_by_investor {
    id
    first_name
    last_name
    avatar
  }
  edit_count
  updated_at
  created_at
}
    `;
export const TicketsAllFragmentFragmentDoc = `
    fragment TicketsAllFragment on TicketEntity {
  id
  data
  priority
  type
  status
  investor_id
  assigned_to_user_id
  updated_at
  created_at
}
    `;
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
export const LoginDocument = `
    mutation Login($loginInput: LoginInput!) {
  adminLogin(loginInput: $loginInput) {
    id
    middle_name
    avatar
    mobile_number
    role
    first_name
    last_name
    email
    created_at
    updated_at
  }
}
    `;

export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => {
    
    return useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      {
    mutationKey: ['Login'],
    mutationFn: (variables?: LoginMutationVariables) => gqlFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
    ...options
  }
    )};


useLoginMutation.fetcher = (variables: LoginMutationVariables, options?: RequestInit['headers']) => gqlFetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables, options);

export const RequestPasswordResetDocument = `
    mutation RequestPasswordReset($requestPasswordResetInput: RequestPasswordResetInput!) {
  requestPasswordReset(requestPasswordResetInput: $requestPasswordResetInput) {
    id
    first_name
    last_name
    type
    email
  }
}
    `;

export const useRequestPasswordResetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RequestPasswordResetMutation, TError, RequestPasswordResetMutationVariables, TContext>) => {
    
    return useMutation<RequestPasswordResetMutation, TError, RequestPasswordResetMutationVariables, TContext>(
      {
    mutationKey: ['RequestPasswordReset'],
    mutationFn: (variables?: RequestPasswordResetMutationVariables) => gqlFetcher<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, variables)(),
    ...options
  }
    )};


useRequestPasswordResetMutation.fetcher = (variables: RequestPasswordResetMutationVariables, options?: RequestInit['headers']) => gqlFetcher<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument, variables, options);

export const RestPasswordDocument = `
    mutation RestPassword($resetPasswordInput: ResetPasswordInput!) {
  resetPassword(resetPasswordInput: $resetPasswordInput) {
    id
    type
    first_name
    last_name
    email
  }
}
    `;

export const useRestPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RestPasswordMutation, TError, RestPasswordMutationVariables, TContext>) => {
    
    return useMutation<RestPasswordMutation, TError, RestPasswordMutationVariables, TContext>(
      {
    mutationKey: ['RestPassword'],
    mutationFn: (variables?: RestPasswordMutationVariables) => gqlFetcher<RestPasswordMutation, RestPasswordMutationVariables>(RestPasswordDocument, variables)(),
    ...options
  }
    )};


useRestPasswordMutation.fetcher = (variables: RestPasswordMutationVariables, options?: RequestInit['headers']) => gqlFetcher<RestPasswordMutation, RestPasswordMutationVariables>(RestPasswordDocument, variables, options);

export const ValidatePasswordResetTokenDocument = `
    mutation ValidatePasswordResetToken($validatePasswordResetTokenInput: ValidatePasswordResetTokenInput!) {
  validatePasswordResetToken(
    validatePasswordResetTokenInput: $validatePasswordResetTokenInput
  ) {
    expiration_date
  }
}
    `;

export const useValidatePasswordResetTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ValidatePasswordResetTokenMutation, TError, ValidatePasswordResetTokenMutationVariables, TContext>) => {
    
    return useMutation<ValidatePasswordResetTokenMutation, TError, ValidatePasswordResetTokenMutationVariables, TContext>(
      {
    mutationKey: ['ValidatePasswordResetToken'],
    mutationFn: (variables?: ValidatePasswordResetTokenMutationVariables) => gqlFetcher<ValidatePasswordResetTokenMutation, ValidatePasswordResetTokenMutationVariables>(ValidatePasswordResetTokenDocument, variables)(),
    ...options
  }
    )};


useValidatePasswordResetTokenMutation.fetcher = (variables: ValidatePasswordResetTokenMutationVariables, options?: RequestInit['headers']) => gqlFetcher<ValidatePasswordResetTokenMutation, ValidatePasswordResetTokenMutationVariables>(ValidatePasswordResetTokenDocument, variables, options);

export const LogoutDocument = `
    mutation Logout {
  logout {
    status
  }
}
    `;

export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>) => {
    
    return useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      {
    mutationKey: ['Logout'],
    mutationFn: (variables?: LogoutMutationVariables) => gqlFetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables)(),
    ...options
  }
    )};


useLogoutMutation.fetcher = (variables?: LogoutMutationVariables, options?: RequestInit['headers']) => gqlFetcher<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options);

export const MeUserDocument = `
    query MeUser {
  meUser {
    id
    middle_name
    avatar
    mobile_number
    role
    first_name
    last_name
    email
    created_at
    updated_at
  }
}
    `;

export const useMeUserQuery = <
      TData = MeUserQuery,
      TError = unknown
    >(
      variables?: MeUserQueryVariables,
      options?: Omit<UseQueryOptions<MeUserQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<MeUserQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<MeUserQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['MeUser'] : ['MeUser', variables],
    queryFn: gqlFetcher<MeUserQuery, MeUserQueryVariables>(MeUserDocument, variables),
    ...options
  }
    )};

useMeUserQuery.document = MeUserDocument;

useMeUserQuery.getKey = (variables?: MeUserQueryVariables) => variables === undefined ? ['MeUser'] : ['MeUser', variables];


useMeUserQuery.fetcher = (variables?: MeUserQueryVariables, options?: RequestInit['headers']) => gqlFetcher<MeUserQuery, MeUserQueryVariables>(MeUserDocument, variables, options);

export const AdjustFundDocument = `
    mutation AdjustFund($adjustFundInput: AdjustFundInput!) {
  adjustFund(adjustFundInput: $adjustFundInput) {
    id
    name
    balance
    created_at
    updated_at
  }
}
    `;

export const useAdjustFundMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AdjustFundMutation, TError, AdjustFundMutationVariables, TContext>) => {
    
    return useMutation<AdjustFundMutation, TError, AdjustFundMutationVariables, TContext>(
      {
    mutationKey: ['AdjustFund'],
    mutationFn: (variables?: AdjustFundMutationVariables) => gqlFetcher<AdjustFundMutation, AdjustFundMutationVariables>(AdjustFundDocument, variables)(),
    ...options
  }
    )};


useAdjustFundMutation.fetcher = (variables: AdjustFundMutationVariables, options?: RequestInit['headers']) => gqlFetcher<AdjustFundMutation, AdjustFundMutationVariables>(AdjustFundDocument, variables, options);

export const ListFundAdjustmentsDocument = `
    query ListFundAdjustments {
  fundAdjustments {
    id
    description
    amount
    balance_before
    balance_after
    fund_id
    adjusted_by_user_id
    created_at
    updated_at
  }
}
    `;

export const useListFundAdjustmentsQuery = <
      TData = ListFundAdjustmentsQuery,
      TError = unknown
    >(
      variables?: ListFundAdjustmentsQueryVariables,
      options?: Omit<UseQueryOptions<ListFundAdjustmentsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListFundAdjustmentsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListFundAdjustmentsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListFundAdjustments'] : ['ListFundAdjustments', variables],
    queryFn: gqlFetcher<ListFundAdjustmentsQuery, ListFundAdjustmentsQueryVariables>(ListFundAdjustmentsDocument, variables),
    ...options
  }
    )};

useListFundAdjustmentsQuery.document = ListFundAdjustmentsDocument;

useListFundAdjustmentsQuery.getKey = (variables?: ListFundAdjustmentsQueryVariables) => variables === undefined ? ['ListFundAdjustments'] : ['ListFundAdjustments', variables];


useListFundAdjustmentsQuery.fetcher = (variables?: ListFundAdjustmentsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListFundAdjustmentsQuery, ListFundAdjustmentsQueryVariables>(ListFundAdjustmentsDocument, variables, options);

export const CreateFundDocument = `
    mutation CreateFund($createFundInput: CreateFundInput!) {
  createFund(createFundInput: $createFundInput) {
    ...FundAllFragment
  }
}
    ${FundAllFragmentFragmentDoc}`;

export const useCreateFundMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateFundMutation, TError, CreateFundMutationVariables, TContext>) => {
    
    return useMutation<CreateFundMutation, TError, CreateFundMutationVariables, TContext>(
      {
    mutationKey: ['CreateFund'],
    mutationFn: (variables?: CreateFundMutationVariables) => gqlFetcher<CreateFundMutation, CreateFundMutationVariables>(CreateFundDocument, variables)(),
    ...options
  }
    )};


useCreateFundMutation.fetcher = (variables: CreateFundMutationVariables, options?: RequestInit['headers']) => gqlFetcher<CreateFundMutation, CreateFundMutationVariables>(CreateFundDocument, variables, options);

export const UpdateFundDocument = `
    mutation UpdateFund($updateFundInput: UpdateFundInput!) {
  updateFund(updateFundInput: $updateFundInput) {
    ...FundAllFragment
  }
}
    ${FundAllFragmentFragmentDoc}`;

export const useUpdateFundMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateFundMutation, TError, UpdateFundMutationVariables, TContext>) => {
    
    return useMutation<UpdateFundMutation, TError, UpdateFundMutationVariables, TContext>(
      {
    mutationKey: ['UpdateFund'],
    mutationFn: (variables?: UpdateFundMutationVariables) => gqlFetcher<UpdateFundMutation, UpdateFundMutationVariables>(UpdateFundDocument, variables)(),
    ...options
  }
    )};


useUpdateFundMutation.fetcher = (variables: UpdateFundMutationVariables, options?: RequestInit['headers']) => gqlFetcher<UpdateFundMutation, UpdateFundMutationVariables>(UpdateFundDocument, variables, options);

export const ListFundsDocument = `
    query ListFunds {
  funds {
    ...FundAllFragment
  }
}
    ${FundAllFragmentFragmentDoc}`;

export const useListFundsQuery = <
      TData = ListFundsQuery,
      TError = unknown
    >(
      variables?: ListFundsQueryVariables,
      options?: Omit<UseQueryOptions<ListFundsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListFundsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListFundsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListFunds'] : ['ListFunds', variables],
    queryFn: gqlFetcher<ListFundsQuery, ListFundsQueryVariables>(ListFundsDocument, variables),
    ...options
  }
    )};

useListFundsQuery.document = ListFundsDocument;

useListFundsQuery.getKey = (variables?: ListFundsQueryVariables) => variables === undefined ? ['ListFunds'] : ['ListFunds', variables];


useListFundsQuery.fetcher = (variables?: ListFundsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListFundsQuery, ListFundsQueryVariables>(ListFundsDocument, variables, options);

export const RetrieveFundDocument = `
    query RetrieveFund($id: Int!) {
  fund(id: $id) {
    id
    name
    balance
    created_at
    updated_at
  }
}
    `;

export const useRetrieveFundQuery = <
      TData = RetrieveFundQuery,
      TError = unknown
    >(
      variables: RetrieveFundQueryVariables,
      options?: Omit<UseQueryOptions<RetrieveFundQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RetrieveFundQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RetrieveFundQuery, TError, TData>(
      {
    queryKey: ['RetrieveFund', variables],
    queryFn: gqlFetcher<RetrieveFundQuery, RetrieveFundQueryVariables>(RetrieveFundDocument, variables),
    ...options
  }
    )};

useRetrieveFundQuery.document = RetrieveFundDocument;

useRetrieveFundQuery.getKey = (variables: RetrieveFundQueryVariables) => ['RetrieveFund', variables];


useRetrieveFundQuery.fetcher = (variables: RetrieveFundQueryVariables, options?: RequestInit['headers']) => gqlFetcher<RetrieveFundQuery, RetrieveFundQueryVariables>(RetrieveFundDocument, variables, options);

export const FundOverviewDocument = `
    query FundOverview($fund_ids: [Int!]) {
  fundOverview(fund_ids: $fund_ids) {
    invested_amount
    current_amount
    net_returns
  }
}
    `;

export const useFundOverviewQuery = <
      TData = FundOverviewQuery,
      TError = unknown
    >(
      variables?: FundOverviewQueryVariables,
      options?: Omit<UseQueryOptions<FundOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FundOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FundOverviewQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['FundOverview'] : ['FundOverview', variables],
    queryFn: gqlFetcher<FundOverviewQuery, FundOverviewQueryVariables>(FundOverviewDocument, variables),
    ...options
  }
    )};

useFundOverviewQuery.document = FundOverviewDocument;

useFundOverviewQuery.getKey = (variables?: FundOverviewQueryVariables) => variables === undefined ? ['FundOverview'] : ['FundOverview', variables];


useFundOverviewQuery.fetcher = (variables?: FundOverviewQueryVariables, options?: RequestInit['headers']) => gqlFetcher<FundOverviewQuery, FundOverviewQueryVariables>(FundOverviewDocument, variables, options);

export const FundHistoryOverviewDocument = `
    query FundHistoryOverview($timespan: Timespan!) {
  fundsHistory(timespan: $timespan) {
    timespan
    data {
      date
      amount
    }
  }
}
    `;

export const useFundHistoryOverviewQuery = <
      TData = FundHistoryOverviewQuery,
      TError = unknown
    >(
      variables: FundHistoryOverviewQueryVariables,
      options?: Omit<UseQueryOptions<FundHistoryOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<FundHistoryOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<FundHistoryOverviewQuery, TError, TData>(
      {
    queryKey: ['FundHistoryOverview', variables],
    queryFn: gqlFetcher<FundHistoryOverviewQuery, FundHistoryOverviewQueryVariables>(FundHistoryOverviewDocument, variables),
    ...options
  }
    )};

useFundHistoryOverviewQuery.document = FundHistoryOverviewDocument;

useFundHistoryOverviewQuery.getKey = (variables: FundHistoryOverviewQueryVariables) => ['FundHistoryOverview', variables];


useFundHistoryOverviewQuery.fetcher = (variables: FundHistoryOverviewQueryVariables, options?: RequestInit['headers']) => gqlFetcher<FundHistoryOverviewQuery, FundHistoryOverviewQueryVariables>(FundHistoryOverviewDocument, variables, options);

export const GetFundInvestorsOverviewDocument = `
    query GetFundInvestorsOverview {
  fundInvestorsOverview {
    investor_id
    first_name
    last_name
    email
    invested_amount
    current_balance
  }
}
    `;

export const useGetFundInvestorsOverviewQuery = <
      TData = GetFundInvestorsOverviewQuery,
      TError = unknown
    >(
      variables?: GetFundInvestorsOverviewQueryVariables,
      options?: Omit<UseQueryOptions<GetFundInvestorsOverviewQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetFundInvestorsOverviewQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetFundInvestorsOverviewQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetFundInvestorsOverview'] : ['GetFundInvestorsOverview', variables],
    queryFn: gqlFetcher<GetFundInvestorsOverviewQuery, GetFundInvestorsOverviewQueryVariables>(GetFundInvestorsOverviewDocument, variables),
    ...options
  }
    )};

useGetFundInvestorsOverviewQuery.document = GetFundInvestorsOverviewDocument;

useGetFundInvestorsOverviewQuery.getKey = (variables?: GetFundInvestorsOverviewQueryVariables) => variables === undefined ? ['GetFundInvestorsOverview'] : ['GetFundInvestorsOverview', variables];


useGetFundInvestorsOverviewQuery.fetcher = (variables?: GetFundInvestorsOverviewQueryVariables, options?: RequestInit['headers']) => gqlFetcher<GetFundInvestorsOverviewQuery, GetFundInvestorsOverviewQueryVariables>(GetFundInvestorsOverviewDocument, variables, options);

export const ListFundInvestorsDocument = `
    query ListFundInvestors($fund_id: Int, $investor_id: Int) {
  investorFunds(fundId: $fund_id, investorId: $investor_id) {
    data {
      id
      stake_percentage
      invested_amount
      initial_investment
      created_at
      updated_at
      balance
      investor_balance_in_fund
      investor {
        id
        first_name
        last_name
        company_name
        account_status
      }
    }
  }
}
    `;

export const useListFundInvestorsQuery = <
      TData = ListFundInvestorsQuery,
      TError = unknown
    >(
      variables?: ListFundInvestorsQueryVariables,
      options?: Omit<UseQueryOptions<ListFundInvestorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListFundInvestorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListFundInvestorsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListFundInvestors'] : ['ListFundInvestors', variables],
    queryFn: gqlFetcher<ListFundInvestorsQuery, ListFundInvestorsQueryVariables>(ListFundInvestorsDocument, variables),
    ...options
  }
    )};

useListFundInvestorsQuery.document = ListFundInvestorsDocument;

useListFundInvestorsQuery.getKey = (variables?: ListFundInvestorsQueryVariables) => variables === undefined ? ['ListFundInvestors'] : ['ListFundInvestors', variables];


useListFundInvestorsQuery.fetcher = (variables?: ListFundInvestorsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListFundInvestorsQuery, ListFundInvestorsQueryVariables>(ListFundInvestorsDocument, variables, options);

export const RetrieveInvestorDocument = `
    query RetrieveInvestor($id: Int!) {
  investor(id: $id) {
    bank_accounts {
      id
      account_number
      bank_name
      bank_country
      currency
      is_primary
    }
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

export const ListInvestorsDocument = `
    query ListInvestors {
  investors {
    ...InvestorAllFragment
  }
}
    ${InvestorAllFragmentFragmentDoc}
${InvestorBaseFragmentFragmentDoc}`;

export const useListInvestorsQuery = <
      TData = ListInvestorsQuery,
      TError = unknown
    >(
      variables?: ListInvestorsQueryVariables,
      options?: Omit<UseQueryOptions<ListInvestorsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListInvestorsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListInvestorsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListInvestors'] : ['ListInvestors', variables],
    queryFn: gqlFetcher<ListInvestorsQuery, ListInvestorsQueryVariables>(ListInvestorsDocument, variables),
    ...options
  }
    )};

useListInvestorsQuery.document = ListInvestorsDocument;

useListInvestorsQuery.getKey = (variables?: ListInvestorsQueryVariables) => variables === undefined ? ['ListInvestors'] : ['ListInvestors', variables];


useListInvestorsQuery.fetcher = (variables?: ListInvestorsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListInvestorsQuery, ListInvestorsQueryVariables>(ListInvestorsDocument, variables, options);

export const ListInvitationsDocument = `
    query ListInvitations($emails: [String!], $status: InvitationStatus, $statuses: [InvitationStatus!]) {
  invitations(emails: $emails, status: $status, statuses: $statuses) {
    ...InvitationBaseFragment
  }
}
    ${InvitationBaseFragmentFragmentDoc}`;

export const useListInvitationsQuery = <
      TData = ListInvitationsQuery,
      TError = unknown
    >(
      variables?: ListInvitationsQueryVariables,
      options?: Omit<UseQueryOptions<ListInvitationsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListInvitationsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListInvitationsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListInvitations'] : ['ListInvitations', variables],
    queryFn: gqlFetcher<ListInvitationsQuery, ListInvitationsQueryVariables>(ListInvitationsDocument, variables),
    ...options
  }
    )};

useListInvitationsQuery.document = ListInvitationsDocument;

useListInvitationsQuery.getKey = (variables?: ListInvitationsQueryVariables) => variables === undefined ? ['ListInvitations'] : ['ListInvitations', variables];


useListInvitationsQuery.fetcher = (variables?: ListInvitationsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListInvitationsQuery, ListInvitationsQueryVariables>(ListInvitationsDocument, variables, options);

export const InviteInvestorDocument = `
    mutation InviteInvestor($invitationInput: CreateInvitationInput!) {
  inviteInvestor(invitationInput: $invitationInput) {
    id
    email
    invitation_code
    status
    type
    sent_at
    updated_at
  }
}
    `;

export const useInviteInvestorMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<InviteInvestorMutation, TError, InviteInvestorMutationVariables, TContext>) => {
    
    return useMutation<InviteInvestorMutation, TError, InviteInvestorMutationVariables, TContext>(
      {
    mutationKey: ['InviteInvestor'],
    mutationFn: (variables?: InviteInvestorMutationVariables) => gqlFetcher<InviteInvestorMutation, InviteInvestorMutationVariables>(InviteInvestorDocument, variables)(),
    ...options
  }
    )};


useInviteInvestorMutation.fetcher = (variables: InviteInvestorMutationVariables, options?: RequestInit['headers']) => gqlFetcher<InviteInvestorMutation, InviteInvestorMutationVariables>(InviteInvestorDocument, variables, options);

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

export const WithdrawalDocument = `
    mutation Withdrawal($withdrawalInput: WithdrawalInput!) {
  withdrawal(withdrawalInput: $withdrawalInput) {
    ...TransactionsAllFragment
  }
}
    ${TransactionsAllFragmentFragmentDoc}`;

export const useWithdrawalMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<WithdrawalMutation, TError, WithdrawalMutationVariables, TContext>) => {
    
    return useMutation<WithdrawalMutation, TError, WithdrawalMutationVariables, TContext>(
      {
    mutationKey: ['Withdrawal'],
    mutationFn: (variables?: WithdrawalMutationVariables) => gqlFetcher<WithdrawalMutation, WithdrawalMutationVariables>(WithdrawalDocument, variables)(),
    ...options
  }
    )};


useWithdrawalMutation.fetcher = (variables: WithdrawalMutationVariables, options?: RequestInit['headers']) => gqlFetcher<WithdrawalMutation, WithdrawalMutationVariables>(WithdrawalDocument, variables, options);

export const DeleteInvitationDocument = `
    mutation DeleteInvitation($id: Int!) {
  removeInvitation(id: $id) {
    ...InvitationBaseFragment
  }
}
    ${InvitationBaseFragmentFragmentDoc}`;

export const useDeleteInvitationMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>) => {
    
    return useMutation<DeleteInvitationMutation, TError, DeleteInvitationMutationVariables, TContext>(
      {
    mutationKey: ['DeleteInvitation'],
    mutationFn: (variables?: DeleteInvitationMutationVariables) => gqlFetcher<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables)(),
    ...options
  }
    )};


useDeleteInvitationMutation.fetcher = (variables: DeleteInvitationMutationVariables, options?: RequestInit['headers']) => gqlFetcher<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument, variables, options);

export const CreateTickerDocument = `
    mutation CreateTicker($createTicketInput: CreateTicketInput!) {
  createTicket(createTicketInput: $createTicketInput) {
    ...TicketsAllFragment
  }
}
    ${TicketsAllFragmentFragmentDoc}`;

export const useCreateTickerMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTickerMutation, TError, CreateTickerMutationVariables, TContext>) => {
    
    return useMutation<CreateTickerMutation, TError, CreateTickerMutationVariables, TContext>(
      {
    mutationKey: ['CreateTicker'],
    mutationFn: (variables?: CreateTickerMutationVariables) => gqlFetcher<CreateTickerMutation, CreateTickerMutationVariables>(CreateTickerDocument, variables)(),
    ...options
  }
    )};


useCreateTickerMutation.fetcher = (variables: CreateTickerMutationVariables, options?: RequestInit['headers']) => gqlFetcher<CreateTickerMutation, CreateTickerMutationVariables>(CreateTickerDocument, variables, options);

export const UpdateTicketDocument = `
    mutation UpdateTicket($updateTicketInput: UpdateTicketInput!) {
  updateTicket(updateTicketInput: $updateTicketInput) {
    ...TicketsAllFragment
  }
}
    ${TicketsAllFragmentFragmentDoc}`;

export const useUpdateTicketMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTicketMutation, TError, UpdateTicketMutationVariables, TContext>) => {
    
    return useMutation<UpdateTicketMutation, TError, UpdateTicketMutationVariables, TContext>(
      {
    mutationKey: ['UpdateTicket'],
    mutationFn: (variables?: UpdateTicketMutationVariables) => gqlFetcher<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, variables)(),
    ...options
  }
    )};


useUpdateTicketMutation.fetcher = (variables: UpdateTicketMutationVariables, options?: RequestInit['headers']) => gqlFetcher<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, variables, options);

export const SendTicketMessageDocument = `
    mutation SendTicketMessage($sendTicketMessageInput: SendTicketMessageInput!) {
  sendTicketMessage(sendTicketMessageInput: $sendTicketMessageInput) {
    ...MessageBaseFragment
  }
}
    ${MessageBaseFragmentFragmentDoc}`;

export const useSendTicketMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SendTicketMessageMutation, TError, SendTicketMessageMutationVariables, TContext>) => {
    
    return useMutation<SendTicketMessageMutation, TError, SendTicketMessageMutationVariables, TContext>(
      {
    mutationKey: ['SendTicketMessage'],
    mutationFn: (variables?: SendTicketMessageMutationVariables) => gqlFetcher<SendTicketMessageMutation, SendTicketMessageMutationVariables>(SendTicketMessageDocument, variables)(),
    ...options
  }
    )};


useSendTicketMessageMutation.fetcher = (variables: SendTicketMessageMutationVariables, options?: RequestInit['headers']) => gqlFetcher<SendTicketMessageMutation, SendTicketMessageMutationVariables>(SendTicketMessageDocument, variables, options);

export const DeleteTicketDocument = `
    mutation DeleteTicket($id: Int!) {
  removeTicket(id: $id) {
    ...TicketsAllFragment
  }
}
    ${TicketsAllFragmentFragmentDoc}`;

export const useDeleteTicketMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTicketMutation, TError, DeleteTicketMutationVariables, TContext>) => {
    
    return useMutation<DeleteTicketMutation, TError, DeleteTicketMutationVariables, TContext>(
      {
    mutationKey: ['DeleteTicket'],
    mutationFn: (variables?: DeleteTicketMutationVariables) => gqlFetcher<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, variables)(),
    ...options
  }
    )};


useDeleteTicketMutation.fetcher = (variables: DeleteTicketMutationVariables, options?: RequestInit['headers']) => gqlFetcher<DeleteTicketMutation, DeleteTicketMutationVariables>(DeleteTicketDocument, variables, options);

export const ListTickersDocument = `
    query ListTickers {
  tickets {
    ...TicketsAllFragment
  }
}
    ${TicketsAllFragmentFragmentDoc}`;

export const useListTickersQuery = <
      TData = ListTickersQuery,
      TError = unknown
    >(
      variables?: ListTickersQueryVariables,
      options?: Omit<UseQueryOptions<ListTickersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ListTickersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ListTickersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ListTickers'] : ['ListTickers', variables],
    queryFn: gqlFetcher<ListTickersQuery, ListTickersQueryVariables>(ListTickersDocument, variables),
    ...options
  }
    )};

useListTickersQuery.document = ListTickersDocument;

useListTickersQuery.getKey = (variables?: ListTickersQueryVariables) => variables === undefined ? ['ListTickers'] : ['ListTickers', variables];


useListTickersQuery.fetcher = (variables?: ListTickersQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListTickersQuery, ListTickersQueryVariables>(ListTickersDocument, variables, options);

export const RetrieveTicketDocument = `
    query RetrieveTicket($id: Int!) {
  ticket(id: $id) {
    messages {
      assets {
        id
        original_name
        key
        url
        mime_type
        asset_type
        created_at
        updated_at
      }
      ...MessageBaseFragment
    }
    ...TicketsAllFragment
  }
}
    ${MessageBaseFragmentFragmentDoc}
${TicketsAllFragmentFragmentDoc}`;

export const useRetrieveTicketQuery = <
      TData = RetrieveTicketQuery,
      TError = unknown
    >(
      variables: RetrieveTicketQueryVariables,
      options?: Omit<UseQueryOptions<RetrieveTicketQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RetrieveTicketQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RetrieveTicketQuery, TError, TData>(
      {
    queryKey: ['RetrieveTicket', variables],
    queryFn: gqlFetcher<RetrieveTicketQuery, RetrieveTicketQueryVariables>(RetrieveTicketDocument, variables),
    ...options
  }
    )};

useRetrieveTicketQuery.document = RetrieveTicketDocument;

useRetrieveTicketQuery.getKey = (variables: RetrieveTicketQueryVariables) => ['RetrieveTicket', variables];


useRetrieveTicketQuery.fetcher = (variables: RetrieveTicketQueryVariables, options?: RequestInit['headers']) => gqlFetcher<RetrieveTicketQuery, RetrieveTicketQueryVariables>(RetrieveTicketDocument, variables, options);

export const ListTransactionsDocument = `
    query ListTransactions($fundId: Int, $investorId: Int, $status: [TransactionStatus!], $type: [TransactionType!]) {
  transactions(
    fundId: $fundId
    investorId: $investorId
    status: $status
    type: $type
  ) {
    investor {
      first_name
      last_name
      email
      id
      avatar
    }
    fund {
      name
      balance
    }
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
    queryFn: gqlFetcher<ListTransactionsQuery, ListTransactionsQueryVariables>(ListTransactionsDocument, variables),
    ...options
  }
    )};

useListTransactionsQuery.document = ListTransactionsDocument;

useListTransactionsQuery.getKey = (variables?: ListTransactionsQueryVariables) => variables === undefined ? ['ListTransactions'] : ['ListTransactions', variables];


useListTransactionsQuery.fetcher = (variables?: ListTransactionsQueryVariables, options?: RequestInit['headers']) => gqlFetcher<ListTransactionsQuery, ListTransactionsQueryVariables>(ListTransactionsDocument, variables, options);

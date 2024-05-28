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
  acceptInvestorInvitation: InvestorEntity;
  addInvestment: FundEntity;
  adjustFund: FundEntity;
  adminLogin: UserEntity;
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
  sendTicketMessage: MessageEntity;
  updateBankAccount: BankAccountEntity;
  updateFund: FundEntity;
  updateInvestor: InvestorEntity;
  updateInvitation: InvitationEntity;
  updateMessage: MessageEntity;
  updateTicket: TicketEntity;
  updateTransaction: TransactionEntity;
  updateUser: UserEntity;
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
  fundAdjustments: Array<FundAdjustmentEntity>;
  fundInvestorsOverview: Array<FundInvestorOverview>;
  fundOverview: FundOverviewEntity;
  funds: Array<FundEntity>;
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

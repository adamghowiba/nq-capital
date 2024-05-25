import {
  InvestorAccountStatus,
  InvitationStatus,
  TicketStatus,
  TicketType,
  TransactionType,
} from '../../schema';
import { ChipColorSchema } from '../components/ColoredChip/ColoredChip';

export const TICKET_TYPE_COLOR_MAP: Record<TicketType, ChipColorSchema> = {
  DOCUMENT_REQUEST: 'blue',
  SUPPORT: 'green',
};

export const TICKET_STATUS_COLOR_MAP: Record<TicketStatus, ChipColorSchema> = {
  CLOSED: 'neutral',
  OPEN: 'green',
  UNDER_REVIEW: 'blue',
};

export const ACCOUNT_STATUS_COLOR_MAP: Record<
  InvestorAccountStatus,
  ChipColorSchema
> = {
  ACTIVE: 'green',
  DISABLED: 'red',
  ONBOARDING: 'blue',
};

export const INVITATION_STATUS_COLOR_MAP: Record<
  InvitationStatus,
  ChipColorSchema
> = {
  ACCEPTED: 'green',
  DECLINED: 'red',
  EXPIRED: 'blue',
  PENDING: 'blue',
  REVOKED: 'neutral',
};

export const TRANSACTION_TYPE_COLOR_MAP: Record<
  TransactionType,
  ChipColorSchema
> = {
  DEPOSIT: 'green',
  WITHDRAWAL: 'red',
  ADJUSTMENT: 'purple',
  FEE: 'neutral',
  REFUND: 'orange',
};

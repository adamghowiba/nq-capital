import { CreateBankAccountInput } from '../../gql/gql-client';
import { BankAccountSchema } from '../payment-source/payment-source.schema';

export const transformBankSchemaToInput = (
  bankSchema: BankAccountSchema
): CreateBankAccountInput => {
  return {
    nickname: bankSchema.nickname,
    bank_name: bankSchema.bank_name,
    account_number: bankSchema.account_number,
    account_holder_name: bankSchema.account_holder_name,
    type: bankSchema.account_type,
    bank_country: bankSchema.bank_country,
    currency: bankSchema.currency,
    routing_number: bankSchema.routing_number,
    swift_code: bankSchema.swift_code,
    iban: bankSchema.iban,
    sort_code: bankSchema.sort_code,
    bsb_number: bankSchema.bsb_number,
    bank_code: bankSchema.bank_code,
    branch_code: bankSchema.branch_code,
    branch_address: bankSchema.branch_address,
    is_primary: bankSchema.is_primary,
  };
};

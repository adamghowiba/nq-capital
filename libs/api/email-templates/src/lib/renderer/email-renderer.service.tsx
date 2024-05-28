import { Options, render } from '@react-email/render';
import { JSX } from 'react';
import InvestorInvitationEmail from '../emails/InvestorInvitationEmail';
import ResetPasswordEmail from '../emails/ResetPasswordEmail';
import TicketMessageEmail from '../emails/TicketMessageEmail';

const EmailTemplate = <TComponent extends (props: any) => JSX.Element>(
  template: TComponent,
  defaultData?: Parameters<TComponent>[0]
) => {
  return { EmailComponent: template, defaultData };
};

export const TEMPLATE_MAP = {
  investorInvitation: EmailTemplate(InvestorInvitationEmail, {}),
  resetPassword: EmailTemplate(ResetPasswordEmail, {}),
  ticketMessage: EmailTemplate(TicketMessageEmail),
} as const;

export type EmailTemplate = typeof TEMPLATE_MAP;
export type EmailTemplateType = keyof EmailTemplate;

export const renderEmailTemplate = <TTemplate extends EmailTemplateType>(
  templateKey: TTemplate,
  data: Parameters<EmailTemplate[TTemplate]['EmailComponent']>[0],
  options?: Options
) => {
  const template = TEMPLATE_MAP[templateKey] as EmailTemplate[TTemplate];

  const html = render(
    // @ts-expect-error - TS doesn't like the spread here, but it's fine
    <template.EmailComponent {...template.defaultData} {...data} />,
    { pretty: true, ...options }
  );

  return html;
};

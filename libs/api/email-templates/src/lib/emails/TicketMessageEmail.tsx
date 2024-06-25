import {
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Row,
  Column,
  Tailwind,
  Text,
} from '@react-email/components';
import { BasicLayout } from './_components/BasicLayout';
import { EmailButton } from './_components/EmailButton';
import { EmailHeader } from './_components/EmailHeader';
import { EmailMessageCard } from './_components/EmailMessageCard';

export interface TicketMessageEmailProps {
  message: string;
  displayName: string;
  senderDisplayName: string;
  ticketId: string;
  ticketUrl: string;
  sentDateString: string;
}

export const TicketMessageEmail = ({
  message,
  senderDisplayName,
  ticketId,
  ticketUrl,
  sentDateString,
  displayName,
}: TicketMessageEmailProps) => {
  const previewText = `New message from ${senderDisplayName} on ticket ${ticketId}`;

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <BasicLayout>
          <EmailHeader title="You have a new direct message"></EmailHeader>

          <Text className="text-black text-[14px] leading-[24px]">
            Hello {displayName},
          </Text>

          <Text className="text-black text-[14px] leading-[24px]">
            You have received a new message from{' '}
            <strong>{senderDisplayName}</strong> on ticket{' '}
            <strong>{ticketId}</strong>
          </Text>

          <Section
            className="my-4 w-full p-[16px] rounded-lg bg-neutral-50"
            style={{ border: '1px solid #e2e2e2' }}
          >
            <EmailMessageCard
              date={sentDateString}
              displayName={senderDisplayName}
              message={message}
            />
          </Section>

          <Section className="text-center mt-[32px] mb-[32px]">
            <EmailButton href={ticketUrl}>View Message</EmailButton>
          </Section>
        </BasicLayout>
      </Tailwind>
    </Html>
  );
};

TicketMessageEmail.PreviewProps = {
  displayName: 'Adam Ghowiba',
  message:
    "I've received the invitation but cannot seem to accept it. Can you help me?",
  senderDisplayName: 'John Doe',
  senderType: 'investor',
  ticketId: '#123456',
  ticketUrl: 'https://example.com/tickets/123456',
  sentDateString: '10/20/2024',
} as TicketMessageEmailProps;

export default TicketMessageEmail;

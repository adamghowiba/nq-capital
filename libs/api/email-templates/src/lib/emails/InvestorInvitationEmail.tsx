import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export interface InvestorInvitationEmailProps {
  /**
   * The investors display name
   */
  displayName?: string;
  invitedByName?: string;
  invitedByEmail?: string;
  inviteLink?: string;
}

export const InvestorInvitationEmail = ({
  displayName: username,
  invitedByName,
  invitedByEmail,
  inviteLink,
}: InvestorInvitationEmailProps) => {
  const previewText = `Join the NQ Capital investment portal`;

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://nqcapital-company.s3.amazonaws.com/logo_black_icon.png`}
                width="45.27"
                height="45.27"
                alt="NQ Capital Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              You've been invited to join <strong>NQ Capital</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello{username ? ' ' + username : ''},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              {invitedByName && invitedByEmail ? (
                <>
                  <strong>{invitedByName}</strong> (
                  <Link
                    href={`mailto:${invitedByEmail}`}
                    className="text-blue-600 no-underline"
                  >
                    {invitedByEmail}
                  </Link>
                  ) has
                </>
              ) : (
                <>You have been</>
              )}{' '}
              invited you to the <strong>NQ Capital investors portal</strong>.
            </Text>

            <Text className="text-[#595959] leading-[24px]">
              The NQ Investors Portal is a simplified platform for managing your
              investments, inquires and withdrawals. Track your portfolio
              performance—all in one place.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={inviteLink}
              >
                Accept invitation
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{' '}
              <span className="text-black">{username}</span>. This invite was
              sent from <span className="text-black">{invitedByName}</span> If
              you were not expecting this invitation, you can ignore this email.
              If you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InvestorInvitationEmail.PreviewProps = {
  displayName: 'alanturing',
  // invitedByName: 'Alan',
  // invitedByEmail: 'alan.turing@example.com',
  inviteLink: 'http://localhost:4200/onboarding?token=123123123',
} as InvestorInvitationEmailProps;

export default InvestorInvitationEmail;

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
  resetUrl?: string;
}

export const InvestorInvitationEmail = ({
  displayName,
  resetUrl,
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
              Reset password
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{displayName}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Someone recently requested a password change for your account. If
              this was you, you can set a new password here:
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetUrl}
              >
                Reset password
              </Button>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{' '}
              <Link href={resetUrl} className="text-blue-600 no-underline">
                {resetUrl}
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you don't want to change your password or didn't request this,
              just ignore and delete this message. To keep your account secure,
              please don't forward this email to anyone.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InvestorInvitationEmail.PreviewProps = {
  displayName: 'alanturing',
  resetUrl: 'http://localhost:4200/onboarding?token=123123123',
} as InvestorInvitationEmailProps;

export default InvestorInvitationEmail;

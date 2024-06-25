import {
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { BasicLayout } from './_components/BasicLayout';
import { EmailButton } from './_components/EmailButton';
import { EmailHeader } from './_components/EmailHeader';

export interface NewInvestmentEmail {
  /**
   * The investors display name
   */
  displayName?: string;
  resetUrl?: string;
}

export const NewInvestmentEmail = ({
  displayName,
  resetUrl,
}: NewInvestmentEmail) => {
  const previewText = `Join the NQ Capital investment portal`;

  return (
    <Html>
      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>
        <BasicLayout>
          <EmailHeader title="Investment processed"></EmailHeader>

          <Text className="text-black text-[14px] leading-[24px]">
            Someone recently requested a password change for your account. If
            this was you, you can set a new password here:
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <EmailButton>View Transaction</EmailButton>
          </Section>

          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

          <Text className="text-[#666666] text-[12px] leading-[24px]">
            If you don't want to change your password or didn't request this,
            just ignore and delete this message. To keep your account secure,
            please don't forward this email to anyone.
          </Text>
        </BasicLayout>
      </Tailwind>
    </Html>
  );
};

NewInvestmentEmail.PreviewProps = {
  displayName: 'alanturing',
  resetUrl: 'http://localhost:4200/onboarding?token=123123123',
} as NewInvestmentEmail;

export default NewInvestmentEmail;

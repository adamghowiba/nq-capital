import {
  Button,
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components';
import { FC, PropsWithChildren } from 'react';
import { BasicLayout } from './BasicLayout';

export interface EmailHeaderProps extends PropsWithChildren {
  title: string;
}

export const EmailHeader: FC<EmailHeaderProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <>
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
        {title}
      </Heading>
    </>
  );
};

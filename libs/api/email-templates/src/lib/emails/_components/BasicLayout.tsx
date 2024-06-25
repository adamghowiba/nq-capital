import { Body, Container } from '@react-email/components';
import { FC, PropsWithChildren } from 'react';

export interface BasicLayoutProps extends PropsWithChildren {}

export const BasicLayout: FC<BasicLayoutProps> = ({ children, ...props }) => {
  return (
    <Body className="bg-white my-auto mx-auto font-sans px-2">
      <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
        {children}
      </Container>
    </Body>
  );
};

import React, { FC } from 'react';
import { Row, Column, Text, Section } from '@react-email/components';

export interface EmailMessageCardProps {
  displayName: string;
  message: string;
  date: string;
}

export const EmailMessageCard: FC<EmailMessageCardProps> = ({
  displayName,
  date,
  message,
  ...props
}) => {
  return (
    <div
      style={{
        fontSize: '14px',
      }}
    >
      <Section align="left" width="auto">
        <Row>
          <Column className="pr-[6px]">
            <span className="text-black font-semibold">{displayName}</span>
          </Column>

          <Column className="pl-[2px]">
            <span className="text-neutral-500">{date}</span>
          </Column>
        </Row>
      </Section>

      <Section className="pt-[4px]">
        <Row>
          <span className="text-neutral-700">{message}</span>
        </Row>
      </Section>
    </div>
  );
};

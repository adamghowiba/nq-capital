import { HStack, VStack } from '../../../../lib/components/Stack/Stack';
import React, { FC, ReactNode } from 'react';
import checkMarkIcon from '@iconify/icons-fluent/checkmark-circle-16-filled';
import arrowCircleUpRight from '@iconify/icons-fluent/arrow-circle-up-right-20-filled';
import { Icon } from '@iconify/react';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';

export interface RequestSuccessCardProps {
  title: string;
  dataPoints?: { label: ReactNode; value: ReactNode }[];
  variant?: 'success';
  status?: 'processing';
  ticketHref?: string;
}

const RequestSuccessCard: FC<RequestSuccessCardProps> = ({
  title,
  variant = 'success',
  status = 'processing',
  dataPoints,
  ticketHref,
  ...props
}) => {
  return (
    <VStack
      p="24px"
      gap={2}
      sx={{
        borderRadius: '24px',
        background:
          'linear-gradient(180deg, #EBF9EB -83.03%, #FFF 63.22%), #FFF',
        boxShadow:
          '0px 0px 0px 1px rgba(221, 221, 221, 0.13), 0px 146px 41px 0px rgba(163, 163, 163, 0.00), 0px 93px 37px 0px rgba(163, 163, 163, 0.01), 0px 53px 32px 0px rgba(163, 163, 163, 0.02), 0px 23px 23px 0px rgba(163, 163, 163, 0.03), 0px 6px 13px 0px rgba(163, 163, 163, 0.04)',
      }}
    >
      {variant == 'success' ? (
        <Icon icon={checkMarkIcon} width={40} height={40} color="#3D9A50" />
      ) : null}

      <Typography
        sx={{ color: variant === 'success' ? '#3D9A50' : undefined }}
        fontSize="24px"
        fontWeight="600"
      >
        {title}
      </Typography>

      <VStack>
        {dataPoints?.map((dataPoint, index) => (
          <VStack key={index} gap={0.5}>
            <Typography variant="subtitle2">{dataPoint.label}</Typography>
            <Typography variant="h3">{dataPoint.value}</Typography>
          </VStack>
        ))}
      </VStack>

      <HStack justify="space-between">
        <Typography>Processing</Typography>

        {ticketHref && (
          <Button
            variant="text"
            startIcon={<Icon icon={arrowCircleUpRight} />}
            sx={{ color: '#0091FF' }}
            LinkComponent={Link}
            href={ticketHref}
          >
            Ticket status
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default RequestSuccessCard;

import buildingBank16Filled from '@iconify/icons-fluent/building-bank-16-filled';
import contactCard16Filled from '@iconify/icons-fluent/contact-card-16-filled';
import { Icon } from '@iconify/react';
import { Chip, Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { HStack, VStack } from '@nq-capital/nui';
import { padId } from '@nq-capital/utils';
import { FC } from 'react';
import { RetrieveInvestorQuery } from '../../../../lib/gql/gql-client';
import { DataGroup } from './DataGroup';
import { DetailItemGrid } from './DetailItemGrid';

export interface InvestorDetailsTabProps {
  investor: RetrieveInvestorQuery['investor'];
}

export const InvestorDetailsTab: FC<InvestorDetailsTabProps> = ({
  investor,
  ...props
}) => {
  return (
    <>
      <VStack gap={4}>
        <DataGroup title="General info">
          <Grid container spacing={4} px={2} my={0} columns={2}>
            <DetailItemGrid size={2}>
              <Typography color="#808080">User ID</Typography>

              <Chip
                sx={{ lineHeight: '1', position: 'relative', top: '1px' }}
                label={padId(investor?.id || 0)}
                size="small"
              />
            </DetailItemGrid>

            <DetailItemGrid size={2}>
              <Typography color="#808080">Email</Typography>
              <Typography variant="h6" fontWeight="medium">
                {investor.email}
              </Typography>
            </DetailItemGrid>

            <DetailItemGrid size={2}>
              <Typography color="#808080">Mobile No</Typography>
              <Typography variant="h6" fontWeight="medium">
                {investor.mobile_number || '-'}
              </Typography>
            </DetailItemGrid>

            <DetailItemGrid size={2}>
              <Typography color="#808080">Nationality</Typography>
              <Typography variant="h6" fontWeight="medium">
                {investor.nationality?.toUpperCase() || '-'}
              </Typography>
            </DetailItemGrid>
          </Grid>
        </DataGroup>

        <DataGroup title="Identity">
          <Grid container spacing={4} px={2} my={0} columns={2}>
            <DetailItemGrid size={2}>
              <HStack color="#808080" gap={1} align="center">
                <Icon icon={contactCard16Filled} width={15} height={15} />
                <Typography color="inherit">National ID</Typography>
              </HStack>

              <HStack gap={4}>
                <TextBlock title="Issued" subtitle="" />
                <TextBlock title="Expires" subtitle="" />
              </HStack>
            </DetailItemGrid>

            <DetailItemGrid size={2}>
              <HStack color="#808080" gap={1} align="center">
                <Icon icon={contactCard16Filled} width={15} height={15} />
                <Typography color="inherit">Passport ID</Typography>
              </HStack>

              <HStack gap={4}>
                <TextBlock title="Issued" subtitle="" />
                <TextBlock title="Expires" subtitle="" />
              </HStack>
            </DetailItemGrid>
          </Grid>
        </DataGroup>

        <DataGroup title="Payment Sources">
          <Grid container spacing={4} px={2} my={0} columns={2}>
            {!investor.bank_accounts?.length && (
              <Typography variant="subtitle2" p={2}>
                User does not have any bank accounts
              </Typography>
            )}

            {investor?.bank_accounts?.map((account) => (
              <DetailItemGrid size={2} key={account.id}>
                <HStack color="#808080" gap={1} align="center">
                  <Icon icon={buildingBank16Filled} width={15} height={15} />
                  <Typography color="#202020">{account.bank_name}</Typography>
                </HStack>

                <HStack gap={0.8} ml={2}>
                  <Typography color="inherit">•••• ••••</Typography>
                  <Typography color="inherit">
                    {account.account_number.slice(-4)}{' '}
                  </Typography>
                </HStack>
              </DetailItemGrid>
            ))}
          </Grid>
        </DataGroup>
      </VStack>
    </>
  );
};

const TextBlock: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
  ...props
}) => {
  return (
    <VStack justify="center" gap={0.5}>
      <Typography color="#BBBBBB">{title}</Typography>
      <Typography variant="h6" color="#808080" fontWeight="medium">
        {subtitle || '-'}{' '}
      </Typography>
    </VStack>
  );
};

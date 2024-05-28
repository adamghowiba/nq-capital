import buildingBank16Filled from '@iconify/icons-fluent/building-bank-16-filled';
import contactCard16Filled from '@iconify/icons-fluent/contact-card-16-filled';
import { Icon } from '@iconify/react';
import {
  Chip,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import { HStack, VStack } from '@nq-capital/nui';
import { Screen } from '../../lib/components/Screen/Screen';
import { useRetrieveInvestorQuery } from '../../lib/gql/gql-client';
import { DataGroup } from '../../lib/modules/users/components/DataGroup';
import { DetailItemGrid } from '../../lib/modules/users/components/DetailItemGrid';
import UserDetailHeader from '../../lib/modules/users/components/UserDetailHeader';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { NextPageWithLayout } from '../_app';
import { padId } from '@nq-capital/utils';

/**
 * @todo
 * - [ ] Add transaction tab
 * - [ ] Add funds tab (with ability to see there stake, invested etc in each fund)
 * - [ ] Add delete action
 * - [ ] Add ability to edit basic details
 * - [ ] Add ability to send password reset email
 * - [ ] Add disable investor action
 */
const UserDetailPage: NextPageWithLayout = ({ ...props }) => {
  const router = useRouter();

  const investorId = router.query.userId ? (+router.query.userId as number) : 0;

  const investorQuery = useRetrieveInvestorQuery(
    { id: investorId },
    { enabled: !!investorId, select: (data) => data.investor }
  );

  if (investorQuery.isLoading) {
    return (
      <Screen>
        <CircularProgress />
      </Screen>
    );
  }

  if (investorQuery.isSuccess) {
    return (
      <>
        <Screen gap={4}>
          <UserDetailHeader
            firstName={investorQuery.data?.first_name}
            lastName={investorQuery.data?.last_name}
            email={investorQuery.data?.email}
            createdAt={investorQuery.data?.created_at}
          />

          <DataGroup title="General info">
            <Grid container spacing={4} px={2} my={0} columns={2}>
              <DetailItemGrid size={2}>
                <Typography color="#808080">User ID</Typography>

                <Chip
                  sx={{ lineHeight: '1', position: 'relative', top: '1px' }}
                  label={padId(investorQuery.data?.id || 0)}
                  size="small"
                />
              </DetailItemGrid>

              <DetailItemGrid size={2}>
                <Typography color="#808080">Email</Typography>
                <Typography variant="h6" fontWeight="medium">
                  {investorQuery.data.email}
                </Typography>
              </DetailItemGrid>

              <DetailItemGrid size={2}>
                <Typography color="#808080">Mobile No</Typography>
                <Typography variant="h6" fontWeight="medium">
                  {investorQuery.data.mobile_number || '-'}
                </Typography>
              </DetailItemGrid>

              <DetailItemGrid size={2}>
                <Typography color="#808080">Nationality</Typography>
                <Typography variant="h6" fontWeight="medium">
                  {investorQuery.data.nationality || '-'}
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
                  <TextBlock title="Issued" subtitle="3/10/22" />
                  <TextBlock title="Expires" subtitle="3/10/22" />
                </HStack>
              </DetailItemGrid>

              <DetailItemGrid size={2}>
                <HStack color="#808080" gap={1} align="center">
                  <Icon icon={contactCard16Filled} width={15} height={15} />
                  <Typography color="inherit">Passport ID</Typography>
                </HStack>

                <HStack gap={4}>
                  <TextBlock title="Issued" subtitle="3/10/22" />
                  <TextBlock title="Expires" subtitle="3/10/22" />
                </HStack>
              </DetailItemGrid>
            </Grid>
          </DataGroup>

          <DataGroup title="Payment Sources">
            <Grid container spacing={4} px={2} my={0} columns={2}>
              {investorQuery.data?.bank_accounts?.map((account) => (
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
        </Screen>
      </>
    );
  }
};

const TextBlock: FC<{ title: string; subtitle: string }> = ({
  subtitle,
  title,
  ...props
}) => {
  return (
    <VStack justify="center" gap={0.5}>
      <Typography color="#BBBBBB">Issued</Typography>
      <Typography variant="h6" color="#808080" fontWeight="medium">
        {'3/10/22' || '-'}{' '}
      </Typography>
    </VStack>
  );
};

export default UserDetailPage;

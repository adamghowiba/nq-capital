import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  CircularProgress,
  Tab
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Screen } from '../../lib/components/Screen/Screen';
import { useRetrieveInvestorQuery } from '../../lib/gql/gql-client';
import { InvestmentsTab } from '../../lib/modules/users/components/InvestmentsTab';
import { InvestorDetailsTab } from '../../lib/modules/users/components/InvestorDetailsTab';
import UserDetailHeader from '../../lib/modules/users/components/UserDetailHeader';
import { NextPageWithLayout } from '../_app';

type UserTab = 'details' | 'investments';

/**
 * @todo
 * - [ ] Add funds tab (with ability to see there stake, invested etc in each fund)
 * - [ ] Add delete action
 * - [ ] Add ability to edit basic details
 * - [ ] Add ability to send password reset email
 * - [ ] Add disable investor action
 */
const UserDetailPage: NextPageWithLayout = ({ ...props }) => {
  const [tab, setTab] = useState<UserTab>('details');
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

          <TabContext value={tab}>
            <TabList
              onChange={(event, value) => setTab(value as UserTab)}
              TabIndicatorProps={{ sx: { backgroundColor: '#5B5BD6' } }}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Tab value="details" label="Details" />
              <Tab value="investments" label="Investments" />
            </TabList>

            <TabPanel value="details" sx={{ p: 0 }}>
              <InvestorDetailsTab investor={investorQuery.data} />
            </TabPanel>

            <TabPanel value="investments" sx={{ p: 0 }}>
              <InvestmentsTab investorId={investorQuery.data.id} />
            </TabPanel>
          </TabContext>
        </Screen>
      </>
    );
  }
};

export default UserDetailPage;

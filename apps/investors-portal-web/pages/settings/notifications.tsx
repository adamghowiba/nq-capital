import { Alert, AlertTitle } from '@mui/material';
import { InferGetServerSidePropsType } from 'next';
import SettingsLayout from '../../lib/layouts/SettingsLayout';
import { getInvestorSSP } from '../../lib/modules/settings/get-investor-ssr';
import { NextPageWithLayout } from '../_app';

const SettingsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ investor, ...props }) => {
  return (
    <>
      <Alert severity="warning">
        <AlertTitle>Notification settings are currently disabled</AlertTitle>
        We are currently working on this feature. Please check back later.
      </Alert>
    </>
  );
};

export const getServerSideProps = getInvestorSSP();

SettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default SettingsPage;

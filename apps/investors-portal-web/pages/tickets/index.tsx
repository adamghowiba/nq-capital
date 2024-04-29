import React, { FC } from 'react';
import { NextPageWithLayout } from '../_app';
import Screen from 'apps/investors-portal-web/lib/components/Screen/Screen';
import PageHeader from 'apps/investors-portal-web/lib/components/PageHeader/PageHeader';
import CustomDataGrid from 'apps/investors-portal-web/lib/components/StyledDataGrid/CustomDataGrid';

const TicketsPage: NextPageWithLayout = ({ ...props }) => {
  return (
    <>
      <Screen gap={0.5}>
        <PageHeader title="Tickers" />

        {/* <CustomDataGrid


        /> */}
      </Screen>
    </>
  );
};

export default TicketsPage;

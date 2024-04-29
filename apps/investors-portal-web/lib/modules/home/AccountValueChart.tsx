import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Tab,
  TabProps,
  Tabs,
  TabsProps,
  Typography,
  styled,
} from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import dynamic from 'next/dynamic';
import React, { FC, useState } from 'react';
import { StyledTab, StyledTabs } from '../../components/Tabs/StyledTabs';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type DateFilter = 'year' | 'month';

export interface AccountValueChartProps {
  data?: any;
  dateFilter: DateFilter
  onChangeDateFilter: (dateFilter: DateFilter) => void;
}

const AccountValueChart: FC<AccountValueChartProps> = ({
  dateFilter,
  onChangeDateFilter,
  ...props
}) => {

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={<Typography variant="h5"> Total Account Value </Typography>}
          sx={{
            px: '24px',
            pt: '24px',
          }}
          action={
            <>
              <StyledTabs
                value={dateFilter}
                onChange={(e, value) => onChangeDateFilter(value as DateFilter)}
              >
                <StyledTab label="Month" value="month" />
                <StyledTab label="Year" value="year" />
              </StyledTabs>
            </>
          }
        />

        <CardContent
          sx={{
            '&.MuiCardContent-root': {
              pb: 2,
            },
          }}
        >
          <ApexChart
            type="area"
            height={290}
            series={[
              {
                name: 'Account value',
                data: [90, 40, 10, 140, 120, 400],
              },
            ]}
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: 'straight',
              },
              xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

                labels: {
                  style: {
                    colors: '#BBBBBB',
                  },
                },
              },
              grid: {
                show: false,
              },
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AccountValueChart;

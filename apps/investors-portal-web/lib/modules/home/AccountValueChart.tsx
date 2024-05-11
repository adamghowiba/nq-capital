import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { StyledTab, StyledTabs } from '../../components/Tabs/StyledTabs';
import {
  Timespan,
  usePortfolioPerformance,
} from '../transactions/use-perfromance.hook';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface AccountValueChartProps {
  data?: any;
  dateFilter: Timespan;
  onChangeDateFilter: (dateFilter: Timespan) => void;
}

const AccountValueChart: FC<AccountValueChartProps> = ({
  dateFilter,
  onChangeDateFilter,
  ...props
}) => {
  const performance = usePortfolioPerformance({ timespan: dateFilter });

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
                onChange={(e, value) => onChangeDateFilter(value as Timespan)}
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
                data: performance.aggregatedTransactions.map((transaction) => {
                  return transaction.amount;
                }),
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
              yaxis: {
                tickAmount: 6,
              },
              xaxis: {
                categories: performance.timespanDates.map((date) =>
                  dateFilter === 'year'
                    ? date.monthShort
                    : date.toFormat('MM-dd')
                ),
                tickAmount: 5,
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

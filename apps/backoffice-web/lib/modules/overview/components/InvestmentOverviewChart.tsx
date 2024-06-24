import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { useFundHistoryOverviewQuery } from '../../../../lib/gql/gql-client';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface InvestmentOverviewChart {}

const InvestmentOverviewChart: FC<InvestmentOverviewChart> = ({ ...props }) => {
  const overviewQuery = useFundHistoryOverviewQuery(
    {
      timespan: 'YEAR',
    },
    { select: (data) => data.fundsHistory }
  );

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={<Typography variant="h5"> Daily Investment </Typography>}
          subheader="Mar 2024"
          sx={{
            px: '24px',
            pt: '24px',
          }}
        />

        <CardContent
          sx={{
            '&.MuiCardContent-root': {
              pb: 1,
              pt: 0,
            },
          }}
        >
          <ApexChart
            type="area"
            height={240}
            series={[
              {
                name: 'Account value',
                data: overviewQuery.data?.data.map((item) => ({
                  x: item.date,
                  y: item.amount,
                })) || [],
              },
            ]}
            options={{
              colors: ['#5B5BD6'],
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
                width: 2,
              },
              fill: {
                gradient: {
                  shadeIntensity: 0.9,
                },
              },
              yaxis: {
                tickAmount: 6,
              },
              xaxis: {
                type: 'datetime',
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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

export default InvestmentOverviewChart;

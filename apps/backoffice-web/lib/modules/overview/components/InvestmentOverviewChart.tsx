import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface InvestmentOverviewChart {}

const InvestmentOverviewChart: FC<InvestmentOverviewChart> = ({ ...props }) => {
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
              pt: 0
            },
          }}
        >
          <ApexChart
            type="area"
            height={240}
            series={[
              {
                name: 'Account value',
                data: [100, 150, 120, 300, 190, 490],
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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

export default InvestmentOverviewChart;

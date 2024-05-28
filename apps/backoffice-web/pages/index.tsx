import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import {
  BarList,
  HStack,
  KPICard,
  KPICardChange,
  KPICardTitle,
  KPICardValue,
  PageHeader,
  VStack,
} from '@nq-capital/nui';
import { formatUSDCurrency } from '@nq-capital/utils';
import { Screen } from '../lib/components/Screen/Screen';
import {
  useFundOverviewQuery,
  useGetFundInvestorsOverviewQuery
} from '../lib/gql/gql-client';
import InvestmentOverviewChart from '../lib/modules/overview/components/InvestmentOverviewChart';

export function Index() {
  const fundOverview = useFundOverviewQuery(
    {},
    { select: (data) => data.fundOverview }
  );

  // const funds = useListFundsQuery({}, { select: (data) => data.funds });

  const fundInvestorsOverview = useGetFundInvestorsOverviewQuery(
    {},
    { select: (data) => data.fundInvestorsOverview }
  );

  return (
    <>
      <Screen gap={3}>
        <PageHeader title="Overview" />

        <HStack gap={3}>
          <KPICard>
            <KPICardTitle tooltip="Total amount invested across all funds">
              Total Invested
            </KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>
                {formatUSDCurrency(fundOverview.data?.invested_amount || 0)}
              </KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>
            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>

          <KPICard>
            <KPICardTitle tooltip="Accumulated value for all funds">
              Current Value
            </KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>
                {formatUSDCurrency(fundOverview.data?.current_amount || 0)}
              </KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>
            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>

          <KPICard>
            <KPICardTitle tooltip="Total net returns for all funds. e.g PN/L">
              Net Returns
            </KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>
                {formatUSDCurrency(fundOverview.data?.net_returns || 0)}
              </KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>

            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>
        </HStack>

        <InvestmentOverviewChart />

        <HStack gap={3} align="start">
          <Card sx={{ width: '100%' }} variant="outlined">
            <CardHeader
              title="Investment Distribution"
              subheader="Total $4,320"
            />
            <CardContent sx={{ minHeight: '200px' }}>
              {fundInvestorsOverview.isSuccess &&
                !fundInvestorsOverview.data.length && (
                  <VStack w="100%" h="186px" align="center" justify="center">
                    <Typography>No data available</Typography>
                  </VStack>
                )}

              <BarList
                valueFormatter={(value) => formatUSDCurrency(value || 0)}
                data={
                  fundInvestorsOverview.data?.map((investor) => ({
                    name: investor.first_name,
                    value: investor.invested_amount,
                  })) || []
                }
              />
            </CardContent>
          </Card>

          <Card sx={{ width: '100%', alignSelf: 'stretch' }} variant="outlined">
            <CardHeader title="Investment Performance" subheader="Mar 2024" />
            <CardContent>
              <Alert severity="warning">
                <AlertTitle>Under construction</AlertTitle>
                This component is still being built, stand by!
              </Alert>
            </CardContent>
          </Card>
        </HStack>
      </Screen>
    </>
  );
}

export default Index;

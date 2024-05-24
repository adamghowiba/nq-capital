import {
  HStack,
  KPICard,
  KPICardChange,
  KPICardTitle,
  KPICardValue,
  PageHeader,
  Stat,
} from '@nq-capital/nui';
import { Screen } from '../lib/components/Screen/Screen';
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import InvestmentOverviewChart from '../lib/modules/overview/components/InvestmentOverviewChart';
import { useListFundsQuery } from '../lib/gql/gql-client';
import { useState } from 'react';

export function Index() {
  const [selectedFundIds, setSelectedFundIds] = useState<number[]>([]);
  const funds = useListFundsQuery({}, { select: (data) => data.funds });

  console.log(selectedFundIds);

  return (
    <>
      <Screen gap={3}>
        <PageHeader
          title="Overview"
          actions={
            <>
              <FormControl size="small">
                <InputLabel>Fund</InputLabel>
                <Select
                  multiple
                  value={selectedFundIds}
                  onChange={(event) =>
                    setSelectedFundIds(event.target.value as number[])
                  }
                  MenuProps={{
                    BackdropProps: {
                      sx: {
                        opacity: 0,
                      },
                    },
                  }}
                  label="Fund"
                  placeholder="Fund"
                  inputProps={{
                    sx: {
                      minWidth: '200px',
                    },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" sx={{display: 'none'}}>All</MenuItem>

                  {funds.data?.map((fund) => {
                    return (
                      <MenuItem key={fund.id} value={fund.id}>
                        {fund.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </>
          }
        />

        <HStack gap={3}>
          <KPICard>
            <KPICardTitle>Total Investment</KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>$150,736</KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>
            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>

          <KPICard>
            <KPICardTitle>Current Value</KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>$150,736</KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>
            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>

          <KPICard>
            <KPICardTitle>Net Returns</KPICardTitle>

            <HStack gap={1}>
              <KPICardValue>$150,736</KPICardValue>
              <KPICardChange type="increase">+ $2,736</KPICardChange>
            </HStack>
            <Typography variant="subtitle2">vs last month</Typography>
          </KPICard>
        </HStack>

        <InvestmentOverviewChart />

        <HStack gap={3}>
          <Card sx={{ width: '100%' }} variant="outlined">
            <CardHeader title="Investment Distribution" subheader="Mar 2024" />
            <CardContent></CardContent>
          </Card>

          <Card sx={{ width: '100%' }} variant="outlined">
            <CardHeader title="Investment Performance" subheader="Mar 2024" />
            <CardContent></CardContent>
          </Card>
        </HStack>
      </Screen>
    </>
  );
}

export default Index;

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import {
  Box,
  HStack,
  NCurrencyField,
  NDateField,
  NTextField,
  VStack,
} from '@nq-capital/nui';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import {
  useAddInvestmentMutation,
  useInvestorPortfolioQuery,
} from '../../../lib/gql/gql-client';
import { useInvestor } from '../../../lib/hooks/use-investor';
import OnboardingTopbar from '../../../lib/modules/onboarding/components/OnboardingTopbar';
import RequestSuccessCard from '../../../lib/modules/requests/components/RequestSuccessCard';
import {
  InvestmentRequest,
  investmentRequest,
} from '../../../lib/modules/requests/request.schema';
import { formatUSDCurrency } from '../../../lib/utils/currency.utils';
import { NextPageWithLayout } from '../../_app';

const STEPS = ['details', 'review', 'success'] as const;
type Step = (typeof STEPS)[number];

const WithdrawRequestPage: NextPageWithLayout = ({ ...props }) => {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const investor = useInvestor();

  const router = useRouter();

  const form = useForm<InvestmentRequest>({
    defaultValues: {
      amount: 0,
      bank_account_id: 0,
      comments: '',
      investment_date: '',
    },
    resolver: zodResolver(investmentRequest),
  });

  const investorPortfolio = useInvestorPortfolioQuery(
    { id: investor?.data?.id || 0 },
    { enabled: !!investor?.data?.id, select: (data) => data.investorPortfolio }
  );

  const data = form.watch();
  const currentStepIndex = STEPS.indexOf(currentStep);

  const handleSubmit: SubmitHandler<InvestmentRequest> = (data) => {
    // TODO: Handle submit
  };

  const handleBackClick = () => {
    if (currentStepIndex === 0 || currentStepIndex === -1) return;

    setCurrentStep(STEPS[currentStepIndex - 1]);
  };

  const handleNextClick = async () => {
    if (currentStepIndex === STEPS.length - 1 || currentStepIndex === -1)
      return;

    const valid = await form.trigger();
    if (!valid) return;

    setCurrentStep(STEPS[currentStepIndex + 1]);
  };

  const handleValidateAmount = () => {
    const balance = investorPortfolio.data?.total_balance || 0;
    const amount = data.amount;

    if (amount > balance) {
      form.setError('amount', {
        type: 'min',
        message: `You cannot withdraw more than your current balance of ${formatUSDCurrency(
          balance
        )}`,
      });
      return;
    }

    form.clearErrors('amount');
  };

  return (
    <>
      <OnboardingTopbar
        currentStep={currentStepIndex}
        onNext={handleNextClick}
        onBack={handleBackClick}
        totalSteps={STEPS.length}
        onClose={() => router.push('/')}
      />

      {currentStep === 'success' ? (
        <VStack
          height="calc(100vh - 48px)"
          maxWidth="500px"
          mx="auto"
          justify="center"
          gap={2}
        >
          <RequestSuccessCard
            title="Investment request submitted"
            variant="success"
            status="processing"
            ticketHref="/requests/investment/1"
            dataPoints={[
              {
                label: 'Checking',
                value: formatUSDCurrency(data.amount || 0),
              },
            ]}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            LinkComponent={Link}
            href="/requests/investment/1"
          >
            View payment request
          </Button>

          <Button variant="outlined" LinkComponent={Link} href="/transactions">
            Exit
          </Button>
        </VStack>
      ) : (
        <VStack
          height="calc(100vh - 48px)"
          overflow="hidden"
          align="center"
          justify="center"
        >
          <Box mx="auto" overflow="auto" maxWidth="600px" width="100%">
            {currentStep === 'details' && (
              <>
                <Typography variant="h3">Withdraw request</Typography>
                <Typography variant="subtitle2" mb={3}>
                  Request a withdrawal from your investment account
                </Typography>

                <VStack gap={3}>
                  <NCurrencyField
                    control={form.control}
                    label="Amount"
                    name="amount"
                    onBlur={handleValidateAmount}
                    helperText={
                      <VStack justify="space-between">
                        <span>Amount you would like to invest in USD</span>

                        <Box color="grey.900" fontWeight="medium">
                          Current Balance:{' '}
                          {formatUSDCurrency(
                            investorPortfolio.data?.total_balance
                          )}
                        </Box>
                      </VStack>
                    }
                  />

                  <NTextField
                    control={form.control}
                    name="comments"
                    label="Comments"
                    multiline
                    fullWidth
                    rows={5}
                  />
                </VStack>
              </>
            )}

            {currentStep === 'review' && (
              <>
                <Typography variant="h3">Review Withdraw</Typography>
                <Typography variant="subtitle2" mb={3}>
                  Review the below details to ensure they are correct. Once the
                  withdraw has been processed we will send you a notification.
                </Typography>

                <VStack>
                  <VStack>
                    <Typography variant="caption">Withdrawing</Typography>
                    <Typography variant="h1">
                      {formatUSDCurrency(data.amount || 0)}
                    </Typography>
                  </VStack>

                  <Divider sx={{ my: 3 }} />

                  <VStack gap={2}>
                    <HStack>
                      <Typography
                        sx={{ width: '200px', color: '#808080' }}
                        flexShrink={0}
                      >
                        Request date
                      </Typography>
                      <Typography>
                        {DateTime.now().toLocaleString(
                          DateTime.DATE_FULL
                        )}
                      </Typography>
                    </HStack>

                    <HStack>
                      <Typography
                        sx={{ width: '200px', color: '#808080' }}
                        flexShrink={0}
                      >
                        Payment Mode
                      </Typography>
                      <Typography>Bank Transfer</Typography>
                    </HStack>

                    <HStack>
                      <Typography
                        sx={{ width: '200px', color: '#808080' }}
                        flexShrink={0}
                      >
                        Bank Account
                      </Typography>

                      <Typography>1231 12313 12</Typography>
                    </HStack>
                  </VStack>

                  <Divider sx={{ my: 3 }} />

                  <HStack>
                    <Typography
                      sx={{ width: '200px', color: '#808080' }}
                      flexShrink={0}
                    >
                      Comment
                    </Typography>
                    <Typography>{data?.comments || '-'}</Typography>
                  </HStack>
                </VStack>
              </>
            )}

            <HStack mt={5} gap={3}>
              {currentStepIndex > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth={false}
                  onClick={handleBackClick}
                >
                  Back
                </Button>
              )}

              <LoadingButton
                variant="contained"
                color="primary"
                fullWidth
                onClick={
                  currentStep === 'review'
                    ? form.handleSubmit(handleSubmit, console.error)
                    : handleNextClick
                }
                // loading={investmentMutation.isPending}
              >
                {currentStep === 'details' ? 'Review' : 'Submit'}
              </LoadingButton>
            </HStack>
          </Box>
        </VStack>
      )}
    </>
  );
};

WithdrawRequestPage.getLayout = (page) => page;

export default WithdrawRequestPage;

import { Box, Dialog } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import InvestmentDialogHeader from '../Investment/investmentDialogHeader';
import NewWithdrawalForm, {
    NewWithdrawal,
    RegisteredAccount,
} from './newWithdrawalForm';
import NewWithdrawalSummary from './newWithdrawalSummary';

interface WithdrawalDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}
export default function WithdrawalDialog({
  isDialogOpen,
  closeDialog,
}: WithdrawalDialogProps) {
  //TODO: GET THIS DATA FROM LOADING REGISTERD ACCOUNTS
  const [isLoadingRegisteredAccounts, setIsLoadingRegisteredAccounts] =
    useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingRegisteredAccounts(false);
    }, 3000);
  }, []);
  //TODO: CALL API HERE TO FETCH REGISTERED ACCOUNTS
  const registeredAccounts: RegisteredAccount[] = [
    {
      id: '1',
      account_holder_name: 'John Doe',
      account_type: 'Savings',
      bank_account_number: '1234567890',
      bank_address: 'Bank of America',
      bank_country: 'United States',
      bank_name: 'Bank of America',
      bank_routing_number: '123456789',
      IBAN: '1234567890',
      swift_code: '1234567890',
    },
  ];

  const [currentStep, setCurrentStep] = useState<FormStep>('form');
  const FORM_STEPS = ['form', 'summary', 'created'] as const;
  const TOTAL_STEPS = FORM_STEPS.length;
  type FormStep = (typeof FORM_STEPS)[number];
  const currentStepIndex = FORM_STEPS.indexOf(currentStep);
  const [maxAccessibleStep, setMaxAccessibleStep] = useState<number>(0);

  function handleNext(isNav?: boolean) {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex > TOTAL_STEPS - 1) return;
    if (isNav) {
      if (maxAccessibleStep >= nextStepIndex)
        setCurrentStep(FORM_STEPS[nextStepIndex]);
    } else {
      if (maxAccessibleStep <= nextStepIndex)
        setMaxAccessibleStep(nextStepIndex);
      setCurrentStep(FORM_STEPS[nextStepIndex]);
    }
  }

  function handleBack() {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex < 0) return;
    setCurrentStep(FORM_STEPS[previousStepIndex]);
  }

  function close() {
    setCurrentStep('form');
    setMaxAccessibleStep(0);
    closeDialog();
  }

  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);
  const [newWithdrawalData, setNewWithdrawalData] = useState<NewWithdrawal>({
    accountId: '',
    amount: 0,
    withdrawalDate: new Date(),
    comment: '',
  });

  const stepComponent: Record<FormStep, ReactNode> = {
    form: (
      <NewWithdrawalForm
        isSubmittingTicket={isSubmittingTicket}
        onBack={handleBack}
        onReview={(data) => {
          setNewWithdrawalData(data);
          handleNext();
        }}
        data={newWithdrawalData}
        registeredAccounts={registeredAccounts}
        isLoadingRegisteredAccounts={isLoadingRegisteredAccounts}
      />
    ),
    summary: (
      <NewWithdrawalSummary
        data={newWithdrawalData}
        isSubmittingTicket={isSubmittingTicket}
        onBack={handleBack}
        onSubmit={(data) => alert(data)}
        registeredAccounts={registeredAccounts}
      />
    ),
    created: <Box>Created Ticket</Box>,
  };

  return (
    <Dialog
      open={isDialogOpen}
      fullScreen
      onClose={close}
      sx={{
        '& .MuiPaper-root': {
          ...(currentStep === 'created'
            ? {
                height: '100%',
                display: 'grid',
                gridTemplateRows: 'auto 1fr',
              }
            : {}),
        },
      }}
    >
      <InvestmentDialogHeader
        currentStep={currentStepIndex + 1}
        // -1 because the created step is not counted
        totalSteps={TOTAL_STEPS - 1}
        handleBack={handleBack}
        handleNext={() => handleNext(true)}
        onClose={close}
        isCreated={currentStep === 'created'}
        isSubmitting={isSubmittingTicket}
      />
      <Box sx={{ padding: '40px 0', display: 'grid', justifyItems: 'center' }}>
        {stepComponent[currentStep]}
      </Box>
    </Dialog>
  );
}
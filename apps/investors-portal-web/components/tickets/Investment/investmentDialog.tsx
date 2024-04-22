import { Box, Dialog } from '@mui/material';
import { useState } from 'react';
import InvestmentDialogHeader from './investmentDialogHeader';
import NewInvestmentForm, { NewInvestment } from './newInvestmentForm';
import NewInvestmentSummary from './newInvestmentSummary';

interface InvestmentDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}
export default function InvestmentDialog({
  closeDialog,
  isDialogOpen,
}: InvestmentDialogProps) {
  function close() {
    closeDialog();
    setNewInvestmentData({
      receiver: '',
      amount: 0,
      investmentDate: new Date(),
      paymentMode: '',
      comment: '',
    });
  }

  const [currentStep, setCurrentStep] = useState<FormStep>('form');
  const FORM_STEPS = ['form', 'summary'] as const;
  const TOTAL_STEPS = FORM_STEPS.length;
  type FormStep = (typeof FORM_STEPS)[number];
  const currentStepIndex = FORM_STEPS.indexOf(currentStep);

  function handleNext() {
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex > TOTAL_STEPS - 1) return;

    setCurrentStep(FORM_STEPS[nextStepIndex]);
  }

  function handleBack() {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex < 0) return;
    setCurrentStep(FORM_STEPS[previousStepIndex]);
  }

  const investmentReceivers = [
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'janesmith@mail.com',
      id: 'uuidv4',
    },
  ];
  const [newInvestmentData, setNewInvestmentData] = useState<NewInvestment>({
    receiver: '',
    amount: 0,
    investmentDate: new Date(),
    paymentMode: '',
    comment: '',
  });

  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  const stepComponent: Record<FormStep, JSX.Element> = {
    form: (
      <NewInvestmentForm
        investmentReceivers={investmentReceivers}
        onReview={(data) => {
          setNewInvestmentData(data);
          handleNext();
        }}
        onBack={close}
        isSubmittingTicket={isSubmittingTicket}
        data={newInvestmentData}
      />
    ),
    summary: <Box>Summary</Box>,
  };

  return (
    <Dialog open={isDialogOpen} fullScreen onClose={close}>
      <InvestmentDialogHeader
        currentStep={currentStepIndex + 1}
        totalSteps={TOTAL_STEPS}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <Box sx={{ padding: '40px 0', display: 'grid', justifyItems: 'center' }}>
        {stepComponent[currentStep]}
      </Box>
    </Dialog>
  );
}

import { Box, Dialog } from '@mui/material';
import { ReactNode, useState } from 'react';
import InvestmentCreated from './investmentCreated';
import InvestmentDialogHeader from './investmentDialogHeader';
import NewInvestmentForm, { NewInvestment } from './newInvestmentForm';
import NewInvestmentSummary from './newInvestmentSummary';

interface InvestmentDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

interface Investment extends NewInvestment {
  id: string;
}

export default function InvestmentDialog({
  closeDialog,
  isDialogOpen,
}: InvestmentDialogProps) {
  const initialInvestmentState: NewInvestment = {
    receiver: '',
    amount: 0,
    investmentDate: new Date(),
    paymentMode: '',
    comment: '',
  };

  function createNew() {
    setCurrentStep('form');
    setMaxAccessibleStep(0);
    setCreatedInvestment(null);
    setNewInvestmentData(initialInvestmentState);
  }

  function close() {
    closeDialog();
    createNew();
  }

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

  const [createdInvestment, setCreatedInvestment] = useState<Investment | null>(
    null
  );

  function submitInvestment(data: NewInvestment) {
    //TODO: CALL API HERE TO CREATE NEW INVESTMENT
    setIsSubmittingTicket(true);
    setTimeout(() => {
      setIsSubmittingTicket(false);
      setNewInvestmentData(initialInvestmentState);
      //TODO: GET THIS DATA FROM API AFTER CREATION
      setCreatedInvestment({ ...data, id: 'uuidv4' });
      handleNext();
    }, 2000);
  }

  const investmentReceivers = [
    {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'janesmith@mail.com',
      id: 'uuidv4',
    },
  ];
  const [newInvestmentData, setNewInvestmentData] = useState<NewInvestment>(
    initialInvestmentState
  );

  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  const stepComponent: Record<FormStep, ReactNode> = {
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
    summary: (
      <NewInvestmentSummary
        data={newInvestmentData}
        receivers={investmentReceivers}
        isSubmittingTicket={isSubmittingTicket}
        onBack={handleBack}
        onSubmit={(data: NewInvestment) => submitInvestment(data)}
      />
    ),
    created: createdInvestment && (
      <InvestmentCreated
        amount={createdInvestment.amount}
        createNew={createNew}
        close={close}
        ticketId={createdInvestment.id}
      />
    ),
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
        totalSteps={TOTAL_STEPS}
        handleBack={handleBack}
        handleNext={() => handleNext(true)}
        onClose={close}
        isCreated={currentStep === 'created'}
      />
      <Box sx={{ padding: '40px 0', display: 'grid', justifyItems: 'center' }}>
        {stepComponent[currentStep]}
      </Box>
    </Dialog>
  );
}

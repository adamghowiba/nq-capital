import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import StepHeader from '../../onboarding/stepHeader';
import { InvestmentReceiver, NewInvestment } from './newInvestmentForm';

interface NewInvestmentSummaryProps {
  data: NewInvestment;
  receivers: InvestmentReceiver[];
  isSubmittingTicket: boolean;
  onBack: () => void;
  onSubmit: (data: NewInvestment) => void;
}

export default function NewInvestmentSummary({
  data: { amount, comment, investmentDate, paymentMode, receiver },
  data,
  receivers,
  isSubmittingTicket,
  onBack,
  onSubmit,
}: NewInvestmentSummaryProps) {
  const receiverData = receivers.find((r) => r.id === receiver);
  //TODO: FETCH THIS DATA FROM USER PFOFILE
  const activeUser = 'John Doe';
  const { formatDate, formatNumber } = useIntl();
  return (
    <Box sx={{ width: '604px', display: 'grid', rowGap: 5 }}>
      <StepHeader
        title="Review Details"
        subtitle="Verify investment information before finalizing"
        gap={1}
      />
      <Box sx={{ display: 'grid', rowGap: 1 }}>
        <Box sx={{ display: 'grid' }}>
          <Typography py={0} sx={{ color: '#808080', fontWeight: 500 }}>
            Send
          </Typography>
          <Typography variant="h2" py={0}>{`${formatNumber(amount, {
            style: 'currency',
            currency: 'USD',
          })}`}</Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            columnGap: 1,
          }}
        >
          <Typography sx={{ color: '#808080' }}>To:</Typography>
          <Typography variant="h5" py={0}>
            {`${receiverData?.first_name} ${receiverData?.last_name}`}{' '}
            <Typography component="span" sx={{ color: '#808080' }}>
              {receiverData?.email}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ paddingY: '7.5px' }} />

        {[
          { title: 'From', value: activeUser },
          {
            title: 'Date',
            value: formatDate(investmentDate, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
          },
          { title: 'Payment Mode', value: paymentMode },
        ].map(({ title, value }, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 4fr',
              alignItems: 'center',
              columnGap: 1,
              py: '12px',
            }}
          >
            <Typography sx={{ color: '#808080' }}>{title}</Typography>
            <Typography variant="h5" py={0}>
              {value}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ paddingY: '7.5px' }} />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 4fr',
            alignItems: 'center',
            columnGap: 1,
            py: '12px',
          }}
        >
          <Typography sx={{ color: '#808080' }}>Comments</Typography>
          <Typography variant="h5" py={0}>
            {comment}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 1,
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={onBack}
          disabled={isSubmittingTicket}
        >
          Back
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => onSubmit(data)}
          disabled={isSubmittingTicket}
          endIcon={isSubmittingTicket ? <CircularProgress size={20} /> : null}
        >
          Create Payment Link
        </Button>
      </Box>
    </Box>
  );
}

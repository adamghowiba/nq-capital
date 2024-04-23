import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import StepHeader from '../../onboarding/stepHeader';
import { NewWithdrawal, RegisteredAccount } from './newWithdrawalForm';

interface NewInvestmentSummaryProps {
  data: NewWithdrawal;
  registeredAccounts: RegisteredAccount[];
  isSubmittingTicket: boolean;
  onBack: () => void;
  onSubmit: (data: NewWithdrawal) => void;
}

export default function NewWithdrawalSummary({
  data: { amount, comment, accountId, withdrawalDate },
  data,
  registeredAccounts,
  isSubmittingTicket,
  onBack,
  onSubmit,
}: NewInvestmentSummaryProps) {
  const accountData = registeredAccounts.find(
    (account) => account.id === accountId
  );
  const { formatDate, formatNumber } = useIntl();
  return (
    <Box sx={{ width: '604px', display: 'grid', rowGap: 5 }}>
      <StepHeader
        title="Review Details"
        subtitle="Verify withdraw information before finalizing"
        gap={1}
      />
      <Box sx={{ display: 'grid', rowGap: 1 }}>
        <Box sx={{ display: 'grid' }}>
          <Typography py={0} sx={{ color: '#808080', fontWeight: 500 }}>
            Withdrawal Amount
          </Typography>
          <Typography variant="h2" py={0}>{`${formatNumber(amount, {
            style: 'currency',
            currency: 'USD',
          })}`}</Typography>
        </Box>

        <Divider sx={{ paddingY: '7.5px' }} />

        {[
          {
            title: 'Destination Account',
            value: `${accountData?.bank_name} (${accountData?.account_type})`,
          },
          {
            title: 'Date',
            value: formatDate(withdrawalDate, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
          },
        ].map(({ title, value }, index) => (
          <Box
            key={index}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 4fr',
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
          Confirm Details
        </Button>
      </Box>
    </Box>
  );
}

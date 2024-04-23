import increase from '@iconify/icons-fluent/arrow-circle-up-right-24-filled';
import checkmark from '@iconify/icons-fluent/checkmark-circle-48-filled';
import dot from '@iconify/icons-fluent/circle-24-filled';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Withdrawal } from './WithdrawalDialog';
import { RegisteredAccount } from './newWithdrawalForm';
interface WithdrawalCreatedProps {
  createNew: () => void;
  close: () => void;
  withdrawal: Withdrawal;
  registeredAccounts: RegisteredAccount[];
}
export default function WithdrawalCreated({
  createNew,
  close,
  registeredAccounts,
  withdrawal: { amount, id: ticketId, accountId },
}: WithdrawalCreatedProps) {
  const { formatNumber } = useIntl();
  const { push } = useRouter();
  //TODO: FETCH THIS DATA FROM USER PFOFILE
  const accountData = registeredAccounts.find(
    (account) => account.id === accountId
  );
  return (
    <Box
      sx={{
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        display: 'grid',
        rowGap: 5,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          rowGap: 3,
          borderRadius: 3,
          padding: 3,
          background:
            'linear-gradient(180deg, #EBF9EB -83.03%, #FFF 63.22%), #FFF',
          boxShadow:
            '0px 0px 0px 1px rgba(221, 221, 221, 0.13), 0px 146px 41px 0px rgba(163, 163, 163, 0.00), 0px 93px 37px 0px rgba(163, 163, 163, 0.01), 0px 53px 32px 0px rgba(163, 163, 163, 0.02), 0px 23px 23px 0px rgba(163, 163, 163, 0.03), 0px 6px 13px 0px rgba(163, 163, 163, 0.04)',
        }}
      >
        <Box sx={{ display: 'grid', rowGap: 2 }}>
          <Icon icon={checkmark} fontSize={50} color="#46A758" />
          <Typography variant="h2" py={0} color="#3D9A50">
            Withdraw request submitted
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', rowGap: 1.5 }}>
          <Typography variant="h5" py={0} color="#8D8D8D">
            {`To ${accountData?.bank_name} (${accountData?.account_type})`}
          </Typography>
          <Typography variant="h2" py={0}>
            {formatNumber(amount, { style: 'currency', currency: 'USD' })}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              columnGap: 0.8,
            }}
          >
            <Icon icon={dot} fontSize={12} color="#FFBA1A" />
            <Typography variant="h5" py={0}>
              Processing
            </Typography>
          </Box>

          <Button
            variant="text"
            color="primary"
            endIcon={<Icon icon={increase} fontSize={20} color="#0091FF" />}
            sx={{ color: '#0091FF' }}
            onClick={() => push(`/tickets/${ticketId}`)}
          >
            Track Status
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', rowGap: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => push('/')}
        >
          Go to Dashboard
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="inherit"
          onClick={createNew}
        >
          Create Another
        </Button>
      </Box>
    </Box>
  );
}

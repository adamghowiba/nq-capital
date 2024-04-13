import dismiss from '@iconify/icons-fluent/dismiss-24-regular';
import { Box } from '@mui/material';
import DContainer from '../DContainer/DContainer';
import Logo from '../Logo/logo';
import OneIcon from '../utils/OneIcon';

interface TicketTopbarProps {
  handleBack: () => void;
}
export default function TicketTopbar({ handleBack }: TicketTopbarProps) {
  return (
    <Box width="100%" height="56px" sx={{ borderBottom: '1px solid #EBEBEB' }}>
      <DContainer
        sx={{ height: '100%', display: 'grid', alignItems: 'center' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            alignItems: 'center',
            columnGap: 2,
            justifyItems: 'end',
          }}
        >
          <Logo />
          <OneIcon
            icon={dismiss}
            title="Close"
            fontSize={24}
            onClick={handleBack}
          />
        </Box>
      </DContainer>
    </Box>
  );
}

import left from '@iconify/icons-fluent/chevron-left-24-filled';
import right from '@iconify/icons-fluent/chevron-right-24-filled';
import dismiss from '@iconify/icons-fluent/dismiss-28-filled';
import { Box, Divider, Typography } from '@mui/material';
import DContainer from '../../DContainer/DContainer';
import OneIcon from '../../utils/OneIcon';

interface InvestmentDialogHeaderProps {
  currentStep: number;
  totalSteps: number;
  handleNext: () => void;
  handleBack: () => void;
  onClose: () => void;
}
export default function InvestmentDialogHeader({
  currentStep,
  totalSteps,
  handleBack,
  handleNext,
  onClose,
}: InvestmentDialogHeaderProps) {
  return (
    <DContainer
      sx={{
        paddingTop: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid #EBEBEB',
        height: '48px',
        display: 'grid',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: 'auto 1fr',
          justifyItems: 'end',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            alignItems: 'center',
            columnGap: 1,
          }}
        >
          <OneIcon
            icon={dismiss}
            fontSize={15}
            size="small"
            title="Close"
            iconColor="#BBBBBB"
            onClick={onClose}
          />
          <Divider
            sx={{
              border: 'none',
              borderLeft: '1px solid #BBBBBB',
              height: '70%',
            }}
            orientation="vertical"
          />
          <Box
            sx={{
              display: 'grid',
              gridAutoFlow: 'column',
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <OneIcon
              icon={left}
              fontSize={15}
              size="small"
              title="Previous"
              iconColor="#BBBBBB"
              onClick={handleBack}
            />
            <OneIcon
              icon={right}
              fontSize={15}
              size="small"
              title="Next"
              iconColor="#BBBBBB"
              onClick={handleNext}
            />
          </Box>
        </Box>
        <Typography
          sx={{ color: '#8D8D8D', fontWeight: 500 }}
        >{`${currentStep}/${totalSteps}`}</Typography>
      </Box>
    </DContainer>
  );
}

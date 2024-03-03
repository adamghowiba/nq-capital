import left from '@iconify/icons-fluent/chevron-left-16-regular';
import right from '@iconify/icons-fluent/chevron-right-16-regular';
import { Box, Divider, Typography } from '@mui/material';
import DContainer from '../DContainer/DContainer';
import Logo from '../Logo/logo';
import OneIcon from '../utils/OneIcon';

export interface OnboardingTopbarProps {
  onBack: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}
export default function OnboardingTopbar({
  onBack,
  onNext,
  currentStep,
  totalSteps,
}: OnboardingTopbarProps) {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #EBEBEB',
        height: '48px',
        display: 'grid',
        alignContent: 'center',
      }}
    >
      <DContainer
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto 1fr',
          justifyItems: 'end',
          columnGap: 2,
          alignItems: 'center',
        }}
      >
        <Logo />
        <Divider orientation="vertical" sx={{ height: '60%' }} />
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: 1,
            alignItems: 'center',
          }}
        >
          <OneIcon
            icon={left}
            title="Previous step"
            fontSize={20}
            iconColor="#BBBBBB"
            size="small"
            onClick={onBack}
          />
          <OneIcon
            icon={right}
            title="Next step"
            fontSize={20}
            iconColor="#BBBBBB"
            size="small"
            onClick={onNext}
          />
        </Box>
        <Typography
          sx={{ color: '#8D8D8D' }}
        >{`${currentStep} / ${totalSteps}`}</Typography>
      </DContainer>
    </Box>
  );
}

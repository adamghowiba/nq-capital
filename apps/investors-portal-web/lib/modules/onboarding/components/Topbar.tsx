import left from '@iconify/icons-fluent/chevron-left-16-regular';
import right from '@iconify/icons-fluent/chevron-right-16-regular';
import { Box, Divider, Stack, Typography } from '@mui/material';
import DContainer from '../../../../components/DContainer/DContainer';
import Logo from '../../../../components/Logo/logo';
import OneIcon from '../../../utils/OneIcon';
import { HStack } from '../../../../components/Stack/Stack';

export interface OnboardingTopbarProps {
  /**
   * 0 based step
   */
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
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
      }}
    >
      <DContainer
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <HStack height="100%" alignItems="center" gap={2}>
          <Logo />

          <Divider
            orientation="vertical"
            sx={{ height: '60%', flexGrow: '1' }}
          />

          <HStack>
            <OneIcon
              icon={left}
              title="Previous step"
              fontSize={20}
              iconColor="#BBBBBB"
              size="small"
              onClick={onBack}
              disabled={currentStep === 0}
            />

            <OneIcon
              icon={right}
              title="Next step"
              fontSize={20}
              iconColor="#BBBBBB"
              size="small"
              onClick={onNext}
              disabled={currentStep + 1 >= totalSteps}
            />
          </HStack>
        </HStack>

        <Typography sx={{ color: '#8D8D8D', ml: 'auto' }}>{`${
          currentStep + 1
        } / ${totalSteps}`}</Typography>
      </DContainer>
    </Box>
  );
}

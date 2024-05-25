import left from '@iconify/icons-fluent/chevron-left-16-regular';
import right from '@iconify/icons-fluent/chevron-right-16-regular';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import DContainer from '../../../components/DContainer/DContainer';
import Logo from '../../../components/Logo/logo';
import OneIcon from '../../../utils/OneIcon';
import dismissIcon from '@iconify/icons-fluent/dismiss-24-filled';
import { Icon } from '@iconify/react';
import { HStack } from '@nq-capital/nui';

export interface OnboardingTopbarProps {
  /**
   * 0 based step
   */
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onClose?: () => void;
  isDisabled?: boolean;
}
export default function OnboardingTopbar({
  onBack,
  onNext,
  onClose,
  currentStep,
  totalSteps,
  isDisabled,
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

          {!!onClose && (
            <IconButton size="small" onClick={onClose}>
              <Icon icon={dismissIcon} color="#BBBBBB" />
            </IconButton>
          )}

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
              disabled={currentStep === 0 || isDisabled}
            />

            <OneIcon
              icon={right}
              title="Next step"
              fontSize={20}
              iconColor="#BBBBBB"
              size="small"
              onClick={onNext}
              disabled={currentStep + 1 >= totalSteps || isDisabled}
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

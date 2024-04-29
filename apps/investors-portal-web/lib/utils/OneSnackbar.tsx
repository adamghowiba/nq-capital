import checkCircle from '@iconify/icons-fluent/checkmark-circle-24-filled';
import dismiss from '@iconify/icons-fluent/dismiss-24-regular';
import { Icon } from '@iconify/react';
import { Box, Snackbar, Typography } from '@mui/material';
import { theme } from '../theme';
import OneIcon from './OneIcon';

export interface OneSnackbarProps {
  isOpen: boolean;
  close: () => void;
  message?: string;
}
export default function OneSnackbar({
  close,
  isOpen,
  message = 'Password reset link has been sent',
}: OneSnackbarProps) {
  return (
    <Snackbar
      color="primary"
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={close}
    >
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          alignItems: 'center',
          columnGap: 0.5,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          padding: '16px 12px',
          borderRadius: '12px',
        }}
      >
        <Icon icon={checkCircle} color="#65BA75" fontSize={16} />
        <Typography variant="body2">{message}</Typography>
        <OneIcon
          icon={dismiss}
          title="Dismiss"
          fontSize={16}
          iconColor="#808080"
          onClick={close}
        />
      </Box>
    </Snackbar>
  );
}

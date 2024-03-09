import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { theme } from '../../lib/theme';
import DialogTransition from './DialogTransition';

export function ConfirmDialog({
  isDialogOpen,
  closeDialog,
  confirm,
  dialogMessage,
  dialogTitle = 'Delete',
  confirmButton = 'Delete',
  danger = false,
  closeOnConfirm = false,
  isSubmitting = false,
}: {
  isDialogOpen: boolean;
  closeDialog: () => void;
  confirm: () => void;
  dialogMessage: string;
  dialogTitle?: string;
  confirmButton?: string;
  danger?: boolean;
  closeOnConfirm?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <Dialog
      open={isDialogOpen}
      TransitionComponent={DialogTransition}
      keepMounted
      onClose={() => (isSubmitting ? null : closeDialog())}
      sx={{
        '& .MuiPaper-root': {
          padding: { laptop: '20px', mobile: 0 },
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle
        variant="h3"
        sx={{
          textAlign: 'start !important',
          color: danger ? `${theme.palette.error.main} !important` : 'initial',
        }}
      >
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
        <Typography>{dialogMessage}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          display: 'grid',
          gridAutoFlow: 'column',
          columnGap: '20px',
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          onClick={() => (isSubmitting ? null : closeDialog())}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          color={danger ? 'error' : 'primary'}
          variant="contained"
          disabled={isSubmitting}
          onClick={() => {
            confirm();
            if (!closeOnConfirm) closeDialog();
          }}
          startIcon={
            isSubmitting && (
              <CircularProgress
                color={danger ? 'error' : 'primary'}
                size={18}
              />
            )
          }
        >
          {confirmButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

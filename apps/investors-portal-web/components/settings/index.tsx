import { Dialog } from '@mui/material';
import DialogTransition from '../utils/DialogTransition';

export interface SettingsDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}
export default function SettingsDialog({
  closeDialog,
  isDialogOpen,
}: SettingsDialogProps) {
  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={closeDialog}
      TransitionComponent={DialogTransition}
    >
      Hello world
    </Dialog>
  );
}

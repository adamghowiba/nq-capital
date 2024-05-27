import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogProps,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import { VStack } from '../Stack/Stack';

export interface ConfirmationModalProps<TData = unknown>
  extends Omit<DialogProps, 'open' | 'maxWidth'> {
  open: TData | undefined;
  cancel?: ReactNode;
  confirm?: ReactNode;
  onCancel?: () => void;
  onConfirm?: (data: TData) => void;
  isLoading?: boolean;
  maxWidth?: string | number;
  minWidth?: string | number;
  closeOnConfirm?: boolean;
}

export const ConfirmationModal = <TData,>({
  cancel = 'Cancel',
  confirm = 'Confirm',
  onCancel,
  onConfirm,
  open,
  isLoading,
  maxWidth,
  minWidth = '350px',
  closeOnConfirm = false,
  ...props
}: ConfirmationModalProps<TData>) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          minWidth: minWidth,
          maxWidth: maxWidth,
        },
      }}
      open={!!open}
      {...props}
    >
      <VStack component="div" px={5} py={2} textAlign="center" gap={1}>
        <Typography variant="h4">{props.title}</Typography>
        <DialogContentText>{props.content}</DialogContentText>
      </VStack>

      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {cancel}
        </Button>

        <LoadingButton
          onClick={() => {
            open !== undefined && onConfirm?.(open);

            if (closeOnConfirm) props.onClose?.({}, 'escapeKeyDown');
          }}
          color="error"
          variant="contained"
          loading={isLoading}
        >
          {confirm}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

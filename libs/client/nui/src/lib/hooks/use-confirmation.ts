import { useCallback, useState } from 'react';

export const useConfirmation = <TData = unknown>() => {
  const [dialogState, setDialogState] = useState<undefined | TData>(undefined);

  const onOpen = useCallback((data?: TData) => {
    setDialogState(data);
  }, []);

  const onClose = useCallback(() => {
    setDialogState(undefined);
  }, []);

  const onConfirm = useCallback(
    (callback: (data: TData) => void) => {
      if (!dialogState) return;

      callback(dialogState);
      setDialogState(undefined);
    },
    [dialogState]
  );

  const getDialogProps = useCallback(() => {
    return {
      open: dialogState !== undefined,
      onClose,
      onCancel: onClose,
    };
  }, [dialogState, onClose]);

  const getConfirmationProps = useCallback(() => {
    return {
      open: dialogState,
      onClose,
      onCancel: onClose,
    };
  }, [dialogState, onClose]);

  return {
    onOpen,
    onClose,
    onCancel: onClose,
    open: dialogState,
    onConfirm,
    getDialogProps,
    getConfirmationProps
  };
};

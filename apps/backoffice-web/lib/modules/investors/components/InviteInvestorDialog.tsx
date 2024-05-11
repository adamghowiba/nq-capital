import {
  Autocomplete,
  AutocompleteProps,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from '@mui/material';
import { DialogHeader, VStack } from '@nq-capital/nui';
import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';

export interface InviteInvestorDialogProps extends DialogProps {
  onInvite: (emails: string[]) => void;
  isLoading?: boolean;
}

const InviteInvestorDialog: FC<InviteInvestorDialogProps> = ({
  onInvite,
  isLoading = false,
  ...props
}) => {
  const [emails, setEmails] = useState<string[]>([]);
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleInvite = () => {
    //
  };

  const handleValidation: AutocompleteProps<
    string[],
    true,
    true,
    true
  >['onKeyDown'] = (event) => {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Enter' && !regex.test(target.value)) {
      event.defaultMuiPrevented = true;
    }
  };

  return (
    <>
      <Dialog sx={{ maxWidth: '600px', mx: 'auto' }} fullWidth {...props}>
        <DialogHeader>Invite investor</DialogHeader>

        <DialogContent>
          <VStack gap={2}>
            <FormControl>
              <FormLabel>Emails</FormLabel>

              <Autocomplete
                multiple
                onChange={(event, value) => setEmails(value)}
                value={emails}
                options={[]}
                freeSolo
                onKeyDown={handleValidation}
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <Chip
                      variant="filled"
                      color="success"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} placeholder="Email" type="email" />
                )}
              />
              <FormHelperText>
                {' '}
                You can invite up to 5 investors at a time
              </FormHelperText>
            </FormControl>
          </VStack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => props?.onClose?.({}, 'backdropClick')}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>

          <LoadingButton
            onClick={handleInvite}
            color="primary"
            variant="contained"
          >
            Invite
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteInvestorDialog;

import { zodResolver } from '@hookform/resolvers/zod';
import checkmarkIcon from '@iconify/icons-fluent/checkmark-circle-16-filled';
import dismissCircleIcon from '@iconify/icons-fluent/warning-16-filled';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
} from '@mui/material';
import { DialogHeader, NTextField, VStack, useDebounce } from '@nq-capital/nui';
import { FC, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useListInvitationsQuery } from '../../../../lib/gql/gql-client';

const inviteInvestorSchema = z.object({
  email: z
    .string({ description: 'Investor email is required' })
    .email({ message: 'Please enter a valid email address' }),
});

type InviteInvestorSchema = z.infer<typeof inviteInvestorSchema>;

export interface InviteSingleInvestorDialogProps extends DialogProps {
  onInvite: (data: InviteInvestorSchema) => void;
  isLoading?: boolean;
}

const InviteSingleInvestorDialog: FC<InviteSingleInvestorDialogProps> = ({
  onInvite,
  isLoading = false,
  ...props
}) => {
  const form = useForm<InviteInvestorSchema>({
    reValidateMode: 'onChange',
    mode: 'all',
    resolver: zodResolver(inviteInvestorSchema),
  });

  const email = form.watch('email');
  const debouncedEmail = useDebounce(email, 300);
  const emailFieldState = form.getFieldState('email');

  const invitations = useListInvitationsQuery(
    {
      emails: [debouncedEmail],
    },
    {
      enabled: !!debouncedEmail && emailFieldState.invalid === false,
      select: (data) => data.invitations,
    }
  );

  const existingInvitation = useMemo(() => {
    if (!invitations.data) return undefined;

    const invitation = invitations.data.find(
      (invite) => invite.email?.toLowerCase() === debouncedEmail?.toLowerCase()
    );

    if (!invitation) return;

    return invitation;
  }, [invitations.data, debouncedEmail]);

  const handleValidSubmission: SubmitHandler<InviteInvestorSchema> = (data) => {
    onInvite(data);
  };

  return (
    <>
      <Dialog sx={{ maxWidth: '600px', mx: 'auto' }} fullWidth {...props}>
        <DialogHeader>Invite investor</DialogHeader>

        <DialogContent>
          <VStack gap={2}>
            <NTextField
              control={form.control}
              name="email"
              label="Email"
              placeholder="example@gmail.com"
              helperText={
                existingInvitation?.email
                  ? 'This investor has already been invited, we will resend the invitation if you continue'
                  : 'We will send an email to the investor with an invitation link'
              }
              HelperTextProps={{
                sx: {
                  color: existingInvitation?.email ? 'orange' : undefined,
                },
              }}
              InputProps={{
                endAdornment: invitations.isLoading ? (
                  <CircularProgress size="20px" />
                ) : (existingInvitation?.email || emailFieldState.invalid) ? (
                  <Icon
                    icon={dismissCircleIcon}
                    color="orange"
                    width={25}
                    height={25}
                  />
                ) : (
                  <Icon
                    icon={checkmarkIcon}
                    color="green"
                    width={25}
                    height={25}
                  />
                ),
              }}
            />
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
            onClick={form.handleSubmit(handleValidSubmission, console.error)}
            color="primary"
            variant="contained"
            loading={isLoading}
          >
            {existingInvitation ? 'Resent' : 'Invite'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteSingleInvestorDialog;

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { HStack, NAvatar, NTextField, VStack } from '@nq-capital/nui';
import { useUser } from 'apps/backoffice-web/lib/hooks/use-user';
import { NextPageWithLayout } from 'apps/backoffice-web/pages/_app';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GeneralSettingsSchema, generalSettingsSchema } from '../settings.schema';
import SettingsFieldGroup from './SettingsFieldGroup';

const GeneralSettingsTab: NextPageWithLayout = ({ ...props }) => {
  const user = useUser();

  const form = useForm<GeneralSettingsSchema>({
    defaultValues: {
      email: user.data?.email || '',
      first_name: user.data?.first_name || '',
      last_name: user.data?.last_name || '',
    },
    resolver: zodResolver(generalSettingsSchema),
  });

  const handleValidSubmission: SubmitHandler<GeneralSettingsSchema> = (
    data
  ) => {

  };

  return (
    <>
      <SettingsFieldGroup>
        <HStack gap={2} align="center">
          <NAvatar size="xl" src={user.data?.avatar || undefined}>
            {user.data?.first_name?.[0]}
          </NAvatar>

          <VStack gap={0.5}>
            <Typography variant="h6">Profile Picture</Typography>
            <Tooltip title="Profile pictures are currently disabled">
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  disabled
                >
                  Upload
                </Button>
              </Box>
            </Tooltip>
          </VStack>
        </HStack>
      </SettingsFieldGroup>

      <SettingsFieldGroup>
        <Grid container spacing={3}>
          <Grid mobile={12}>
            <NTextField
              control={form.control}
              name="email"
              placeholder="example@gmail.com"
              label="Email"
              isRequired
              fullWidth
            />
          </Grid>

          <Grid mobile={6}>
            <NTextField
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="John"
              isRequired
              fullWidth
            />
          </Grid>

          <Grid mobile={6}>
            <NTextField
              control={form.control}
              name="last_name"
              label="Last name"
              placeholder="Doe"
              isRequired
              fullWidth
            />
          </Grid>

          {Object.values(form.formState.touchedFields).some(Boolean) && (
            <Grid mobile={12}>
              <LoadingButton
                variant="contained"
                color="primary"
                // loading={updateInvestorMutation.isPending}
                onClick={form.handleSubmit(
                  handleValidSubmission,
                  console.error
                )}
              >
                Submit
              </LoadingButton>
            </Grid>
          )}
        </Grid>
      </SettingsFieldGroup>

      <SettingsFieldGroup>
        <Typography variant="h6">Delete account</Typography>
        <Typography variant="subtitle2">
          This action could not be undone
        </Typography>

        <Button color="error" variant="contained" sx={{ mr: 'auto', mt: 2 }}>
          Delete
        </Button>
      </SettingsFieldGroup>
    </>
  );
};

export default GeneralSettingsTab;

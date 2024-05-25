import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Unstable_Grid2 as Grid,
  Tooltip,
  Typography
} from '@mui/material';
import { HStack, NAvatar, NTextField, VStack } from '@nq-capital/nui';
import { InferGetServerSidePropsType } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useUpdateInvestorMutation
} from '../../lib/gql/gql-client';
import SettingsLayout from '../../lib/layouts/SettingsLayout';
import SettingsFieldGroup from '../../lib/modules/settings/components/SettingsFieldGroup';
import { getInvestorSSP } from '../../lib/modules/settings/get-investor-ssr';
import {
  GeneralSettingsSchema,
  generalSettingsSchema,
} from '../../lib/modules/settings/settings.schema';
import { NextPageWithLayout } from '../_app';

const SettingsPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ investor, ...props }) => {
  const form = useForm<GeneralSettingsSchema>({
    defaultValues: {
      email: investor?.email,
      first_name: investor?.first_name,
      last_name: investor?.last_name,
    },
    resolver: zodResolver(generalSettingsSchema),
  });

  const updateInvestorMutation = useUpdateInvestorMutation();

  const handleValidSubmission: SubmitHandler<GeneralSettingsSchema> = (
    data
  ) => {
    updateInvestorMutation.mutate({
      updateInvestorInput: {
        id: investor.id,
        email: data?.email,
        first_name: data?.first_name,
        last_name: data?.last_name,
      },
    });
  };

  return (
    <>
      <SettingsFieldGroup>
        <HStack gap={2} align="center">
          <NAvatar size="xl" src={investor?.avatar || undefined}>
            {investor.first_name.slice(0, 1)}
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
                loading={updateInvestorMutation.isPending}
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

export const getServerSideProps = getInvestorSSP();

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const investorFetcher = useRetrieveInvestorQuery.fetcher({
//     id: 13,
//   });

//   const investor = await investorFetcher();

//   return {
//     props: {
//       investor: investor.investor,
//     },
//   };
// };

SettingsPage.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default SettingsPage;

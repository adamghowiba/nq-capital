import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Drawer, DrawerProps, Typography } from '@mui/material';
import {
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  NCurrencyField,
  NTextField,
  VStack,
} from '@nq-capital/nui';
import {
  useCreateFundMutation,
  useListFundsQuery,
} from '../../../../lib/gql/gql-client';
import { parseApiError } from '../../../../lib/utils/error.utils';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FundSchema, fundSchema } from '../fund.schema';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';

export interface FundMutationDrawerProps extends DrawerProps {}

export const FundMutationDrawer: FC<FundMutationDrawerProps> = ({
  ...props
}) => {
  const queryClient = useQueryClient();

  const form = useForm<FundSchema>({
    defaultValues: {
      description: '',
      initial_balance: 0,
      name: '',
    },
    resolver: zodResolver(fundSchema),
  });

  const createFundMutation = useCreateFundMutation({
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: useListFundsQuery.getKey({}),
      });

      form.reset();
      props.onClose?.({}, 'backdropClick');
    },
  });

  const handleValidSubmit: SubmitHandler<FundSchema> = (data) => {
    const mutation = createFundMutation.mutateAsync({
      createFundInput: {
        name: data.name,
        initial_balance: data.initial_balance,
      },
    });

    toast.promise(mutation, {
      loading: 'Creating fund...',
      success: 'Investment created',
      error: parseApiError,
    });
  };

  return (
    <Drawer
      anchor="right"
      sx={{
        bgcolor: 'transparent',
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: 'transparent',
        },
      }}
      {...props}
    >
      <DrawerContent>
        <DrawerHeader onClose={() => props.onClose?.({}, 'backdropClick')}>
          <Typography>New Fund</Typography>
        </DrawerHeader>

        <DrawerBody>
          <VStack gap={3}>
            <NTextField
              control={form.control}
              label="Fund name"
              name="name"
              placeholder="Fund name"
              helperText="A unique name to differentiate the fund from others. e.g. Crypto, Real Estate, Primary"
              isRequired
            />

            <NTextField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Description"
            />

            <NCurrencyField
              control={form.control}
              name="initial_balance"
              label="Initial balance"
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <LoadingButton
            variant="contained"
            fullWidth
            loading={createFundMutation.isPending}
            onClick={form.handleSubmit(handleValidSubmit, console.error)}
          >
            Create Fund
          </LoadingButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  Drawer,
  DrawerProps,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  RadioProps,
  Stack,
  Typography,
  useRadioGroup,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DrawerBody } from '../../../../lib/components/Drawer/DrawerBody';
import DrawerContent from '../../../../lib/components/Drawer/DrawerContent';
import DrawerFooter from '../../../../lib/components/Drawer/DrawerFooter';
import DrawerHeader from '../../../../lib/components/Drawer/DrawerHeader';
import NTextField from '../../../../lib/components/Fields/NTextField';
import { HStack } from '../../../../lib/components/Stack/Stack';
import { SupportTicketSchema, supportTicketSchema } from '../ticket.schema';
import {
  useCreateTickerMutation,
  useListTickersQuery,
} from '../../../../lib/gql/gql-client';
import { useQueryClient } from '@tanstack/react-query';

export interface TickerMutationDrawerProps extends DrawerProps {
  mode:
    | {
        type: 'create';
      }
    | { type: 'update'; initialData: SupportTicketSchema };
}

const TickerMutationDrawer: FC<TickerMutationDrawerProps> = ({
  mode,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<SupportTicketSchema>({
    defaultValues: {
      description: '',
      subject: '',
      priority: 'LOW',
      type: 'SUPPORT',
      ...(mode.type === 'update' ? mode.initialData : {}),
    },
    resolver: zodResolver(supportTicketSchema),
  });

  const queryClient = useQueryClient();

  const createTicketMutation = useCreateTickerMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useListTickersQuery.getKey() });

      props.onClose?.({}, 'backdropClick');
    },
  });

  const handleValidSubmit: SubmitHandler<SupportTicketSchema> = (data) => {
    if (mode.type === 'create') {
      createTicketMutation.mutate({
        createTicketInput: {
          data: {
            subject: data.subject,
            description: data.description,
          },
          priority: data.priority,
          type: 'SUPPORT',
        },
      });

      return;
    }
  };

  return (
    <>
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
        <DrawerContent size={isExpanded ? 'full' : 'md'}>
          <DrawerHeader
            onClickExpand={() => setIsExpanded((expanded) => !expanded)}
            isExpanded={isExpanded}
          >
            <Typography variant="h4" fontWeight="500">
              Ticket
            </Typography>
          </DrawerHeader>

          <DrawerBody>
            <Typography variant="h3" fontWeight="500">
              Support Ticket
            </Typography>
            <Typography variant="subtitle2" mb={3}>
              Fill out the form below to create a new support ticket.
            </Typography>

            <Stack gap={3}>
              <NTextField
                control={form.control}
                name="subject"
                label="Subject"
                placeholder="Short description"
                isRequired
              />

              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormControl required>
                    <RadioGroup
                      {...field}
                      onChange={(e, value) => field.onChange(value)}
                    >
                      <FormLabel id="demo-radio-buttons-group-label">
                        Priority
                      </FormLabel>

                      <HStack gap={1}>
                        <PriorityRadioButton label="Low" value="LOW" />
                        <PriorityRadioButton label="High" value="HIGH" />
                        <PriorityRadioButton label="Medium" value="MEDIUM" />
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                )}
              />

              <NTextField
                control={form.control}
                name="description"
                label="Additional"
                placeholder="Any additional details"
                multiline
                minRows={4}
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={form.handleSubmit(handleValidSubmit, console.error)}
              startIcon={
                createTicketMutation.isPending ? (
                  <CircularProgress size={15} color="secondary" />
                ) : undefined
              }
              disabled={createTicketMutation.isPending}
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const PriorityRadioButton: FC<
  RadioProps & { label: string; value: string }
> = ({ value, label, ...props }) => {
  const radio = useRadioGroup();

  const isChecked = radio?.value && radio.value === value;

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{
        height: '56px',
        minHeight: 'unset',
        position: 'relative',
      }}
    >
      <input
        name={radio?.name}
        type="radio"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          opacity: 0,
          borderRadius: 'inherit',
          margin: 0,
          appearance: 'none',
          cursor: 'pointer',
        }}
        value={value}
        checked={isChecked}
        onChange={(event) => {
          console.log(event.target.value);
          radio?.onChange?.(event, value);
        }}
      />

      <Radio size="small" sx={{ pointerEvents: 'none' }} checked={isChecked} />

      <Typography>{label}</Typography>
    </Button>
  );
};

export default TickerMutationDrawer;

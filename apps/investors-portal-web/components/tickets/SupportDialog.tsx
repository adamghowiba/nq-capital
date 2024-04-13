import { zodResolver } from '@hookform/resolvers/zod';
import check from '@iconify/icons-fluent/checkmark-circle-24-filled';
import dot from '@iconify/icons-fluent/circle-24-filled';
import cross from '@iconify/icons-fluent/dismiss-24-regular';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IAttachment,
  ISupportTicketSchema,
  supportTicketSchema,
  supportTicketUrgencies,
} from '../../lib/types';
import StepHeader from '../onboarding/stepHeader';
import OneIcon from '../utils/OneIcon';
import TicketTopbar from './ticketTopbar';

interface SupportDialogProps {
  isDialogOpen: boolean;
  closeDialog: () => void;
}

export default function SupportDialog({
  closeDialog,
  isDialogOpen,
}: SupportDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ISupportTicketSchema>({
    defaultValues: { urgency: 'High' },
    resolver: zodResolver(supportTicketSchema),
  });

  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);

  function onSubmit(values: ISupportTicketSchema) {
    const submitValues: ISupportTicketSchema & IAttachment = {
      ...values,
      attachment: ticketDocument,
    };
    setIsSubmittingTicket(true);
    //TODO: call api here to create submit ticket
    setTimeout(() => {
      setIsSubmittingTicket(false);
      console.log(submitValues);
      close();
    }, 3000);
  }

  /*TODO:
  Using this because the File type on the zod schema doesn't seem to work.
  if you have another solution, please let me know.
  */
  const [ticketDocument, setTicketDocument] = useState<File>();
  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && !!e.target.files[0]) {
      const upload: File = e.target.files[0] as File;
      setTicketDocument(upload);
    }
  }

  function close() {
    closeDialog();
    reset();
    setTicketDocument(undefined);
  }

  return (
    <Dialog open={isDialogOpen} fullScreen onClose={close}>
      <TicketTopbar handleBack={closeDialog} />
      <Box sx={{ padding: '40px 0', display: 'grid', justifyItems: 'center' }}>
        <Box
          sx={{ width: '604px', display: 'grid', rowGap: 5 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <StepHeader
            title="New support Ticket"
            subtitle="Fill out the form below to create new support ticket."
            gap={1}
          />
          <Box sx={{ display: 'grid', rowGap: 3 }}>
            <FormControl fullWidth error={Boolean(errors.description)}>
              <FormLabel>Description</FormLabel>
              <OutlinedInput
                placeholder="Enter your passport number"
                autoFocus
                {...register('description')}
                error={!!errors.description}
                disabled={isSubmittingTicket}
                size="small"
              />
              <FormHelperText>{errors.description?.message}</FormHelperText>
            </FormControl>
            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography color={errors.date ? 'error' : 'initial'}>
                Date
              </Typography>
              <MobileDatePicker
                openTo="day"
                views={['year', 'month', 'day']}
                orientation="landscape"
                onChange={(value) => {
                  value && setValue('date', value.toDate());
                  // re
                }}
                minDate={dayjs(new Date())}
                slotProps={{
                  textField: {
                    ...register('date'),
                    error: !!errors.date,
                    helperText: errors.date?.message,
                  },
                }}
                disabled={isSubmittingTicket}
              />
            </Box>

            <FormControl
              fullWidth
              disabled={isSubmittingTicket}
              sx={{
                '&.MuiFormControl-root': {
                  display: 'grid',
                  rowGap: 1,
                },
              }}
            >
              <FormLabel>Urgency</FormLabel>
              <RadioGroup
                row
                sx={{
                  '&.MuiFormGroup-root': {
                    display: 'grid',
                    gridAutoFlow: 'column',
                    columnGap: '8px',
                  },
                }}
                defaultValue={'Low'}
                onChange={(e, val) => setValue('urgency', val)}
              >
                {supportTicketUrgencies.map((urgency, index) => (
                  <FormControlLabel
                    key={index}
                    value={urgency}
                    control={
                      <Radio
                        size="small"
                        icon={<Icon icon={dot} color="#D9D9D9" height={24} />}
                        checkedIcon={
                          <Icon icon={check} color="#30A46C" height={24} />
                        }
                      />
                    }
                    label={urgency}
                    sx={{
                      '&.MuiFormControlLabel-root': {
                        background: '#F1F1F1',
                        padding: '8px 12px',
                        borderRadius: '12px',
                        margin: 0,
                      },
                      '& .MuiTypography-root': {
                        color: '#808080',
                      },
                      '& .Mui-checked + .MuiTypography-root': {
                        color: '#202020',
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'grid', rowGap: 1 }}>
              <Typography>
                Additional Info
                <Typography component="span" color="#8D8D8D" ml={1}>
                  Optional
                </Typography>
              </Typography>
              <TextField
                {...register('additionalInfo')}
                disabled={isSubmittingTicket}
                multiline
                rows={3}
                placeholder="Give more information about this ticket"
                error={!!errors.additionalInfo}
                helperText={errors.additionalInfo?.message}
              />
            </Box>

            <Box sx={{ display: 'grid', rowGap: 1, justifyItems: 'start' }}>
              <Typography>
                Attachment
                <Typography component="span" color="#8D8D8D" ml={1}>
                  Optional
                </Typography>
              </Typography>

              {ticketDocument && (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    columnGap: 1,
                    alignItems: 'center',
                    border: '1px solid #EBEBEB',
                    borderRadius: '12px',
                    padding: '6px 12px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Typography sx={{ color: '#000000' }}>
                    {ticketDocument.name}
                  </Typography>
                  <Typography sx={{ color: '#8D8D8D' }}>{`${(
                    ticketDocument.size /
                    (1024 * 1024)
                  ).toFixed(2)}MB`}</Typography>
                  {!isSubmittingTicket && (
                    <OneIcon
                      title="Remove"
                      icon={cross}
                      fontSize={15}
                      iconColor="#808080"
                      onClick={() => setTicketDocument(undefined)}
                    />
                  )}
                </Box>
              )}

              <Box>
                <input
                  accept="application/pdf"
                  hidden
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileInput}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    disabled={isSubmittingTicket}
                  >
                    {`${ticketDocument ? 'Change' : 'Add'} Attachment`}
                  </Button>
                </label>
              </Box>
            </Box>
          </Box>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={isSubmittingTicket}
            endIcon={
              isSubmittingTicket && (
                <CircularProgress thickness={3} color="primary" size={16} />
              )
            }
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

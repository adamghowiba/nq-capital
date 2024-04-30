import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Screen from '../../lib/components/Screen/Screen';
import {
  HStack,
  VStack,
} from '../../lib/components/Stack/Stack';
import {
  useRetrieveTicketQuery,
  useSendTicketMessageMutation,
} from '../../lib/gql/gql-client';
import { formatISOForTable } from '../../lib/utils/date.utils';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useState } from 'react';
import { Unstable_Grid2 as Grid } from '@mui/material';
import documentIcon from '@iconify/icons-fluent/document-100-16-filled';
import add12Icon from '@iconify/icons-fluent/add-12-filled';
import send16FilledIcon from '@iconify/icons-fluent/send-16-filled';
import arrowCircleUp12Filled from '@iconify/icons-fluent/arrow-circle-up-12-filled';
import { Icon } from '@iconify/react';
import MessageCard from '../../lib/components/MessageCard/MessageCard';
import { useMutation } from '@tanstack/react-query';

const TickerDetailPage = ({ ...props }) => {
  const [messageInput, setMessageInput] = useState('');

  const router = useRouter();
  const ticketId = parseInt(router.query?.ticketId as string);

  const ticket = useRetrieveTicketQuery(
    {
      id: ticketId,
    },
    { enabled: !!ticketId, select: (res) => res.ticket }
  );

  const ticketData: { label: string; value: ReactNode }[] = [
    // {
    //   label: 'ID',
    //   value: ticket.data?.id,
    // },
    {
      label: 'Ticket Type',
      value: ticket.data?.type,
    },
    {
      label: 'Status',
      value: ticket.data?.status,
    },
    {
      label: 'Urgency',
      value: ticket.data?.priority,
    },
    {
      label: 'Days Open',
      value: formatISOForTable(ticket.data?.created_at),
    },
  ];

  const sendTickerMessageMutation = useSendTicketMessageMutation({});

  const handleSendMessage = () => {
    console.log('Send message');

    sendTickerMessageMutation.mutate({
      sendTicketMessageInput: {
        content: messageInput,
        ticket_id: ticketId,
        type: 'INVESTOR',
      },
    });

    setMessageInput('');
  };

  if (!ticketId) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Invalid ticket id</AlertTitle>
      </Alert>
    );
  }

  if (ticket.isError) {
    return (
      <Alert variant="filled" severity="error">
        <AlertTitle>Error loading ticket</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Grid container height="100%">
        <Grid mobile={8}>
          <Screen>
            <VStack>
              <HStack gap={1} alignItems="center">
                <Typography variant="h2">Ticket Details</Typography>
                <Chip
                  label={ticket.data?.status}
                  size="small"
                  variant="outlined"
                />
              </HStack>
              <Typography variant="subtitle2">
                {formatISOForTable(ticket.data?.created_at)}
              </Typography>
            </VStack>

            <Grid
              container
              width="100%"
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="#F1F1F1"
              spacing={3}
            >
              {ticketData.map((data) => {
                return (
                  <Grid key={data.label} mobile={6}>
                    <HStack w="100%">
                      <Typography
                        variant="body2"
                        sx={{ width: '140px', color: '#808080' }}
                      >
                        {data.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#202020' }}>
                        {data.value}
                      </Typography>
                    </HStack>
                  </Grid>
                );
              })}
            </Grid>

            <VStack gap={1}>
              <Typography>Additional Information</Typography>
              <Typography variant="subtitle2" fontSize="13px" color="#646464">
                {ticket.data?.data?.description || '-'}
              </Typography>
            </VStack>

            <VStack gap={1.5}>
              <Typography>Attachments</Typography>
              <HStack color="#646464" gap={1}>
                <Icon icon={documentIcon} width={16} height={16} />
                <Typography sx={{ color: '#646464' }} fontWeight="600">
                  sample_report.pdf
                </Typography>
                <Typography sx={{ color: '#BBBBBB' }}>1.2MB</Typography>
              </HStack>
            </VStack>
          </Screen>
        </Grid>

        <Grid mobile={4}>
          <VStack borderLeft="1px solid #EBEBEB" height="100%">
            <Box p={2} borderBottom="1px solid #EBEBEB">
              <Typography>Conversation</Typography>
            </Box>

            <VStack p={2} gap={4}>
              {/* {ticker.from({ length: 5 }).map((_, index) => (
                <MessageCard
                  content="Hello, how can I help you today?"
                  date="2021-09-01T08:30:00Z"
                  displayName="You"
                  key={index}
                  isVerified={index === 2}
                />
              ))} */}
            </VStack>

            <HStack p={2} borderTop="1px solid #EBEBEB" mt="auto" gap={1}>
              <IconButton sx={{ bgcolor: '#F1F1F1' }}>
                <Icon icon={add12Icon} width={16} height={16} />
              </IconButton>

              <TextField
                placeholder="Comment.."
                variant="outlined"
                multiline
                fullWidth
                size="medium"
                sx={{
                  '& .MuiInputBase-root.MuiOutlinedInput-root': {
                    py: 0.5,
                    pr: 0,
                  },
                  '& .MuiInputBase-root': {
                    bgcolor: 'transparent',
                  },
                }}
                maxRows={13}
                value={messageInput}
                onChange={(event) => setMessageInput(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      size="small"
                      color="primary"
                      sx={{ alignSelf: 'end' }}
                      onClick={handleSendMessage}
                    >
                      <Icon
                        icon={arrowCircleUp12Filled}
                        width={25}
                        height={25}
                      />
                    </IconButton>
                  ),
                }}
              />
            </HStack>
          </VStack>
        </Grid>
      </Grid>
    </>
  );
};

export default TickerDetailPage;

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
import { HStack, VStack } from '../../lib/components/Stack/Stack';
import {
  MessageEntity,
  RetrieveTicketQuery,
  useRetrieveTicketQuery,
  useSendTicketMessageMutation,
} from '../../lib/gql/gql-client';
import { formatISOForTable } from '../../lib/utils/date.utils';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Unstable_Grid2 as Grid } from '@mui/material';
import documentIcon from '@iconify/icons-fluent/document-100-16-filled';
import add12Icon from '@iconify/icons-fluent/add-12-filled';
import send16FilledIcon from '@iconify/icons-fluent/send-16-filled';
import arrowCircleUp12Filled from '@iconify/icons-fluent/arrow-circle-up-12-filled';
import { Icon } from '@iconify/react';
import MessageCard from '../../lib/components/MessageCard/MessageCard';
import { useMutation } from '@tanstack/react-query';
import { useInvestor } from 'apps/investors-portal-web/lib/hooks/use-investor';
import { queryClient } from 'apps/investors-portal-web/lib/api/query-client';

type TicketMessageQueryData = RetrieveTicketQuery['ticket']['messages'][number];

const getMessageDisplayName = (
  message: TicketMessageQueryData,
  investor_id?: number
) => {
  if (message?.sent_by_investor_id === investor_id) return 'You';

  if (message.sent_by_investor) {
    return `${
      message?.sent_by_investor?.first_name
    } ${message?.sent_by_investor?.last_name?.slice(0, 1)}`;
  }

  if (message.sent_by_user_id) {
    return `${
      message?.sent_by_user?.first_name
    } ${message?.sent_by_user?.last_name?.slice(0, 1)}`;
  }

  return 'Unknown';
};

const TickerDetailPage = ({ ...props }) => {
  const investor = useInvestor();
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

  const sendTickerMessageMutation = useSendTicketMessageMutation({
    onSuccess: (data, variables) => {
      queryClient.setQueriesData<TicketMessageQueryData[]>(
        {
          queryKey: useRetrieveTicketQuery.getKey({ id: ticketId }),
        },
        (oldData) => {
          if (!oldData) return oldData;

          return [...oldData, data.sendTicketMessage];
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: useRetrieveTicketQuery.getKey({ id: ticketId }),
      });
    },
  });

  const handleSendMessage = () => {
    sendTickerMessageMutation.mutate({
      sendTicketMessageInput: {
        content: messageInput,
        ticket_id: ticketId,
        type: 'INVESTOR',
      },
    });

    setMessageInput('');
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!messageInput.trim()) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
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
              {ticket.data?.messages.map((message, index) => (
                <MessageCard
                  key={message.id}
                  content={message.content}
                  date={message.created_at}
                  displayName={getMessageDisplayName(
                    message,
                    investor.data?.id
                  )}
                  isVerified={!!message.sent_by_user_id}
                />
              ))}
            </VStack>

            <HStack p={2} borderTop="1px solid #EBEBEB" mt="auto" gap={1.5}>
              <IconButton sx={{ bgcolor: '#F1F1F1' }}>
                <Icon icon={add12Icon} width={16} height={16} />
              </IconButton>

              <TextField
                placeholder="Comment.."
                variant="outlined"
                multiline
                fullWidth
                size="medium"
                onKeyDown={handleKeydown}
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
                      color={messageInput.trim() ? 'primary' : 'secondary'}
                      sx={{ alignSelf: 'end', transition: 'color 0.15s ease' }}
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

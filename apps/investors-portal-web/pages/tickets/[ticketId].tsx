import {
  Alert,
  AlertTitle,
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import Screen from '../../lib/components/Screen/Screen';
import { HStack, VStack } from '../../lib/components/Stack/Stack';
import {
  MessageEntity,
  RetrieveTicketQuery,
  useDeleteTicketMutation,
  useRetrieveTicketQuery,
  useSendTicketMessageMutation,
} from '../../lib/gql/gql-client';
import { formatISOForTable } from '../../lib/utils/date.utils';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
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
import { useFileUpload } from 'apps/investors-portal-web/lib/hooks/use-file-upload';
import FileChip from 'apps/investors-portal-web/lib/components/FileChip/FileChip';
import { nqRestApi } from 'apps/investors-portal-web/lib/api/rest-api';
import { DateTime } from 'luxon';

type TicketMessageQueryData = RetrieveTicketQuery['ticket']['messages'][number];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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
  const [messageInput, setMessageInput] = useState('');

  const investor = useInvestor();
  const fileUploader = useFileUpload({
    maxFiles: 4,
  });
  const router = useRouter();
  const ticketId = parseInt(router.query?.ticketId as string);

  const ticket = useRetrieveTicketQuery(
    {
      id: ticketId,
    },
    { enabled: !!ticketId, select: (res) => res.ticket }
  );

  const ticketData: { label: string; value: ReactNode }[] = [
    {
      label: 'ID',
      value: ticket.data?.id,
    },
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
      label: 'Last Updated',
      value: formatISOForTable(ticket.data?.updated_at),
    },
    {
      label: 'Days Open',
      value: ticket.data?.created_at
        ? Math.abs(
            Math.ceil(
              DateTime.fromISO(ticket.data?.created_at).diffNow('days')?.days
            )
          )
        : '-',
    },
  ];

  const sendTickerMessageMutation = useSendTicketMessageMutation({
    onSuccess: (data, variables) => {
      queryClient.setQueriesData<TicketMessageQueryData[]>(
        {
          queryKey: useRetrieveTicketQuery.getKey({ id: ticketId }),
        },
        (oldData) => {
          if (!oldData || !Array.isArray(oldData)) return oldData;

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

  const uploadFileMutation = useMutation({
    mutationFn: nqRestApi.uploadTicketFile,
    onSuccess: () => {
      console.log('Success');
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: useRetrieveTicketQuery.getKey({ id: ticketId }),
      });
    },
  });

  const deleteTicketMutation = useDeleteTicketMutation({
    onSuccess: () => {
      router.push('/tickets');
    },
  });

  const handleSendMessage = async () => {
    const files = fileUploader.files;
    fileUploader.clear();
    setMessageInput('');

    const message = await sendTickerMessageMutation.mutateAsync({
      sendTicketMessageInput: {
        content: messageInput,
        ticket_id: ticketId,
        type: 'INVESTOR',
      },
    });

    if (fileUploader.files?.length) {
      uploadFileMutation.mutate({
        files: files,
        ticketId,
        messageId: message?.sendTicketMessage?.id,
      });
    }
  };

  const handleDeleteTicket = () => {
    deleteTicketMutation.mutate({ id: ticketId });
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
            <HStack>
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

              <HStack ml="auto" alignSelf="start" gap={1}>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={handleDeleteTicket}
                  startIcon={
                    deleteTicketMutation.isPending ? (
                      <CircularProgress size={13} />
                    ) : undefined
                  }
                  disabled={deleteTicketMutation.isPending}
                >
                  Delete
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  disabled
                >
                  Edit
                </Button>
              </HStack>
            </HStack>

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

        <Grid mobile={4} height="calc(100vh - 108px)">
          <VStack
            borderLeft="1px solid #EBEBEB"
            height="100%"
            sx={{ overflow: 'auto' }}
          >
            <Box p={2} borderBottom="1px solid #EBEBEB">
              <Typography>Conversation</Typography>
            </Box>

            <VStack p={2} gap={4} sx={{ overflow: 'auto' }}>
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
                  files={message?.assets || []}
                />
              ))}
            </VStack>

            {/*  */}

            <VStack p={2} gap={1} borderTop="1px solid #EBEBEB" mt="auto">
              {!!fileUploader.files.length && (
                <HStack gap={1} overflow="auto" sx={{ scrollbarWidth: 'none' }}>
                  {fileUploader.files.map((file, index) => (
                    <FileChip
                      key={index}
                      fileName={file.name}
                      fileType={'PDF'}
                      onDelete={() => fileUploader.removeFile(file)}
                    />
                  ))}
                </HStack>
              )}

              <HStack gap={1.5}>
                <IconButton
                  sx={{ bgcolor: '#F1F1F1' }}
                  role={undefined}
                  component="label"
                >
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept=".xlsx,.xls,.pdf,.txt,.json,.png,.jpg"
                    onChange={fileUploader.onFileChange}
                  />
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
                        sx={{
                          alignSelf: 'end',
                          transition: 'color 0.15s ease',
                        }}
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
          </VStack>
        </Grid>
      </Grid>
    </>
  );
};

export default TickerDetailPage;

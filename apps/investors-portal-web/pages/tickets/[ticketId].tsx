import documentIcon from '@iconify/icons-fluent/document-100-16-filled';
import { Icon } from '@iconify/react';
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  CircularProgress,
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';
import {
  ChatBox,
  ChatBoxBody,
  ChatBoxFooter,
  ChatBoxHeader,
  ChatBoxTextField,
  ConfirmationModal,
  FileChip,
  HStack,
  MessageCard,
  TicketHeader,
  UploadIconButton,
  VStack,
  useFileUpload,
} from '@nq-capital/nui';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { queryClient } from '../../lib/api/query-client';
import { nqRestApi } from '../../lib/api/rest-api';
import Screen from '../../lib/components/Screen/Screen';
import {
  RetrieveTicketQuery,
  useDeleteTicketMutation,
  useRetrieveTicketQuery,
  useSendTicketMessageMutation,
} from '../../lib/gql/gql-client';
import { useInvestor } from '../../lib/hooks/use-investor';
import { formatISOForTable } from '../../lib/utils/date.utils';
import { getFormattedFileSize } from '@nq-capital/utils';

type TicketMessageQueryData = RetrieveTicketQuery['ticket']['messages'][number];

const getMessageDisplayName = (
  message: TicketMessageQueryData,
  investorId?: number
) => {
  if (
    message.type === 'INVESTOR' &&
    message?.sent_by_investor_id === investorId
  )
    return 'You';

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
  const chatBoxRef = useRef<HTMLDivElement>(null);

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

  const ticketMessageAssets = useMemo(() => {
    return ticket.data?.messages
      .flatMap((message) => message.assets)
      .filter(Boolean);
  }, [ticket.data?.messages]);

  useEffect(() => {
    if (!ticket.data || !chatBoxRef.current) return;

    chatBoxRef.current.scrollTo({
      top: chatBoxRef.current?.scrollHeight,
      behavior: 'instant',
    });
  }, [ticket.data, chatBoxRef]);

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
            <TicketHeader
              status={ticket.data?.status || 'OPEN'}
              createdIsoDate={ticket.data?.created_at}
              actions={
                <>
                  {/* <Button
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
                </Button> */}

                  {/* TODO: Setup or remove */}
                  {/* <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  disabled
                >
                  Edit
                </Button> */}
                </>
              }
            />

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
              {ticketMessageAssets?.map((asset) => {
                if (!asset) return;

                return (
                  <HStack key={asset.id} color="#646464" gap={1}>
                    <Icon icon={documentIcon} width={16} height={16} />
                    <Typography sx={{ color: '#646464' }} fontWeight="600">
                      {asset.original_name}
                    </Typography>

                    {asset.size && (
                      <Typography sx={{ color: '#BBBBBB' }}>
                        {getFormattedFileSize(asset.size)}
                      </Typography>
                    )}
                  </HStack>
                );
              })}
            </VStack>
          </Screen>
        </Grid>

        <Grid mobile={4} height="calc(100vh - 108px)">
          <ChatBox>
            <ChatBoxHeader />

            <ChatBoxBody scrollDependency={ticket.data?.messages}>
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
            </ChatBoxBody>

            <ChatBoxFooter>
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
                <UploadIconButton
                  enterKeyHint="enter"
                  accept=".xlsx,.xls,.pdf,.txt,.json,.png,.jpg"
                  onChange={fileUploader.onFileChange}
                />

                <ChatBoxTextField
                  placeholder="Comment"
                  variant="outlined"
                  onSend={handleSendMessage}
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                />
              </HStack>
            </ChatBoxFooter>
          </ChatBox>
        </Grid>
      </Grid>
    </>
  );
};

export default TickerDetailPage;

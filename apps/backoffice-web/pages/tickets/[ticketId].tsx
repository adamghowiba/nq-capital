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
  Box,
  CHIP_COLOR_MAP,
  ChatBox,
  ChatBoxBody,
  ChatBoxFooter,
  ChatBoxHeader,
  ChatBoxTextField,
  ColoredChip,
  ConfirmationModal,
  FileChip,
  HStack,
  MenuButton,
  MenuList,
  MessageCard,
  NMenu,
  NMenuItem,
  TICKET_STATUS_COLOR_MAP,
  TicketHeader,
  UploadIconButton,
  VStack,
  useConfirmation,
  useFileUpload,
} from '@nq-capital/nui';
import { formatISOForTable } from '@nq-capital/utils';
import { useMutation } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { queryClient } from '../../lib/api/query-client';
import { restApi } from '../../lib/api/rest-client';
import { Screen } from '../../lib/components/Screen/Screen';
import { SCREEN_HEIGHT_CALC } from '../../lib/constants/size.constants';
import {
  RetrieveTicketQuery,
  TicketStatus,
  useDeleteTicketMutation,
  useRetrieveTicketQuery,
  useSendTicketMessageMutation,
  useUpdateTicketMutation,
} from '../../lib/gql/gql-client';
import { useUser } from '../../lib/hooks/use-user';
import { parseApiError } from '../../lib/utils/error.utils';

type TicketMessageQueryData = RetrieveTicketQuery['ticket']['messages'][number];

const getMessageDisplayName = (
  message: TicketMessageQueryData,
  userId?: number
) => {
  if (message.type === 'ADMIN' && message?.sent_by_user_id === userId)
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
  const deleteDialog = useConfirmation<{ id: number }>();

  const user = useUser();
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
    mutationFn: restApi.uploadTicketFile,
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

  const updateTickerMutation = useUpdateTicketMutation({
    onSuccess: () => {
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
    const promise = deleteTicketMutation.mutateAsync({ id: ticketId });

    toast.promise(promise, {
      loading: 'Deleting ticket...',
      success: 'Ticket deleted successfully',
      error: parseApiError,
    });
  };

  const handleUpdateTicketStatus = (status: TicketStatus) => {
    const promise = updateTickerMutation.mutateAsync({
      updateTicketInput: {
        id: ticketId,
        status,
      },
    });

    toast.promise(promise, {
      loading: 'Updating ticket...',
      success: 'Ticket updated successfully',
      error: parseApiError,
    });
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
      <Grid container height={SCREEN_HEIGHT_CALC}>
        <Grid mobile={8}>
          <Screen gap={5}>
            <TicketHeader
              status={ticket.data?.status || 'OPEN'}
              createdIsoDate={ticket.data?.created_at}
              actions={
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={() => deleteDialog.onOpen({ id: ticketId })}
                    startIcon={
                      deleteTicketMutation.isPending ? (
                        <CircularProgress size={13} />
                      ) : undefined
                    }
                    disabled={deleteTicketMutation.isPending}
                  >
                    Delete
                  </Button>

                  <NMenu>
                    <MenuButton>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        startIcon={
                          <Box
                            w="8px"
                            h="8px"
                            borderRadius="8px"
                            bgcolor={
                              CHIP_COLOR_MAP[
                                TICKET_STATUS_COLOR_MAP[
                                  ticket.data?.status || 'OPEN'
                                ]
                              ].color
                            }
                          />
                        }
                      >
                        Change Status
                      </Button>
                    </MenuButton>

                    <MenuList>
                      <NMenuItem
                        colorBadge={CHIP_COLOR_MAP['green'].color}
                        onClick={() => handleUpdateTicketStatus('OPEN')}
                      >
                        Open
                      </NMenuItem>
                      <NMenuItem
                        colorBadge={CHIP_COLOR_MAP['red'].color}
                        onClick={() => handleUpdateTicketStatus('CLOSED')}
                      >
                        Closed
                      </NMenuItem>
                      <NMenuItem
                        colorBadge={CHIP_COLOR_MAP['yellow'].color}
                        onClick={() => handleUpdateTicketStatus('UNDER_REVIEW')}
                      >
                        Under Review
                      </NMenuItem>
                    </MenuList>
                  </NMenu>
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

        <Grid mobile={4} height="100%">
          <ChatBox>
            <ChatBoxHeader />

            <ChatBoxBody scrollDependency={ticket.data?.messages}>
              {ticket.data?.messages.map((message, index) => (
                <MessageCard
                  key={message.id}
                  content={message.content}
                  date={message.created_at}
                  displayName={getMessageDisplayName(message, user.data?.id)}
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

      <ConfirmationModal
        {...deleteDialog.getConfirmationProps()}
        onConfirm={handleDeleteTicket}
        title="Delete ticket?"
        content="This action cannot be undone"
        isLoading={deleteTicketMutation.isPending}
      >
        Are you sure you want to delete this user?
      </ConfirmationModal>
    </>
  );
};

export default TickerDetailPage;

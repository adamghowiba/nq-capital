import inviteIcon from '@iconify/icons-fluent/add-16-filled';
import moreVertical from '@iconify/icons-fluent/more-vertical-16-filled';
import { Icon } from '@iconify/react';
import { TabContext, TabPanel } from '@mui/lab';
import { Button, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import {
  ACCOUNT_STATUS_COLOR_MAP,
  Box,
  ColoredChip,
  CustomDataGrid,
  HStack,
  INVITATION_STATUS_COLOR_MAP,
  MenuButton,
  MenuList,
  NAvatar,
  NLink,
  NMenu,
  NMenuItem,
  PageHeader,
  StyledTab,
  StyledTabs,
  VStack,
} from '@nq-capital/nui';
import { formatISOForTable } from '@nq-capital/utils';
import { useMemo, useState } from 'react';
import { Screen } from '../../lib/components/Screen/Screen';
import {
  ListInvestorsQuery,
  ListInvitationsQuery,
  useDeleteInvitationMutation,
  useInviteInvestorMutation,
  useListInvestorsQuery,
  useListInvitationsQuery,
} from '../../lib/gql/gql-client';
import InviteSingleInvestorDialog from '../../lib/modules/investors/components/InviteSingleInvestorDialog';
import { NextPageWithLayout } from '../_app';

const UserListPage: NextPageWithLayout = ({ ...props }) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState<'investors' | 'invitations'>(
    'investors'
  );

  const investorsQuery = useListInvestorsQuery(undefined, {
    select: (data) => data.investors,
  });

  const invitationsQuery = useListInvitationsQuery(
    {},
    { select: (data) => data.invitations }
  );

  const inviteInvestorMutation = useInviteInvestorMutation({
    onSuccess: () => {
      setIsInviteDialogOpen(false);
      investorsQuery.refetch();
    },
  });

  const deleteInvitationMutation = useDeleteInvitationMutation({
    onSuccess: () => {
      invitationsQuery.refetch();
    },
  });

  const investorColumns = useMemo((): GridColDef<
    ListInvestorsQuery['investors'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 50,
      },
      {
        field: 'user',
        headerName: 'User',
        width: 250,
        renderCell: (params) => {
          return (
            <NLink href={`/users/${params.row.id}`} underline={'none'}>
              <HStack gap={2} align="center">
                <NAvatar size="sm">
                  {params.row.first_name.substring(0, 1)}
                </NAvatar>

                <VStack gap={0}>
                  <Typography fontSize="13px">
                    {params.row.first_name} {params.row.last_name}
                  </Typography>
                  <Typography color="grey.500" fontSize="13px">
                    {params.row.email}
                  </Typography>
                </VStack>
              </HStack>
            </NLink>
          );
        },
        valueGetter: (params) =>
          `${params.row?.first_name} ${params.row?.last_name}`,
      },
      {
        field: 'bank',
        headerName: 'Bank',
        valueFormatter: (params) => params.value || '-',
      },
      {
        field: 'phone_number',
        headerName: 'Mobile No.',
        width: 150,
        valueFormatter: (params) => params.value || '-',
      },
      {
        field: 'created_at',
        headerName: 'Date Added',
        valueFormatter: (params) => formatISOForTable(params.value),
        width: 150,
      },
      {
        field: 'account_status',
        headerName: 'Status',
        renderCell: (params) => (
          <ColoredChip
            colorSchema={
              params.row?.account_status
                ? ACCOUNT_STATUS_COLOR_MAP[params.row?.account_status]
                : 'neutral'
            }
            label={params?.value}
          />
        ),
        width: 100,
      },
      {
        field: 'actions',
        headerName: '',
        type: 'actions',
        renderCell: (params) => (
          <NMenu>
            <MenuButton>
              <IconButton size="small">
                <Icon icon={moreVertical} />
              </IconButton>
            </MenuButton>

            <MenuList>
              <NMenuItem disabled>Edit</NMenuItem>
              <NMenuItem disabled>Delete</NMenuItem>
            </MenuList>
          </NMenu>
        ),
      },
    ];
  }, []);

  const invitationColumn = useMemo((): GridColDef<
    ListInvitationsQuery['invitations'][number]
  >[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 50,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 250,
      },
      {
        field: 'invitation_code',
        headerName: 'Code',
        valueFormatter: (params) => params.value || '-',
      },
      {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (
          <ColoredChip
            colorSchema={
              INVITATION_STATUS_COLOR_MAP[params?.row?.status] || 'neutral'
            }
            label={params?.value}
          />
        ),
        width: 100,
      },
      {
        field: 'sent_at',
        headerName: 'Sent Date',
        valueFormatter: (params) => formatISOForTable(params.value),
        width: 150,
      },
      {
        field: 'expires_at',
        headerName: 'Expires',
        valueFormatter: (params) => formatISOForTable(params.value),
        width: 150,
      },
      {
        field: 'resent_count',
        headerName: 'Resent Count',
        width: 150,
      },
      {
        field: 'actions',
        headerName: '',
        type: 'actions',
        renderCell: (params) => (
          <NMenu>
            <MenuButton>
              <IconButton size="small">
                <Icon icon={moreVertical} />
              </IconButton>
            </MenuButton>

            <MenuList>
              <NMenuItem disabled>Resend</NMenuItem>
              <NMenuItem
                onClick={() =>
                  deleteInvitationMutation.mutate({ id: params.row.id })
                }
              >
                Delete
              </NMenuItem>
            </MenuList>
          </NMenu>
        ),
      },
    ];
  }, []);

  return (
    <>
      <Screen>
        <PageHeader
          title="Users"
          actions={
            <>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon icon={inviteIcon} width={15} height={15} />}
                onClick={() => setIsInviteDialogOpen(true)}
              >
                Invite
              </Button>
            </>
          }
        />

        <TabContext value={tabValue}>
          <StyledTabs
            value={tabValue}
            onChange={(event, value) => setTabValue(value)}
            aria-label="Switch tabs"
            sx={{ width: 'auto', marginRight: 'auto' }}
          >
            <StyledTab
              label="Investors"
              value="investors"
              sx={{ padding: '4px 10px', minHeight: '25px' }}
            />
            <StyledTab
              label="Invitations"
              value="invitations"
              sx={{ padding: '4px 10px', minHeight: '25px' }}
            />
          </StyledTabs>

          <TabPanel value="investors" sx={{ p: 0 }}>
            <Box h="700px">
              <CustomDataGrid
                loading={investorsQuery.isLoading}
                rows={investorsQuery.data || []}
                columns={investorColumns}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </TabPanel>

          <TabPanel value="invitations" sx={{ p: 0 }}>
            <Box h="700px">
              <CustomDataGrid
                loading={invitationsQuery.isLoading}
                rows={invitationsQuery.data || []}
                columns={invitationColumn}
                checkboxSelection
                disableRowSelectionOnClick
                renderSelectActions={({ selectedRows }) => {
                  return (
                    <>
                      {selectedRows.length === 1 && (
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() =>
                            deleteInvitationMutation.mutate({
                              id: selectedRows[0] as number,
                            })
                          }
                        >
                          Delete
                        </Button>
                      )}
                    </>
                  );
                }}
              />
            </Box>
          </TabPanel>
        </TabContext>
      </Screen>

      <InviteSingleInvestorDialog
        open={isInviteDialogOpen}
        onInvite={(data) =>
          inviteInvestorMutation.mutate({
            invitationInput: {
              email: data.email,
              type: 'INVESTOR',
            },
          })
        }
        isLoading={inviteInvestorMutation.isPending}
        onClose={() => setIsInviteDialogOpen(false)}
      />
    </>
  );
};

export default UserListPage;

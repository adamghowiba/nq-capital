import moreVertical from '@iconify/icons-fluent/more-vertical-16-filled';
import React, { FC, useMemo, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import {
  Box,
  ChipColorSchema,
  ColoredChip,
  CustomDataGrid,
  HStack,
  MenuButton,
  MenuList,
  NAvatar,
  NMenu,
  NMenuItem,
  PageHeader,
  VStack,
  useGql,
} from '@nq-capital/nui';
import { GridColDef } from '@mui/x-data-grid';
import { Button, IconButton, Typography } from '@mui/material';
import { formatISOForTable } from '@nq-capital/utils';
import { graphql } from 'apps/backoffice-web/lib/gql';
import {
  InvestorAccountStatus,
  ListInvestorsQuery,
} from 'apps/backoffice-web/lib/gql/graphql';
import { Icon } from '@iconify/react';
import { Screen } from 'apps/backoffice-web/lib/components/Screen/Screen';
import inviteIcon from '@iconify/icons-fluent/add-16-filled';
import InviteInvestorDialog from 'apps/backoffice-web/lib/modules/investors/components/InviteInvestorDialog';

const ListUsersDocument = graphql(`
  query ListInvestors {
    investors {
      id
      first_name
      last_name
      email
      bank_accounts {
        account_number
        is_primary
      }
      account_status
      created_at
    }
  }
`);

const UserListPage: NextPageWithLayout = ({ ...props }) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const investorsQuery = useGql(ListUsersDocument, undefined, {
    select: (data) => data.investors,
  });

  const ACCOUNT_STATUS_COLOR_MAP: Record<
    InvestorAccountStatus,
    ChipColorSchema
  > = {
    ACTIVE: 'green',
    DISABLED: 'red',
    ONBOARDING: 'blue',
  };

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
          );
        },
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

        <Box h="700px">
          <CustomDataGrid
            loading={investorsQuery.isLoading}
            rows={investorsQuery.data || []}
            columns={investorColumns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Screen>

      <InviteInvestorDialog
        open={isInviteDialogOpen}
        onInvite={console.log}
        onClose={() => setIsInviteDialogOpen(false)}
      />
    </>
  );
};

export default UserListPage;

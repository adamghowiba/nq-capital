import React, { FC, useMemo } from 'react';
import { NextPageWithLayout } from '../_app';
import {
  Box,
  ColoredChip,
  CustomDataGrid,
  HStack,
  NAvatar,
  VStack,
} from '@nq-capital/nui';
import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { formatISOForTable } from '@nq-capital/utils';

const UserListPage: NextPageWithLayout = ({ ...props }) => {
  const investorColumns = useMemo((): GridColDef<any>[] => {
    return [
      {
        field: 'id',
        headerName: 'ID',
      },
      {
        field: 'user',
        headerName: 'User',
        renderCell: (params) => {
          return (
            <HStack>
              <NAvatar>A</NAvatar>

              <VStack gap={0.5}>
                <Typography>Adam Ghowiba</Typography>
                <Typography color="text.secondary">adamg@gmail.com</Typography>
              </VStack>
            </HStack>
          );
        },
      },
      {
        field: 'bank',
        headerName: 'Bank',
      },
      {
        field: 'phone_number',
        headerName: 'Mobile No.',
      },
      {
        field: 'created_at',
        headerName: 'Date Added',
        valueFormatter: (params) => formatISOForTable(params.value),
      },
      {
        field: 'status',
        headerName: 'Status',
        renderCell: (params) => (
          <ColoredChip colorSchema="blue" label={params?.value} />
        ),
      },
    ];
  }, []);

  return (
    <>
      <Box h="700px">
        <CustomDataGrid
          rows={[{ id: 10, name: 'adam' }]}
          columns={investorColumns}
          checkboxSelection
        />
      </Box>
    </>
  );
};

export default UserListPage;

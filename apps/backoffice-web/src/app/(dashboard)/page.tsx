'use client';
import { DataGrid } from '@mui/x-data-grid';
import { Suspense, useMemo } from 'react';
import { useListUsersQuery } from '../../api/gql-client';
import Box from '../../lib/components/Box/Box';
import DContainer from '../../lib/components/DContainer/DContainer';
import { formatGridColumns } from '../../lib/components/StyledDataGrid/helpers/data-grid.utils';
import Loading from './loading';
import Test from './test';


export default function Index() {
  const users = useListUsersQuery({}, { select: (data) => data.users.data });

  console.log(users.data);

  const columns = useMemo(() => {
    if (!users.data?.length) return [];

    return formatGridColumns(users?.data[0], {});
  }, [users.data]);

  return (
    <>
      <DContainer my={5}>
        <Box h="60vh">
          <Suspense fallback={<Loading />}>
            <Test />
            {/* <DataGrid rows={users.data || []} columns={[{ field: 'id' }]} /> */}
          </Suspense>
        </Box>
      </DContainer>
    </>
  );
}

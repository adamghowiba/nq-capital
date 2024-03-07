// import { GraphQLClient, request } from 'graphql-request';
import { Suspense } from 'react';
// import Test from './test';
// import { useGql } from '../../lib/hooks/use-gql';
// import { ListUsersDocument } from '../../api/gql/graphql';
import { Box } from '@mui/material';
import DContainer from '../DContainer/DContainer';
import Loading from './loading';

// const client = new GraphQLClient('http://localhost:5010/graphql');

export const revalidate = 2000;

export default async function Index() {
  // const users = await client.request(ListUsersDocument, { limit: 100 });

  return (
    <>
      <DContainer my={5}>
        <Box height="60vh">
          <Suspense fallback={<Loading />}>
            {/* <Test users={users.users.data} /> */}
            {/* <DataGrid rows={users.data || []} columns={[{ field: 'id' }]} /> */}
          </Suspense>
        </Box>
      </DContainer>
    </>
  );
}

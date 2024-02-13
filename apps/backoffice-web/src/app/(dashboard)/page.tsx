import { GraphQLClient, request } from 'graphql-request';
import { Suspense } from 'react';
import Box from '../../lib/components/Box/Box';
import DContainer from '../../lib/components/DContainer/DContainer';
import Test from './test';
import { ListUsersDocument } from '../../api/gql/graphql';
import Loading from './loading';

const client = new GraphQLClient('http://localhost:5010/graphql');

export const revalidate = 2000

export default async function Index() {
  const users = await client.request(ListUsersDocument, { limit: 100 });

  console.log(users);

  return (
    <>
      <DContainer my={5}>
        <Box h="60vh">
          <Suspense fallback={<Loading />}>
            <Test users={users.users.data} />
            {/* <DataGrid rows={users.data || []} columns={[{ field: 'id' }]} /> */}
          </Suspense>
        </Box>
      </DContainer>
    </>
  );
}

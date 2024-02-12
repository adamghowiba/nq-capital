import React, { FC } from 'react';
import { request } from 'graphql-request';
import { ListUsersDocument } from '../../api/gql/graphql';

const Test = async ({ ...props }) => {
  const data = await request({
    url: 'http://localhost:5000/graphql',
    document: ListUsersDocument,
    variables: { limit: 10, page: 10 },
  });

  return (
    <>
      <div>{data?.users?.data?.[0].last_name}</div>
    </>
  );
};

export default Test;

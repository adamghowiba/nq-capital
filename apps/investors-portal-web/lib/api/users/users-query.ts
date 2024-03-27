// import { gql } from 'graphql-request';
import {gql} from '@apollo/client'

export const USER_NAME_FRAGMENT = gql`
  fragment UserName on UserEntity {
    first_name
    last_name
  }
`;

export const ListUsersV2 = gql`
  query ListUsersV2($limit: Int, $page: Int) {
    users(limit: $limit, page: $page) {
      data {
        id
        first_name
        ...UserName
      }
    }
  }
  ${USER_NAME_FRAGMENT}
`;

import { gql } from '@apollo/client';

export const GET_LISTS = gql`
  query {
    getLists {
      count,
      lists {
        _id,
        title,
        items {
          _id,
          name,
          done,
        }
      }
    }
  }
`;

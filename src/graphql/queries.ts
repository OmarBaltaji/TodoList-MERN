import { gql } from '@apollo/client';
import { ListFragment } from './fragments';

export const GET_LISTS = gql`
  query {
    getLists {
      count,
      lists {
        ...ListFragment
      }
    }
  }
  ${ListFragment}
`;

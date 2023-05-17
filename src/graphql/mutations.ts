import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
  mutation CreateList($dto: ListDto!) {
    createList (dto: $dto) {
      list {
        _id,
        title,
        items {
          _id,
          name
        }
      }
    }
  } 
`;

export const UPDATE_LIST = gql`
  mutation UpdateList($id: String!, $dto: ListDto!) {
    updateList (id: $id, dto: $dto) {
      list {
        _id,
        title,
        items {
          _id,
          name
        }
      }
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($id: String!) {
    deleteList (id: $id)
  }
`;
import { gql } from "@apollo/client";

export const CREATE_LIST = gql`
  mutation CreateList ($dto: ListDto!) {
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
  mutation UpdateList ($id: String!, $dto: ListDto!) {
    updateList (id: $id, dto: $dto) {
      list {
        _id,
        title,
        items {
          _id,
          name,
          done
        }
      }
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList ($id: String!) {
    deleteList (id: $id)
  }
`;

export const CREATE_ITEM = gql`
  mutation CreateItem ($dto: CreateItemDto!) {
    createItem (dto: $dto) {
      item {
        _id,
        name,
        done
      }
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem ($id: String!, $dto: EditItemDto!) {
    updateItem (id: $id, dto: $dto) {
      item {
        _id,
        name,
        done
      }
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem ($id: String!) {
    deleteItem (id: $id)
  }
`;
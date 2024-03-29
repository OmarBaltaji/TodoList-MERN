import { gql } from "@apollo/client";
import { ItemFragment, ListFragment } from "./fragments";

export const LOGIN = gql`
  mutation Login ($dto: LoginAuthDto!) {
    login(dto: $dto) {
      access_token
    }
  }
`;

export const REGISTER = gql`
  mutation Register ($dto: RegisterAuthDto!) {
    register (dto: $dto) {
      result
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      result
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList ($dto: ListDto!) {
    createList (dto: $dto) {
      list {
        ...ListFragment
      }
    }
  } 
  ${ListFragment}
`;

export const UPDATE_LIST = gql`
  mutation UpdateList ($id: String!, $dto: ListDto!) {
    updateList (id: $id, dto: $dto) {
      list {
        ...ListFragment
      }
    }
  }
  ${ListFragment}
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
        ...ItemFragment
      }
    }
  }
  ${ItemFragment}
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem ($id: String!, $dto: EditItemDto!) {
    updateItem (id: $id, dto: $dto) {
      item {
        ...ItemFragment
      }
    }
  }
  ${ItemFragment}
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem ($id: String!) {
    deleteItem (id: $id)
  }
`;
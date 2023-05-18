import { gql } from "@apollo/client";

export const ListFragment = gql`
  fragment ListFragment on List {
    _id,
    title,
    items {
      _id,
      name,
      done
    }
  }
`;

export const ItemFragment = gql`
  fragment ItemFragment on Item {
    _id,
    name,
    done
  }
`;
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedBanks {
        name
        address
        needs
        phone
        email
        link
      }
    }
  }
`;

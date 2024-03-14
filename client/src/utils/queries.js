import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      foodbanks {
        bankId
        name
        address
        needs
        phone
        email
        homepageLink
      }
    }
  }
`;
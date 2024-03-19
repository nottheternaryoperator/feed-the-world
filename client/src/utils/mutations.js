import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BANK = gql`
  mutation saveBank($input: BankData!) {
    saveBank(input: $input) {
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

export const REMOVE_BANK = gql`
  mutation removeBank($name: String!) {
    removeBank(name: $name) {
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

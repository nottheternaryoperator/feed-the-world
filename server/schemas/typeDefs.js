const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Bank {
    bankId: ID!
    name: String!
    address: [String]
    needs: [String]
    phone: String
    email: String
    link: String
  }

  type Query {
    me: User
    user(userId: ID!): User
  }

  input bankData {
    bankId: ID!
    name: String!
    address: [String]
    needs: [String]
    phone: String
    email: String
    homepageLink: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBank(input: bankData!): User
    removeBank(bankId: ID!): User
  }
`;

module.exports = typeDefs;

export const SAVE_BANK = gql`
mutation saveBank{$input: BankData!} {
    saveBook(input: $input) {
        _id
        username
        email
        savedBanks {
            name
            address
            needsphone
            email
            link
            
        }
    }
}`;

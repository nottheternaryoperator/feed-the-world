const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    savedBanks: [Bank]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Bank {
    name: String!
    address: String
    needs: String
    phone: String
    email: String
    link: String
  }

  type Query {
    me: User
    user(userId: ID!): User
  }

  input BankData {
    name: String!
    address: String
    needs: String
    phone: String
    email: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBank(input: BankData!): User
    removeBank(bankName: String!): User
  }
`;

module.exports = typeDefs;

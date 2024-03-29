const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          'Incorrect credentials - no user found with this email address'
        );
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError(
          'Incorrect credentials - no user found with this email address'
        );
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    saveBank: async (parent, { input }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBanks: input } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeBank: async (parent, { name }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBanks: { name } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

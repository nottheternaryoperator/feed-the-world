const { Schema, Types } = require('mongoose');

const bankSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    address: [String],
    needs: [String],
    phone: String,
    email: String,
    homepageLink : String,
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = bankSchema;
const { Schema } = require('mongoose');

const bankSchema = new Schema(
  {
    bankId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    name: {
      type: String,
      required: true,
    },
    address: { type: String },
    needs: { type: String },
    phone: { type: String },
    email: { type: String },
    link: { type: String },
  },

  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = bankSchema;

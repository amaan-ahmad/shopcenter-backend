const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      productId: { type: ObjectId, ref: "products" },
      qty: {
        type: Number,
      },
    },
  ],
  wishlist: [
    {
      productId: { type: ObjectId, ref: "products" },
    },
  ],
});

module.exports = model("buyers", BuyerSchema);

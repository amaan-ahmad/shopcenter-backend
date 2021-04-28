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
  address: [
    {
      line1: {
        type: String,
        default: "",
      },
      line2: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      zipcode: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = model("buyers", BuyerSchema);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new Schema({
  sellerId: {
    type: ObjectId,
    ref: "sellers",
  },
  buyerId: {
    type: ObjectId,
    ref: "buyers",
  },
  items: [
    {
      productId: { type: ObjectId, ref: "products" },
      qty: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
  },
});

module.exports = model("orders", OrderSchema);

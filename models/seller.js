const { Schema, model } = require("mongoose");

const SellerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile_no: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("seller", SellerSchema);

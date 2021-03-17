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
  password: {
    type: String,
    required: true,
  },
});

module.exports = model("seller", SellerSchema);

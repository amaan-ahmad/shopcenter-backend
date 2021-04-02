const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;
const monguurl = require("monguurl");
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: ObjectId,
    ref: "Seller",
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  slug: {
    type: String,
    index: {
      unique: true,
    },
  },
  photo: {
    type: String,
    required: true,
  },
});

ProductSchema.plugin(
  monguurl({
    source: "name",
    target: "slug",
  })
);

module.exports = model("products", ProductSchema);

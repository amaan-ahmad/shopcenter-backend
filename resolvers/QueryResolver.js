const { products, buyer } = require("../models");
const getPayload = require("../utils/auth");

module.exports.getProductById = async (parent, args) => {
  try {
    return await products.findById(args.id);
  } catch (error) {
    return error;
  }
};

module.exports.getAllProducts = async (parent, args, context) => {
  try {
    return await products.find({}).limit(20);
  } catch (error) {
    return error;
  }
};

module.exports.getBuyer = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    return await buyer.findById(payload.id).select("-password");
  } catch (error) {
    return error;
  }
};

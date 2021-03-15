const { products } = require("../models");

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

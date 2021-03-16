const { products, seller, category, buyer } = require("../models");

module.exports.createProduct = async (parent, args) => {
  try {
    const { name, price, sellerId, categoryId } = args;
    const newProduct = await new products({
      name,
      price,
      sellerId,
      categoryId,
    }).save();
    return newProduct;
  } catch (error) {
    return error;
  }
};

module.exports.createSeller = async (parent, args) => {
  try {
    const { name, email, mobile_no } = args;
    const newSeller = await new seller({
      name,
      email,
      mobile_no,
    }).save();
    return newSeller;
  } catch (error) {
    return error;
  }
};

module.exports.createCategory = async (parent, args) => {
  try {
    const { name } = args;
    const newCategory = await new category({
      name,
    }).save();
    return newCategory;
  } catch (error) {
    return error;
  }
};

module.exports.createBuyer = async (parent, args) => {
  try {
    const { name, email, password } = args;
    return await new buyer({
      name,
      email,
      password,
    }).save();
  } catch (error) {
    return error;
  }
};

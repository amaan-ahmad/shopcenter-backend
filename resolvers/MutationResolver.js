const { products, seller, category, buyer } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

module.exports.buyerSignup = async (parent, args) => {
  try {
    const { name, email, password } = args;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newBuyer = await new buyer({
      name,
      email,
      password: hashedPassword,
    }).save();
    const token = jwt.sign(
      { id: newBuyer._id, role: "BUYER" },
      process.env.JWT_SECRET
    );
    return {
      token,
      userId: newBuyer._id,
    };
  } catch (error) {
    return error;
  }
};

module.exports.buyerLogin = async (parent, args) => {
  try {
    const { email, password } = args;
    const existingBuyer = await buyer.findOne({ email });

    if (!existingBuyer) {
      throw new Error("No such user found.");
    }

    const valid = await bcrypt.compare(password, existingBuyer.password);
    if (!valid) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      {
        id: existingBuyer._id,
        role: "BUYER",
      },
      process.env.JWT_SECRET
    );

    return {
      token,
      userId: existingBuyer._id,
    };
  } catch (error) {
    return error;
  }
};

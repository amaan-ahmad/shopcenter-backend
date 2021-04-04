const { products, seller, category, buyer } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getPayload = require("../utils/auth");
const { uploadImage } = require("../utils/upload");

module.exports.createProduct = async (parent, args, context) => {
  try {
    const { name, price, categoryId, photo } = args;
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }
    const sellerId = payload.id;
    const newProduct = await new products({
      name,
      price,
      sellerId,
      categoryId,
      photo,
    }).save();
    return newProduct;
  } catch (error) {
    return error;
  }
};

module.exports.sellerSignup = async (parent, args) => {
  try {
    const { name, email, mobile_no, password } = args;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSeller = await new seller({
      name,
      email,
      mobile_no,
      password: hashedPassword,
    }).save();

    const token = jwt.sign(
      { id: newSeller._id, role: "SELLER" },
      process.env.JWT_SECRET
    );
    return {
      token,
      userId: newSeller._id,
    };
  } catch (error) {
    return error;
  }
};

module.exports.sellerLogin = async (parent, args) => {
  try {
    const { email, password } = args;
    const existingSeller = await seller.findOne({ email });

    if (!existingSeller) {
      throw new Error("No such user found.");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingSeller.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid credentials.");
    }

    const token = jwt.sign(
      { id: existingSeller._id, role: "SELLER" },
      process.env.JWT_SECRET
    );
    return {
      token,
      userId: existingSeller._id,
    };
  } catch (error) {
    return error;
  }
};

module.exports.createCategory = async (parent, args, context) => {
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

module.exports.addToCart = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }
    let resp = await buyer.updateOne(
      { _id: payload.id },
      {
        $push: {
          cart: {
            productId: args.id,
          },
        },
      },
      function (error, success) {
        if (error) {
          console.error(error);
          throw new Error(error);
        } else {
          console.log(success);
          return success;
        }
      }
    );
    if (resp.ok) {
      return await products.findById(args.id);
    }
  } catch (error) {
    return error;
  }
};

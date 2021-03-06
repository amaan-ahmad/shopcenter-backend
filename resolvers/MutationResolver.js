const { products, seller, category, buyer } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getPayload = require("../utils/auth");
const { uploadImage } = require("../utils/upload");
const _ = require("lodash");
const { ObjectId } = require("mongoose").Types;

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

/**
 * args.qty < 0 => {decreases quantity}
 * if quantity left is 1 and quantity is decreased then it removes the element from cart.
 * args.qty > 0 => {increase quantity}
 *
 */

module.exports.updateCart = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }
    const { cart } = await buyer
      .findById(payload.id)
      .select("cart -_id")
      .exec();

    let resp;

    /**
     *  looking if cartItem is already present then increament the qty.
     *  else add a new cartItem to cart[] in DB.
     */
    let cartItem = _.find(cart, { productId: ObjectId(args.id) });
    const alreadyExists = cartItem !== undefined;
    if (alreadyExists) {
      if (args.qty < 0 && cartItem.qty + args.qty <= 0) {
        // remove the product completely from the cart[]
        resp = await buyer.updateOne(
          { _id: payload.id },
          {
            $pull: {
              cart: {
                productId: ObjectId(args.id),
              },
            },
          },
          { new: true }
        );
      } else {
        resp = await buyer.updateOne(
          { _id: payload.id, "cart.productId": ObjectId(args.id) },
          {
            $inc: {
              "cart.$.qty": args.qty,
            },
          }
        );
      }
    } else {
      resp = await buyer.updateOne(
        { _id: payload.id },
        {
          $addToSet: {
            cart: {
              productId: ObjectId(args.id),
              qty: args.qty <= 0 ? 1 : args.qty,
            },
          },
        }
      );
    }
    if (resp.ok) {
      const { cart } = await buyer.findOne({
        _id: payload.id,
      });
      const updatedCartItem = _.find(cart, {
        productId: ObjectId(args.id),
      });
      const qty = updatedCartItem ? updatedCartItem.qty : 0;
      return {
        product: await products.findById(args.id),
        qty,
      };
    }
  } catch (error) {
    return error;
  }
};

module.exports.saveWishlist = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }

    const resp = await buyer.updateOne(
      { _id: payload.id },
      {
        $addToSet: {
          wishlist: {
            productId: ObjectId(args.id),
          },
        },
      }
    );

    if (resp.ok) {
      return await products.findById(args.id);
    } else {
      throw new Error("Unable to save to wishlist.");
    }
  } catch (error) {
    return error;
  }
};

module.exports.unSaveWishlist = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }

    let resp = await buyer.updateOne(
      { _id: payload.id },
      {
        $pull: {
          wishlist: {
            productId: ObjectId(args.id),
          },
        },
      }
    );

    if (resp.ok) {
      return await products.findById(args.id);
    } else {
      throw new Error("Unable to unsave from wishlist.");
    }
  } catch (error) {
    return error;
  }
};

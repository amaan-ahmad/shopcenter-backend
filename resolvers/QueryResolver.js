const { products, buyer } = require("../models");
const getPayload = require("../utils/auth");
module.exports.getProductById = async (parent, args) => {
  try {
    if (args.id) {
      return await products.findById(args.id);
    } else if (args.slug) {
      return await products.findOne({ slug: args.slug });
    }
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
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }
    return await buyer.findById(payload.id).select("-password");
  } catch (error) {
    return error;
  }
};

module.exports.getCartItems = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }
    const { cart } = await buyer
      .findById(payload.id)
      .select("cart -_id")
      .exec();

    const cartIDs = [];
    cart.forEach((i) => {
      cartIDs.push(i.productId);
    });

    return await products.find(
      {
        _id: {
          $in: cartIDs,
        },
      },
      function (err, docs) {
        if (err) {
          throw new Error(err);
        } else {
          return docs;
        }
      }
    );
  } catch (error) {
    return error;
  }
};

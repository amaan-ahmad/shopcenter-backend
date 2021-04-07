const { products, buyer } = require("../models");
const getPayload = require("../utils/auth");
const _ = require("lodash");

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
    let data;
    await products.find(
      {
        _id: {
          $in: cartIDs,
        },
      },
      function (err, productData) {
        if (err) {
          throw new Error(err);
        } else {
          // this array will contain CartItem type objects.
          let result = [];
          /** 
          fetching qty of each product from database, by matching product._id and then preparing
          result array filled with CartItem type objects.
          */
          productData.forEach((i) => {
            // becarefull ! here productId and i._id both are typeof Object, that's why lodash works here

            const { qty } = _.find(cart, {
              productId: i._id,
            });
            result.push({
              product: i,
              qty,
            });
          });
          data = result;
          return result;
        }
      }
    );
    // the array containing `CartItem` type objects
    return data;
  } catch (error) {
    return error;
  }
};

module.exports.getWishList = async (parent, args, context) => {
  try {
    const payload = await getPayload(context);
    if (!(payload && payload.id)) {
      throw new Error("Payload not found.");
    }

    const { wishlist } = await buyer
      .findById(payload.id)
      .select("wishlist -_id")
      .exec();
    const wishlistProducts = [];
    wishlist.forEach((item) => {
      wishlistProducts.push(item.productId);
    });

    return await products.find({
      _id: {
        $in: wishlistProducts,
      },
    });
  } catch (error) {
    return error;
  }
};

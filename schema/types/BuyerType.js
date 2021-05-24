const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = require("graphql");

const { buyer, products } = require("../../models");
const _ = require("lodash");

const BuyerType = new GraphQLObjectType({
  name: "Buyer",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    cart: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        try {
          // get ids of products from buyer.cart...
          // get all products of the matching ID...

          const buyerByID = await buyer.findById(parent.id);
          let cartList = [];

          // buyer.cart.productId
          buyerByID.cart.forEach(async ({ productId }) => {
            products
              .findById(productId)
              .then((res) => {
                cartList.push(res);
              })
              .catch((e) => {
                return e;
              });
          });

          return cartList;
        } catch (error) {
          return error;
        }
      },
    },
    wishlist: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        try {
          // get ids of products from buyer.wishlist...
          // get all products of the matching ID...

          const buyer = await buyer.findById(parent.id);
          let wishList = [];

          // buyer.cart.productId
          buyer.wishlist.forEach(async ({ productId }) => {
            let product = await products.findById(productId);
            wishList.push(product);
          });

          return wishList;
        } catch (error) {
          return error;
        }
      },
    },
    address: {
      type: new GraphQLList(AddressType),
      async resolve(parent, args) {
        try {
          const { address } = await buyer.findById(parent.id).select("address");
          return address;
        } catch (error) {
          return error;
        }
      },
    },
  }),
});

module.exports = BuyerType;

const ProductType = require("./ProductType");
const AddressType = require("./AddressType");

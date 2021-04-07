const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const ProductType = require("./types/ProductType");
const BuyerType = require("./types/BuyerType");
const CartItemType = require("./types/CartItemType");

const {
  getAllProducts,
  getProductById,
  getBuyer,
  getCartItems,
  getWishList,
} = require("../resolvers/QueryResolver");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: {
        id: {
          type: GraphQLID,
        },
        slug: {
          type: GraphQLString,
        },
      },
      resolve: getProductById,
    },
    all_products: {
      type: new GraphQLList(ProductType),
      resolve: getAllProducts,
    },
    buyer: {
      type: BuyerType,
      resolve: getBuyer,
    },
    cart: {
      type: new GraphQLList(CartItemType),
      resolve: getCartItems,
    },
    wishlist: {
      type: new GraphQLList(ProductType),
      resolve: getWishList,
    },
  },
});

module.exports = RootQuery;

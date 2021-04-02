const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const ProductType = require("./types/ProductType");
const BuyerType = require("./types/BuyerType");

const {
  getAllProducts,
  getProductById,
  getBuyer,
} = require("../resolvers/QueryResolver");
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    product: {
      type: ProductType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
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
  },
});

module.exports = RootQuery;

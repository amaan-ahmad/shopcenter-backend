const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const ProductType = require("./types/ProductType");
const {
  getAllProducts,
  getProductById,
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
  },
});

module.exports = RootQuery;

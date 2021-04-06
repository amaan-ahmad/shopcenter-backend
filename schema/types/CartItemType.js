const { GraphQLObjectType, GraphQLInt } = require("graphql");

const CartItemType = new GraphQLObjectType({
  name: "CartItem",
  fields: () => ({
    product: {
      type: ProductType,
    },
    qty: {
      type: GraphQLInt,
    },
  }),
});

module.exports = CartItemType;

const ProductType = require("./ProductType");

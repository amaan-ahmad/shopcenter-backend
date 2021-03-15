const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");

const { products } = require("../../models");

const SellerType = new GraphQLObjectType({
  name: "Seller",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    isVerified: {
      type: GraphQLBoolean,
    },
    mobile_no: {
      type: GraphQLString,
    },
    products: {
      type: new GraphQLList(ProductType),
      async resolve(parent, args) {
        try {
          return await products.find({ sellerId: parent.id });
        } catch (error) {
          return error;
        }
      },
    },
  }),
});

module.exports = SellerType;

const ProductType = require("../types/ProductType");

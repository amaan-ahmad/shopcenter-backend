const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} = require("graphql");

const { seller, category } = require("../../models");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLFloat,
    },
    seller: {
      type: SellerType,
      async resolve(parent, args, context, info) {
        try {
          return await seller.findById(parent.sellerId);
        } catch (error) {
          return error;
        }
      },
    },
    category: {
      type: CategoryType,
      async resolve(parent, args) {
        try {
          return await category.findById(parent.categoryId);
        } catch (error) {
          return error;
        }
      },
    },
  }),
});

module.exports = ProductType;

const CategoryType = require("../types/CategoryType");
const SellerType = require("../types/SellerType");

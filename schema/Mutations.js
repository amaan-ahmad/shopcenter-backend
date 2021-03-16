const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const CategoryType = require("./types/CategoryType");
const ProductType = require("./types/ProductType");
const SellerType = require("./types/SellerType");
const BuyerType = require("./types/BuyerType");
const {
  createSeller,
  createBuyer,
  createProduct,
  createCategory,
} = require("../resolvers/MutationResolver");

const Mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    product: {
      type: ProductType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        price: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
        sellerId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        categoryId: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: createProduct,
    },

    seller: {
      type: SellerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        mobile_no: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: createSeller,
    },

    category: {
      type: CategoryType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: createCategory,
    },

    buyer: {
      type: BuyerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
        id: {
          type: GraphQLID,
        },
      },
      resolve: createBuyer,
    },
  },
});

module.exports = Mutations;

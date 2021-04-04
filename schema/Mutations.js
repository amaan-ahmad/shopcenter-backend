const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const CategoryType = require("./types/CategoryType");
const ProductType = require("./types/ProductType");
const AuthTokenType = require("./types/AuthTokenType");
const {
  sellerSignup,
  buyerSignup,
  createProduct,
  createCategory,
  buyerLogin,
  sellerLogin,
  addToCart,
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
        categoryId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        photo: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: createProduct,
    },

    sellerSignup: {
      type: AuthTokenType,
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
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: sellerSignup,
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

    buyerSignup: {
      type: AuthTokenType,
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
      resolve: buyerSignup,
    },

    buyerLogin: {
      type: AuthTokenType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: buyerLogin,
    },

    sellerLogin: {
      type: AuthTokenType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: sellerLogin,
    },

    addToCart: {
      type: ProductType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: addToCart,
    },
  },
});

module.exports = Mutations;

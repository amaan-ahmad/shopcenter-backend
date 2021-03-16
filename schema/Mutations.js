const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const { products, seller, category, buyer } = require("../models");
const CategoryType = require("./types/CategoryType");
const ProductType = require("./types/ProductType");
const SellerType = require("./types/SellerType");
const BuyerType = require("./types/BuyerType");

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
      async resolve(parent, args) {
        try {
          const { name, price, sellerId, categoryId } = args;
          const newProduct = await new products({
            name,
            price,
            sellerId,
            categoryId,
          }).save();
          return newProduct;
        } catch (error) {
          return error;
        }
      },
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
      async resolve(parent, args) {
        try {
          const { name, email, mobile_no } = args;
          const newSeller = await new seller({
            name,
            email,
            mobile_no,
          }).save();
          return newSeller;
        } catch (error) {
          return error;
        }
      },
    },

    category: {
      type: CategoryType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, args) {
        try {
          const { name } = args;
          const newCategory = await new category({
            name,
          }).save();
          return newCategory;
        } catch (error) {
          return error;
        }
      },
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
      async resolve(parent, args) {
        try {
          const { name, email, password } = args;
          return await new buyer({
            name,
            email,
            password,
          }).save();
        } catch (error) {
          return error;
        }
      },
    },
  },
});

module.exports = Mutations;

const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const AddressType = new GraphQLObjectType({
  name: "Address",
  fields: () => ({
    line1: {
      type: GraphQLString,
    },
    line2: {
      type: GraphQLString,
    },
    city: {
      type: GraphQLString,
    },
    state: {
      type: GraphQLString,
    },
    zipcode: {
      type: GraphQLInt,
    },
  }),
});

module.exports = AddressType;

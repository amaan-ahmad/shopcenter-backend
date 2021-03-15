const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");

const CategoryType = new GraphQLObjectType({
  name: "category",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
  }),
});

module.exports = CategoryType;

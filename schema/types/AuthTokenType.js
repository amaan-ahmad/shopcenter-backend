const { GraphQLString, GraphQLObjectType, GraphQLID } = require("graphql");

const AuthTokenType = new GraphQLObjectType({
  name: "AuthToken",
  fields: {
    token: {
      type: GraphQLString,
    },
    userId: {
      type: GraphQLID,
    },
  },
});

module.exports = AuthTokenType;

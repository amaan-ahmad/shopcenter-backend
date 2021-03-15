const { GraphQLSchema } = require("graphql");

const RootQuery = require("./Query");
const Mutations = require("./Mutations");

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});

module.exports = schema;

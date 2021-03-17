const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const app = express();
const SERVER_PORT = process.env.PORT || 5500;
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect("mongodb://127.0.0.1:27017/nbf-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(SERVER_PORT, () => {
  console.log("server running at port: ", SERVER_PORT);
});

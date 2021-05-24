const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const app = express();
const SERVER_PORT = process.env.PORT || 5500;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const { uploadImage } = require("./utils/upload");

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
});

app.post("/test/upload", async (req, res) => {
  console.log(req.body);
  if (req && req.body) {
    try {
      const obj = await uploadImage(req.body.name);
      res.status(200).json(obj);
    } catch (e) {
      return res.status(400).json(e);
    }
  }
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

import express from "express";
import { DBConnection } from "./src/resources/dataSource";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./src/graphql/resolver";
import { typeDefs } from "./src/graphql/typeDefs";

const app = express();

let apolloServer: any;

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

async function startServer() {
  apolloServer = new ApolloServer({
    schema: schema,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer();

DBConnection.initialize()
  .then(() => {
    console.log("Database connection established successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server connected at localhost :: 3000");
});
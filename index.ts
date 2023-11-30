import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";

import { DBConnection } from "./src/resources/dataSource";
import { resolvers } from "./src/graphql/resolver";
import { typeDefs } from "./src/graphql/typeDefs";
import { Logger } from "./src/plugins/logging.plugin";

const app = express();
const logger = new Logger();

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
    logger.log({
      action: 'CREATE_DB_CONNECTION',
      message: 'Database connection initialized successfully',
      context: {
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  logger.log({
    action: 'SERVICE_CREATION',
    message: 'Server connected',
    context: {
      serverPort: 3000
    }
  });
});
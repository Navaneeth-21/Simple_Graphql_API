import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers.js";

// creating the apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`server is ready at ${url}`);
  } catch (error) {
    console.log(error);
  }
};

start();

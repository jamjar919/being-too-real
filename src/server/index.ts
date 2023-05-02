import express from "express";
import * as dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import {ExpressContextFunctionArgument, expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors, { CorsRequest } from 'cors';
import http from "http";
import { readFileSync } from 'fs';

import {Endpoints} from "./common/Endpoints";
import {setupLogs} from "./util/setupLogs";
import {Context} from "../graphql/Context";
import {resolvers} from "./resolvers";
import {getFriendFeed, getMemories} from "./bereal-api/api";
import {MongoClient, ServerApiVersion} from "mongodb";

dotenv.config();
setupLogs();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 16000;

const typeDefs = readFileSync('./src/graphql/schema.graphql', { encoding: 'utf-8' });

/**
 * APOLLO + GRAPHQL
 */
const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Wait for apollo to start up
await apolloServer.start();

app.use(
    '/graphql',
    cors<CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
        context: async (integrationContext: ExpressContextFunctionArgument) => {
            const { req } = integrationContext;

            return {
                token: req.headers.token
            }
        },
    }),
);

/**
 * MONGO DB CONNECTION
 */
const mongoUri: string = process.env.DB_CONNECTION_STRING ?? '';
const client = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.error);


/**
 * REST API
 * (Mainly for debugging)
 */

app.get(Endpoints.BE_REAL, async (_, res) => {
    const data = await getFriendFeed();

    res.send(data);
});

app.get(Endpoints.MEMORIES, async (_, res) => {
    const data = await getMemories();

    res.send(data);
});

// Startup
await new Promise<void>((resolve) => httpServer.listen(port, () => resolve()));
console.log(`🚀 Active on port ${port}!`);

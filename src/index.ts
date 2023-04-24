import express from "express";
import * as dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import {ExpressContextFunctionArgument, expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors, { CorsRequest } from 'cors';
import http from "http";
import { readFileSync } from 'fs';

import {Endpoints} from "./common/Endpoints.js";
import {getFriendFeed} from "./bereal-api/getFriendFeed.js";
import {setupLogs} from "./util/setupLogs.js";

dotenv.config();
setupLogs();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 16000;

interface MyContext {
    token?: string;
}

const typeDefs = readFileSync('./schema/schema.graphql', { encoding: 'utf-8' });

const apolloServer = new ApolloServer<MyContext>({
    typeDefs,
    resolvers: [],
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Wait for apollo to start up
await apolloServer.start();

app.use(
    '/graphql',
    cors<CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(apolloServer, {
        context: async (integrationContext: ExpressContextFunctionArgument) => {
            const { req } = integrationContext;

            return {
                token: req.headers.token
            }
        },
    }),
);

// API
app.get(Endpoints.BE_REAL, async (_, res) => {
    const data = await getFriendFeed();

    res.send(data);
});

// Startup
await new Promise<void>((resolve) => httpServer.listen(port, () => resolve()));
console.log(`🚀 Active on port ${port}!`);

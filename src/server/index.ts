import express from "express";
import * as dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import {ExpressContextFunctionArgument, expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors, { CorsRequest } from 'cors';
import http from "http";
import { readFileSync } from 'fs';

import {setupLogs} from "./util/setupLogs";
import {Context} from "../graphql/Context";
import {resolvers} from "./resolver/resolvers";
import {getFriendFeed} from "./bereal-api/api";
import {pingDatabase} from "./database/health/pingDatabase";
import {writeFriendsResponse} from "./database/write/writeFriendsResponse";

dotenv.config();
setupLogs();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 16000;

/**
 * GRAPHQL
 */
const typeDefs = readFileSync('./src/graphql/schema.graphql', { encoding: 'utf-8' });

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
 * MONGO DB CONNECTION CHECK
 */
await pingDatabase();

/**
 * AUTO SCRAPE
 */
const ONE_HOUR_MS = 3_600_000;

const scrape = async () => {
    // Scrape scrape scrape
    const data = await getFriendFeed();
    await writeFriendsResponse(data);

    // Scrape in an hour or so
    const oneHourOrAboutThat = ONE_HOUR_MS + (((Math.random()*2) - 1) * ONE_HOUR_MS)
    const nextScrapeDate = new Date(Date.now() + oneHourOrAboutThat);

    console.log(`Next scrape scheduled for [${nextScrapeDate.toLocaleDateString()} ${nextScrapeDate.toLocaleTimeString()}]`);
    setTimeout(scrape, oneHourOrAboutThat);
}

// Start first scrape immediately
setTimeout(scrape, 1);

/**
 * REST API
 */
/**
app.get(Endpoints.POSTS, async (_, res) => {
    const data = await getFriendFeed();

    await writeFriendsResponse(data);

    res.send(data);
});

app.get(Endpoints.MEMORIES, async (_, res) => {
    const data = await getMemories();

    res.send(data);
});

app.get(Endpoints.DEBUG, async (_, res) => {
    res.send(Session.getSession().getRefreshToken());
});
*/
// Startup
await new Promise<void>((resolve) => httpServer.listen(port, () => resolve()));
console.log(`🚀 Active on port ${port}!`);
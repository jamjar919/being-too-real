import {MongoClient, ServerApiVersion} from "mongodb";
import * as dotenv from "dotenv";
import {MongoPost} from "./type/MongoPost";
import {MongoUser} from "./type/MongoUser";

dotenv.config();

const mongoUri: string = process.env.DB_CONNECTION_STRING ?? '';
const mongoClient = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const mongoDb = mongoClient.db("being-too-real");
const userCollection = mongoDb.collection<MongoUser>("user");
const postCollection = mongoDb.collection<MongoPost>("post");

export { mongoClient, mongoDb, userCollection, postCollection }
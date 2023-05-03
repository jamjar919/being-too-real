import {mongoClient} from "../mongoClient";

/**
 * Simple ping check to check the DB works ok, throws an error if it doesn't
 */
const pingDatabase = () => {
    console.log("Connecting to database...")

    return mongoClient
        .connect()
        .then(() => mongoClient.db("admin").command({ ping: 1 })) // Ping
        .then(() => console.log("📡 Connected to MongoDB"))
}

export { pingDatabase }
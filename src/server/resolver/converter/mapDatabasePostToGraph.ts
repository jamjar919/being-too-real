import {MongoPost} from "../../database/type/MongoPost";
import {Post} from "../../../graphql/generated/Resolver";

const mapDatabasePostToGraph = (mongoPost: MongoPost): Post => {
    return {
        id: mongoPost._id.toString(),
        userId: mongoPost.user,
        caption: mongoPost.caption,
        creationDate: mongoPost.creationDate,
        location: mongoPost.location,
        primary: mongoPost.primary,
        secondary: mongoPost.secondary,
        takenAt: mongoPost.takenAt,
        updatedAt: mongoPost.updatedAt
    };
};

export { mapDatabasePostToGraph }
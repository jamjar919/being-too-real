import {MongoUser} from "../../database/type/MongoUser";
import {User} from "../../../graphql/generated/Resolver";

const mapDatabaseUserToGraph = (mongoUser: MongoUser): User => {
    return {
        id: mongoUser._id.toString(),
        username: mongoUser.username,
        profilePicture: mongoUser.profilePicture
    };
}

export { mapDatabaseUserToGraph }
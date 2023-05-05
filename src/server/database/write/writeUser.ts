import {userCollection} from "../mongoClient";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {MongoUser} from "../type/MongoUser";
import {convertUser} from "../converter/convertUser";

const writeUser = async (user: BeRealUser): Promise<string | null> => {
    const document: MongoUser = convertUser(user);

    const maybeUser = await userCollection.findOne({ _id: document._id })

    // If we already wrote the user don't write it again
    if (maybeUser) {
        return null;
    }

    await userCollection.insertOne(document);

    return user.username;
}

export { writeUser }
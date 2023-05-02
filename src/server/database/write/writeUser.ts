import {userCollection} from "../mongoClient";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {MongoUser} from "../type/MongoUser";
import {convertUser} from "../converter/convertUser";

const writeUser = (user: BeRealUser): Promise<void> => {
    const document: MongoUser = convertUser(user);

    return userCollection.findOne({ _id: document._id })
        .then((result: MongoUser | null) => {

            // If we already wrote the user don't write it again
            if (result) {
                console.log(`Skipping writing user ${result._id} as it was already found`)
                return;
            }

            return userCollection.insertOne(document);
        })
        .then(() => {}) // Return void
}

export { writeUser }
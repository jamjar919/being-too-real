import {BeRealPost} from "../../bereal-api/type/BeRealFriendFeedResponse";
import {postCollection} from "../mongoClient";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {MongoPost} from "../type/MongoPost";
import {convertPost} from "../converter/convertPost";

const writePost = (
    user: BeRealUser,
    post: BeRealPost
): Promise<void> => {
    const document: MongoPost = convertPost(user, post);

    return postCollection.findOne({ _id: document._id })
        .then((result: MongoPost | null) => {

            // If we already wrote the post don't write it again
            if (result) {
                console.log(`Skipping writing post ${result._id} as it was already found`)
                return;
            }

            return postCollection.insertOne(document);
        })
        .then(() => {}) // Return void
}

export { writePost }
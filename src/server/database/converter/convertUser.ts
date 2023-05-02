import {MongoUser} from "../type/MongoUser";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {ObjectId} from "mongodb";
import {convertImage} from "./convertImage";

const convertUser = (user: BeRealUser): MongoUser => ({
    _id: user.id as ObjectId,
    username: user.username,
    profilePicture: user.profilePicture ? convertImage(user.profilePicture) : null
})

export { convertUser }
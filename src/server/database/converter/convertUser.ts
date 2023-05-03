import {MongoUser} from "../type/MongoUser";
import {BeRealUser} from "../../bereal-api/type/BeRealCommon";
import {convertImage} from "./convertImage";

const convertUser = (user: BeRealUser): MongoUser => ({
    _id: user.id,
    username: user.username,
    profilePicture: user.profilePicture ? convertImage(user.profilePicture) : null
})

export { convertUser }
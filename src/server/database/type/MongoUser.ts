import {MongoImage} from "./MongoImage";

type MongoUser = {
    _id: string,
    username: string;
    profilePicture: MongoImage | null;
}

export { MongoUser }
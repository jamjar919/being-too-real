import {MongoImage} from "./MongoImage";
import {WithId} from "mongodb";

type MongoUser = WithId<{
    username: string;
    profilePicture: MongoImage | null;
}>

export { MongoUser }
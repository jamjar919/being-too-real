import {MongoImage} from "./MongoImage";
import {MongoLocation} from "./MongoLocation";
import {WithId} from "mongodb";

type MongoPost = WithId<{
    user: string,
    primary: MongoImage,
    secondary: MongoImage,
    location: MongoLocation | null,
    retakeCounter: number;
    lateInSeconds: number;
    isLate: boolean;
    isMain: boolean;
    takenAt: string;
    creationDate: string;
    updatedAt: string;
    caption: string | null,
}>;

export { MongoPost }
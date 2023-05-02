import {MongoImage} from "../type/MongoImage";
import {BeRealImage} from "../../bereal-api/type/BeRealCommon";

const convertImage = (image: BeRealImage): MongoImage => ({
    url: image.url,
    width: image.width,
    height: image.height
})

export { convertImage }
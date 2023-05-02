import {BeRealLocation} from "../../bereal-api/type/BeRealCommon";
import {MongoLocation} from "../type/MongoLocation";

const convertLocation = (location: BeRealLocation): MongoLocation => ({
    longitude: location.longitude,
    latitude: location.latitude
})

export { convertLocation }
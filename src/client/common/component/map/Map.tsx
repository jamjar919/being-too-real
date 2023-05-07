import React from "react";
import GoogleMapReact from "google-map-react";
import {MapMarker} from "../map-marker/MapMarker";
import {useMapContext} from "../../context/MapContext";

const Map: React.FC = () => {
    const { selectedPosts, mapCenter } = useMapContext();

    const markers = selectedPosts
        .map(post => (post.location && <MapMarker
            lat={post.location.latitude}
            lng={post.location.longitude}
            key={post.id}
            post={post}
        />))

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={11}
        >
            {markers}
        </GoogleMapReact>
    )
}

export { Map }
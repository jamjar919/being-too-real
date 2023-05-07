import React from "react";
import GoogleMapReact from "google-map-react";
import {MapMarker} from "../map-marker/MapMarker";
import {useMapContext} from "../../context/MapContext";

const Map: React.FC = () => {
    const { selectedPosts } = useMapContext();

    const defaultProps = {
        center: {
            lat: 51.752054,
            lng: -1.257775
        },
        zoom: 11
    };

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
            defaultZoom={defaultProps.zoom}
        >
            {markers}
        </GoogleMapReact>
    )
}

export { Map }
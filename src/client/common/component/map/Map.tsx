import React from "react";
import GoogleMapReact from "google-map-react";
import {MapMarker} from "../map-marker/MapMarker";
import {useMapContext} from "../../context/MapContext";
import {useSelectContext} from "../../context/SelectContext";
import {Post} from "../../../../graphql/generated/Resolver";

const Map: React.FC = () => {
    const { mapCenter } = useMapContext();
    const { posts, selectedUsers, selectedPosts } = useSelectContext();

    let postsToShowOnMap: Post[] = posts;
    if (selectedUsers.length > 0 || selectedPosts.length > 0) {
        postsToShowOnMap = [
            ...selectedPosts,
            ...selectedUsers.flatMap(user => user.posts)
        ]
        .filter((post: Post | null | undefined) => !!post) as Post[]
    }

    const markers = postsToShowOnMap
        .map(post => (post.location && <MapMarker
            lat={post.location.latitude}
            lng={post.location.longitude}
            key={post.id}
            post={post}
        />))

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={mapCenter}
            defaultZoom={11}
        >
            {markers}
        </GoogleMapReact>
    )
}

export { Map }
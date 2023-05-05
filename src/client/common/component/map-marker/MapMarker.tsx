import React from "react";
import {Post} from "../../../../graphql/generated/Resolver";

import styles from './MapMarker.module.scss'

type MapMarkerProps = {
    post: Post
    lat: number
    lng: number
}

const MapMarker: React.FC<MapMarkerProps> = (props) => {
    const { post } = props;

    return (
        <div className={styles.mapMarker}>
            <div
                className={styles.icon}
                style={{ backgroundImage: `url(${post.secondary.url})` }}
            />
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    {post.user?.username}
                </div>
            </div>
        </div>
    )
}

export { MapMarker }
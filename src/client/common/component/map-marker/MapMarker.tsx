import React from "react";

import styles from './MapMarker.module.scss'

type MapMarkerProps = {
    text: string
    lat: number
    lng: number
}

const MapMarker: React.FC<MapMarkerProps> = (props) => {
    const { text } = props;

    return (
        <div className={styles.mapMarker}>
            {text}
        </div>
    )
}

export { MapMarker }
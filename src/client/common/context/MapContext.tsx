import React, {ReactNode, useState} from "react";
import {Coords} from "google-map-react";

type MapContext = {
    mapCenter: Coords,
    setMapCenter: (coords: Coords) => void
};

const Context = React.createContext<MapContext>({} as any);

type MapContextProviderProps = {
    children: ReactNode
}

const MapContextProvider: React.FC<MapContextProviderProps> = (props) => {
    const { children } = props;

    const [mapCenter, setMapCenter] = useState({
        lat: 51.752054,
        lng: -1.257775
    })

    const context = {
        mapCenter,
        setMapCenter
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useMapContext = () => React.useContext(Context);

export { MapContextProvider, useMapContext };

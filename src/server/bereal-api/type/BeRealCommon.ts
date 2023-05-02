export interface BeRealImage {
    url: string;
    width: number;
    height: number;
}

export interface BeRealUser {
    id: string;
    username: string;
    profilePicture: BeRealImage | null;
}

export interface BeRealLocation {
    longitude: number;
    latitude: number;
}
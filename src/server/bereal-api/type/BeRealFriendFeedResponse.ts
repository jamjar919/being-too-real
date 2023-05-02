import {BeRealImage, BeRealLocation, BeRealUser} from "./BeRealCommon";

export interface BeRealFriendFeedResponse {
    userPosts: BeRealPostCollection;
    friendsPosts?: BeRealPostCollection[];
    remainingPosts: number;
    maxPostsPerMoment: number;
}
export interface BeRealPostCollection {
    user: BeRealUser;
    region: string;
    momentId: string;
    posts?: BeRealPost[] | null;
}
export interface BeRealPost {
    id: string;
    visibility?: (string)[] | null;
    primary: BeRealImage;
    secondary: BeRealImage;
    location?: BeRealLocation | null;
    retakeCounter: number;
    lateInSeconds: number;
    isLate: boolean;
    isMain: boolean;
    realMojis?: (RealMojisEntity)[] | null;
    comments?: (CommentsEntity | null)[] | null;
    screenshots?: (null)[] | null;
    takenAt: string;
    creationDate: string;
    updatedAt: string;
    caption?: string | null;
    music?: Music | null;
}
export interface RealMojisEntity {
    id: string;
    user: BeRealUser;
    media: BeRealImage;
    type: string;
    emoji: string;
    isInstant: boolean;
    postedAt: string;
}
export interface CommentsEntity {
    id: string;
    user: BeRealUser;
    content: string;
    postedAt: string;
}
export interface Music {
    isrc: string;
    openUrl: string;
    artist: string;
    track: string;
    preview: string;
    visibility: string;
    provider: string;
    providerId: string;
    artwork: string;
    audioType: string;
}

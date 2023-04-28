export interface BeRealFriendFeedResponse {
    id: string;
    notificationID: string;
    ownerID: string;
    userName: string;
    user: User;
    mediaType: string;
    region: string;
    bucket: string;
    photoURL: string;
    imageWidth: number;
    imageHeight: number;
    secondaryPhotoURL: string;
    secondaryImageHeight: number;
    secondaryImageWidth: number;
    members?: (string)[] | null;
    lateInSeconds: number;
    isPublic: boolean;
    location?: Location | null;
    retakeCounter: number;
    creationDate: DateOrCreationDateOrTakenAt;
    updatedAt: number;
    takenAt: DateOrCreationDateOrTakenAt;
    comment?: (CommentEntity | null)[] | null;
    realMojis?: (RealMojisEntity | null)[] | null;
    screenshots?: (null)[] | null;
    screenshotsV2?: (null)[] | null;
    caption?: string | null;
    visibility?: (string)[] | null;
}
export interface User {
    id: string;
    username: string;
    profilePicture?: ProfilePicture | null;
}
export interface ProfilePicture {
    height: number;
    width: number;
    url: string;
}
export interface Location {
    _latitude: number;
    _longitude: number;
}
export interface DateOrCreationDateOrTakenAt {
    _seconds: number;
    _nanoseconds: number;
}
export interface CommentEntity {
    id: string;
    uid: string;
    userName: string;
    user: User;
    text: string;
    creationDate: DateOrCreationDateOrTakenAt;
}
export interface RealMojisEntity {
    id: string;
    uid: string;
    userName: string;
    user: User;
    emoji: string;
    type: string;
    uri: string;
    date: DateOrCreationDateOrTakenAt;
}

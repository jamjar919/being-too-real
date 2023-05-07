import React, {ReactNode, useState} from "react";
import {Post, User} from "../../../graphql/generated/Resolver";

type MapContext = {
    users: User[],
    selectedUser: User | null,
    selectedPosts: Post[],
    selectUser: (userId: string | null) => void
};

const Context = React.createContext<MapContext>({} as any);

type MapContextProviderProps = {
    posts: Post[],
    users: User[],
    children: ReactNode
}

const MapContextProvider: React.FC<MapContextProviderProps> = (props) => {
    const { posts, users, children } = props;

    const [selectedUserId, selectUser] = useState<string | null>(null);

    const selectedUser = users.find((user: User) => user.id === selectedUserId) ?? null;
    const selectedPosts: Post[] = selectedUser
        ? selectedUser.posts as Post[]
        : posts;

    const context = {
        users,
        selectedUser,
        selectedPosts,
        selectUser
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useMapContext = () => React.useContext(Context);

export { MapContextProvider, useMapContext };

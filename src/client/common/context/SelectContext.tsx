import React, {ReactNode, useState} from "react";
import {Post, User} from "../../../graphql/generated/Resolver";

type SelectContext = {
    users: User[]
    selectedUsers: User[],
    selectUser: (userId: string) => void,
    deselectUser: (userId: string) => void,
    isUserSelected: (userId: string) => boolean,

    posts: Post[]
    selectedPosts: Post[],
    selectPost: (postId: string) => void,
    deselectPost: (postId: string) => void,
};

const Context = React.createContext<SelectContext>({} as any);

type SelectContextProps = {
    users: User[],
    posts: Post[]
    children: ReactNode
}

const SelectContextProvider: React.FC<SelectContextProps> = (props) => {
    const { posts, users, children } = props;

    // User management
    const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());

    const selectUser = (userId: string): void => {
        setSelectedUserIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.add(userId);
            return newSet;
        });
    }

    const deselectUser = (userId: string): void => {
        setSelectedUserIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.delete(userId);
            return newSet;
        });
    }

    const isUserSelected = (userId: string): boolean => selectedUserIds.has(userId);

    // Post management
    const [selectedPostIds, setSelectedPostIds] = useState<Set<string>>(new Set());

    const selectPost = (postId: string): void => {
        setSelectedPostIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.add(postId);
            return newSet;
        });
    }

    const deselectPost = (postId: string): void => {
        setSelectedPostIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.add(postId);
            return newSet;
        });
    }

    // Calculate what's selected based on the ids
    const selectedPosts = posts.filter((post: Post) => selectedPostIds.has(post.id));
    const selectedUsers = users.filter((user: User) => selectedUserIds.has(user.id));

    const context = {
        selectUser,
        deselectUser,
        selectPost,
        deselectPost,
        isUserSelected,
        posts,
        users,
        selectedPosts,
        selectedUsers
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useSelectContext = () => React.useContext(Context);

export { SelectContextProvider, useSelectContext };

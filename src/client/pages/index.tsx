import React from "react";
import { gql } from '@apollo/client';
import client from "../common/ApolloClient";
import {Post, Query, User} from "../../graphql/generated/Resolver";
import {GetStaticPropsResult} from "next";
import {Map} from "../common/component/map/Map";
import {MapContextProvider} from "../common/context/MapContext";
import {SelectUserModal} from "../common/component/select-user-modal/SelectUserModal";
import {SelectedUserModal} from "../common/component/selected-user-modal/SelectedUserModal";

const GET_POST_LOCATIONS = gql`
    query Posts {
        posts {
            id
            location {
                latitude
                longitude
            }
            user {
                username
            }
            primary {
                url
            }
            secondary {
                url
            }
        }
        users {
            id,
            username,
            posts {
                id,
                location {
                    latitude
                    longitude
                }
                user {
                    username
                }
                takenAt,
                caption,
                primary {
                    url
                }
                secondary {
                    url
                }
            }
        }
    }
`;

type IndexProps = {
    posts: Post[],
    users: User[]
}

const Index: React.FC<IndexProps> = (props: IndexProps) => {
    const { posts, users } = props;

    return (
        <MapContextProvider posts={posts} users={users} >
            <div style={{ height: '100vh', width: '100%', position: "relative" }}>
                <Map />
            </div>
            <SelectUserModal />
            <SelectedUserModal />
        </MapContextProvider>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
    const { data } = await client.query<Query>({
        query: GET_POST_LOCATIONS
    });

    return {
        props: {
            posts: data.posts.filter(post => !!post) as Post[],
            users: data.users as User[]
        },
    };
}

export default Index;
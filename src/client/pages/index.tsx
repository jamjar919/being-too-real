import React from "react";
import { gql } from '@apollo/client';
import client from "../common/ApolloClient";
import {Post, Query} from "../../graphql/generated/Resolver";
import {GetStaticPropsResult} from "next";
import GoogleMapReact from 'google-map-react';
import {MapMarker} from "../common/component/map-marker/MapMarker";

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
        }
    }
`;

type IndexProps = {
    posts: Post[]
}

const Index: React.FC<IndexProps> = (props: IndexProps) => {
    const { posts } = props;

    const defaultProps = {
        center: {
            lat: 51.752054,
            lng: -1.257775
        },
        zoom: 11
    };

    const markers = posts.map(post => (post.location && <MapMarker
        lat={post.location.latitude}
        lng={post.location.longitude}
        text={post.user.username}
        key={post.user.username}
    />))

    return (
        <div style={{ height: '100vh', width: '100%', position: "relative" }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {markers}
            </GoogleMapReact>
        </div>
    )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<IndexProps>> {
    const { data } = await client.query<Query>({
        query: GET_POST_LOCATIONS
    });

    return {
        props: {
            posts: data.posts.filter(post => !!post) as Post[]
        },
    };
}

export default Index;
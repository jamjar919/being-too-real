import React, {useState} from "react";
import {Post} from "../../../../graphql/generated/Resolver";

import styles from './SinglePost.module.scss';

type PostProps = {
    post: Post;
}

const SinglePost: React.FC<PostProps> = (props) => {
    const { post } = props;

    const [images, setImages] = useState({
        primary: post.primary,
        secondary: post.secondary
    });

    console.log(images.primary.url, images.secondary.url);

    return (
        <>
            <div className={styles.postImagesContainer}>
                <img
                    className={styles.primary}
                    src={images.primary.url}
                    alt={`${post.user?.username}'s BeReal taken on ${post.takenAt}`}
                />
                <img
                    className={styles.secondary}
                    role={"button"}
                    onClick={() => {
                        setImages({
                            primary: images.secondary,
                            secondary: images.primary
                        })
                    }}
                    src={images.secondary.url}
                    alt={`${post.user?.username}'s secondary BeReal taken on ${post.takenAt}`}
                />
            </div>
            <i>{post.takenAt}</i>
            <i>{post.caption}</i>
        </>
    )
}

export { SinglePost }
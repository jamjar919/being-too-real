import React from "react";
import {Maybe, Post, User} from "../../../../graphql/generated/Resolver";
import classNames from "classnames";

import styles from './SelectUserButton.module.scss';

type SelectUserButtonProps = {
    user: User,
    onClick: () => void,
    isSelected: boolean
}

const SelectUserButton: React.FC<SelectUserButtonProps> = (props) => {
    const { user, onClick, isSelected } = props;

    const postsWithLocationData = user.posts!.filter((post: Maybe<Post>) => !!post?.location);

    const showPin = postsWithLocationData.length > 0;
    const pinOpacity = Math.max(postsWithLocationData.length/user.posts!.length, 0.33);
    const pin = showPin
        ? <span title={`${postsWithLocationData.length}`} style={{ opacity: `${pinOpacity}` }}>📍</span>
        : '';

    const className = classNames({
        [styles.selected]: isSelected
    })

    return (
        <li className={className}>
            <button onClick={onClick}>{user.username}</button>{' '}
            {user.posts!.length}{' '}
            {pin}
        </li>
    )
}

export { SelectUserButton }
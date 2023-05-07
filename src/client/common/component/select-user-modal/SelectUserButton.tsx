import React from "react";
import {User} from "../../../../graphql/generated/Resolver";

type SelectUserButtonProps = {
    user: User,
    onClick: () => void
}

const SelectUserButton: React.FC<SelectUserButtonProps> = (props) => {
    const { user, onClick } = props;

    return (
        <li>
            <button onClick={onClick}>{user.username}</button>
        </li>
    )
}

export { SelectUserButton }
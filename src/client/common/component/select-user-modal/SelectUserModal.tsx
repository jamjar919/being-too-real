import React, {useLayoutEffect, useState} from "react";
import {Modal} from "../modal/Modal";
import {useMapContext} from "../../context/MapContext";
import {SelectUserButton} from "./SelectUserButton";
import {User} from "../../../../graphql/generated/Resolver";

const SelectUserModal: React.FC = () => {
    const { users, selectUser } = useMapContext();

    const [height, setHeight] = useState(500);
    useLayoutEffect(() => {
        setHeight(window.innerHeight - 50)
    }, [])

    return (
        <Modal
            title="Users"
            width={300}
            height={height}
            initialPosition={[10, 10]}
        >
            <ul>
                {users.map((user: User) => (
                    <SelectUserButton
                        onClick={() => selectUser(user.id)}
                        user={user}
                        key={user.id}
                    />
                ))}
            </ul>
        </Modal>
    )
}

export { SelectUserModal }
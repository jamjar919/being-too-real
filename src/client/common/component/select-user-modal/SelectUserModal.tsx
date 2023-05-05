import React, {useLayoutEffect, useState} from "react";
import {Modal} from "../modal/Modal";
import {useMapContext} from "../../context/MapContext";

const SelectUserModal: React.FC = () => {
    const { users } = useMapContext();

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
                {users.map((user) => (<li>{user.username}</li>))}
            </ul>
        </Modal>
    )
}

export { SelectUserModal }
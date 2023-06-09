import React, {ChangeEvent, useLayoutEffect, useState} from "react";
import {Modal} from "../modal/Modal";
import {SelectUserButton} from "./SelectUserButton";
import {User} from "../../../../graphql/generated/Resolver";
import {useSelectContext} from "../../context/SelectContext";

type SelectUserModalProps = {
    users: User[]
}

const SelectUserModal: React.FC<SelectUserModalProps> = (props) => {
    const { users } = props;

    const { selectUser, deselectUser, isUserSelected } = useSelectContext();

    const [height, setHeight] = useState(500);
    useLayoutEffect(() => {
        setHeight(window.innerHeight - 50)
    }, [])

    const [searchText, setSearchText] = useState<string | undefined>("");

    const filteredUsers = users.filter((user) =>  searchText ? user.username.includes(searchText) : true);

    return (
        <Modal
            title="Users"
            width={300}
            height={height}
            initialPosition={[10, 10]}
        >
            <input
                type="text"
                placeholder={"Search"}
                value={searchText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
            />
            <ul>
                {filteredUsers.map((user: User) => {
                    const isSelected = isUserSelected(user.id);

                    const handleClick = () => {
                        if (isSelected) {
                            deselectUser(user.id)
                            return
                        }

                        selectUser(user.id);
                    }

                    return (
                        <SelectUserButton
                            onClick={handleClick}
                            user={user}
                            isSelected={isSelected}
                            key={user.id}
                        />
                    )
                })}
            </ul>
        </Modal>
    )
}

export { SelectUserModal }
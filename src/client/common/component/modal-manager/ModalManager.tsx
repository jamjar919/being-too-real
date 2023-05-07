import React from "react";
import {SelectUserModal} from "../select-user-modal/SelectUserModal";
import {SelectedUserModal} from "../selected-user-modal/SelectedUserModal";
import {useSelectContext} from "../../context/SelectContext";
import {User} from "../../../../graphql/generated/Resolver";

const ModalManager: React.FC = () => {
    const { users, selectedUsers } = useSelectContext();

    const selectedUserModals = selectedUsers.map((user: User) => <SelectedUserModal user={user} key={user.id} />)

    return (
        <>
            <SelectUserModal users={users} />
            {selectedUserModals}
        </>
    )
}

export { ModalManager }
import React from "react";
import {Modal} from "../modal/Modal";
import {SinglePost} from "../post/SinglePost";
import {User} from "../../../../graphql/generated/Resolver";
import {useSelectContext} from "../../context/SelectContext";

type SelectedUserModalProps = {
    user: User;
}

const SelectedUserModal: React.FC<SelectedUserModalProps> = (props) => {
    const { user } = props

    const { deselectUser } = useSelectContext();

    return (
        <Modal
            title={user.username}
            width={300}
            height={500}
            initialPosition={[320, 10]}
            closable
            onClose={() => deselectUser(user.id)}
        >
            <div style={{ height: "100%", overflow: "scroll" }}>
                {user.posts!.map(post => {
                    if (!post) {
                        return null;
                    }

                    return (<SinglePost post={post} key={post.id} />)
                })}
            </div>
        </Modal>
    )
}

export { SelectedUserModal }
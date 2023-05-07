import React from "react";
import {Modal} from "../modal/Modal";
import {useMapContext} from "../../context/MapContext";
import {SinglePost} from "../post/SinglePost";

const SelectedUserModal: React.FC = () => {
    const { selectUser, selectedUser } = useMapContext();

    if(!selectedUser) {
        return null;
    }

    return (
        <Modal
            title={selectedUser.username}
            width={300}
            height={500}
            initialPosition={[320, 10]}
            closable
            onClose={() => selectUser(null)}
        >
            <div style={{ height: "100%", overflow: "scroll" }}>
                {selectedUser.posts!.map(post => {
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
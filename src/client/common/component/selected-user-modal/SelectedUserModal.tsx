import React from "react";
import {Modal} from "../modal/Modal";
import {useMapContext} from "../../context/MapContext";

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

                    return (
                        <div key={post.id}>
                            <img
                                src={post.primary.url}
                                alt={`${selectedUser.username}'s BeReal taken on ${post.takenAt}`}
                                style={{ maxWidth: '100%' }}
                            />
                            <i>{post.takenAt} - {post.caption}</i>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export { SelectedUserModal }
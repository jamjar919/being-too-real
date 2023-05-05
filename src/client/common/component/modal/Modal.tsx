import React, {useEffect, useState} from "react";

import styles from './Modal.module.scss';

type ModalProps = {
    children?: React.ReactNode,
    title?: string;
    initialPosition?: [number, number],
    width: number;
    height: number;
    order?: number;
    reverse?: boolean
}

const Modal: React.FC<ModalProps> = (props) => {
    const {
        children,
        title,
        initialPosition,
        width,
        height,
        order
    } = props;

    const [visible, setVisible] = useState(true);
    const [expanded, setExpanded] = useState(true);
    const [position, setPosition] = useState<[number, number]>(initialPosition ? initialPosition : [0, 0]);

    const [
        x, top
    ] = position;

    const zIndex = order || 1;

    useEffect(() => {
        document.addEventListener("dragover", (event: DragEvent) => {
            event.preventDefault();
        }, false);
    }, [])

    const modalStyle: React.CSSProperties = {
        top: `${top}px`,
        left: `${x}px`,
        visibility: visible ? 'inherit' : 'hidden',
        zIndex
    }

    return (
        <div
            className={styles.modal}
            style={modalStyle}
        >
            <div className={styles.modalHeader}>
                <div
                    className={styles.modalDragIcon}
                    draggable={true}
                    onDragEnter={() => setVisible(false)}
                    onDragEnd={(e) => {
                        e.preventDefault();
                        setPosition([e.clientX, e.clientY]);
                        setVisible(true);
                    }}
                >
                    ✥
                </div>
                <i className={styles.modalTitle}>
                    {title ? title : ''}
                </i>
                <div className={styles.modalExpand}>
                    <button onClick={() => setExpanded((current) => !current)}>
                        {expanded ? '^' : 'v'}
                    </button>
                </div>
            </div>
            <div
                className={styles.modalContent}
                aria-hidden={!expanded}
                style={{
                    width: `${width}px`,
                    height: expanded ? `${height}px` : 0
                }}
            >
                {children}
            </div>
        </div>
    );
}

export { Modal, ModalProps };

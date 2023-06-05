import React, { ReactNode } from "react";
import ReactDom from "react-dom";
// import Card from "../Card/card";
import styles from "./modal.module.css";
import { CloseOutlined } from "@ant-design/icons";
import Button from "../Button/Button";

interface backdrop {
    visible?: boolean;
    onClose?: () => void
}
interface modalTemp {
    visible?: boolean;
    onClose?: () => void;
    title?: string;
    children?: ReactNode;
    footer?: boolean
}
const BackDrop: React.FC<backdrop> = ({ onClose, visible }) => {
    return (
        <div
            style={{ display: `${visible ? "" : "none"}` }}
            className={styles.backdrop}
            onClick={onClose && onClose}
        />
    );
};
export const ModalTemp: React.FC<modalTemp> = ({ children, footer, onClose, title, visible }) => {
    return (
        <div style={{ display: `${visible ? "" : "none"}` }} className={styles.modal}>
            <header className={styles.header}>
                <h2>{title || ""}</h2>
                <CloseOutlined className="modalCrossIcon" onClick={onClose && onClose} />
            </header>
            <div className={styles.content}>{children}</div>
            {footer && (
                <footer className={styles.actions}>
                    <Button type="primary" onClick={onClose && onClose}>
                        Cancle
                    </Button>
                    <Button type="primary" onClick={onClose && onClose}>
                        Okay
                    </Button>
                </footer>
            )}
        </div>
    );
};
const Modal: React.FC<modalTemp> = ({ children, footer, onClose, title, visible }) => {
    return (
        <>
            {/* creating PORTAL */}
            {ReactDom.createPortal(
                <BackDrop
                    onClose={onClose || undefined}
                    visible={visible}
                />,
                document.getElementById("backdrop-root") as HTMLElement
            )}
            {ReactDom.createPortal(
                <ModalTemp
                    title={title}
                    onClose={onClose || undefined}
                    children={children}
                    visible={visible}
                    footer={footer}
                />,
                document.getElementById("modal-root") as HTMLElement
            )}
        </>
    );
};
export default Modal;
import React, { CSSProperties, ReactNode } from "react"
import styles from "./tag.module.css"
import { CloseOutlined } from "@ant-design/icons";

interface tag {
    title?: string,
    children?: ReactNode;
    closable?: boolean;
    onClose?: (val: string) => void;
    id?: string;
    onClick?: () => void;
    style?: CSSProperties

}

const Tag: React.FC<tag> = ({ title, children, closable = false, onClose, id, onClick, style = {} }) => {
    return <section onClick={onClick} style={style} className={`  ${styles.tag}`}>
        {title || children}
        {closable && <CloseOutlined onClick={() => onClose && onClose(`${id}`)} />}
    </section>
};

export default Tag;
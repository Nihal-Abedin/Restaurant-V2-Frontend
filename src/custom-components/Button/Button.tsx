import Reac, { CSSProperties, ReactNode } from 'react';

import styles from "./button.module.css";
import Spin from '../Spin/Spin';

interface Button {
    children?: ReactNode;
    text?: ReactNode | string;
    htmlType?: 'button' | 'submit' | 'reset' | 'link';
    onClick?: () => void;
    type?: 'primary' | 'danger' | 'default';
    isLoading?: boolean;
    disable?: boolean;
    style?: CSSProperties;
}
const Button: React.FC<Button> = ({ onClick, children, disable = false, htmlType = 'button', isLoading = false, style, text, type = 'default' }) => {
    let css = styles.default;

    //   types are "primary" || "danger" || "default"
    if (type) {
        css = styles[type];
    }

    let btnTxt = text || children;
    if (isLoading) {
        btnTxt = (
            <>
                <Spin size="small" /> {text || children}
            </>
        );
    }

    // console.log(children, disable, htmlType, isLoading, style, text, type)
    return <div style={
        disable || isLoading ? { cursor: "not-allowed", width: 'fit-content', ...style } : { width: 'fit-content', ...style }
    }>
        <button
            className={`${css} ${disable || isLoading ? styles.disabled : ""} `}
            onClick={onClick}>{btnTxt}</button>
    </div>
}
export default Button;
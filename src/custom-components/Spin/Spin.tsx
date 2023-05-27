import React, { CSSProperties } from 'react';
import styles from "./spin.module.css";

interface Spin {
    style?: CSSProperties;
    size?: string
}
const Spin: React.FC<Spin> = ({ style, size }) => {
    let customStyle;
    if (size === "small") {
        customStyle = {
            width: "1.6rem",
            height: "1.6rem"
        };
    } else if (size === "large") {
        customStyle = {
            width: "3rem",
            height: "3rem"
        };
    } else {
        customStyle = {
            width: "2rem",
            height: "2rem"
        };
    }
    return <div style={{ ...customStyle, ...style }} className={styles.loading}></div>
}
export default Spin;
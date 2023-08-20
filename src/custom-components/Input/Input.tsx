import React, { CSSProperties } from "react";
import styles from "./input.module.css";
export interface onchangeInputType {
    val: string | number;
    name: string;
}
interface InputProps {
    name?: string;
    onChange?: (val: onchangeInputType) => void;
    placeholder?: string;
    disable?: boolean;
    type?: "email" | "password" | "text" | "textarea";
    required?: boolean;
    value?: string;
    style?: CSSProperties;
    defaultValue?: string;
}
const Input: React.FC<InputProps> = ({
    disable = false,
    name,
    onChange,
    placeholder,
    type = "text",
    required = true,
    value,
    style,
    defaultValue
}) => {
    // console.log(disable, placeholder, type, required)
    return (
        <div style={disable ? { cursor: "not-allowed", ...style } : style}>
            {type !== "textarea" && <input
                value={value}
                required={required}
                className={`${styles.inputcss} ${disable ? styles.disabled : ""}`}
                type={type}
                onChange={(e) =>
                    onChange && onChange({ val: e.target.value, name: e.target.name })
                }
                disabled={disable}
                defaultValue={defaultValue}
                name={name}
                placeholder={placeholder}
            />}
            {type === "textarea" && (
                <textarea
                    style={{ resize: 'none', height: '10rem', padding: '1rem' }}
                    value={value}
                    required={required}
                    className={`${styles.inputcss} ${disable ? styles.disabled : ""}`}

                    onChange={(e) =>
                        onChange && onChange({ val: e.target.value, name: e.target.name })
                    }
                    disabled={disable}
                    defaultValue={defaultValue}
                    name={name}
                    placeholder={placeholder}
                />
            )}
        </div>
    );
};

export default Input;

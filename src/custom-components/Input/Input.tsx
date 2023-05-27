import React, { CSSProperties } from 'react'
import styles from "./input.module.css"
export interface onchangeInputType {

    val: string | number;
    name: string

}
interface Input {
    name?: string;
    onChange?: (val: onchangeInputType) => void;
    placeholder?: string;
    disable?: boolean;
    type?: 'email' | 'password' | 'text';
    required?: boolean;
    style?: CSSProperties
}
const Input: React.FC<Input> = ({ disable = false, name, onChange, placeholder, type = 'text', required = true, style }) => {
    // console.log(disable, placeholder, type, required)
    return <div style={disable ? { cursor: "not-allowed", ...style } : style} >
        <input required={required} className={`${styles.inputcss} ${disable ? styles.disabled : ''}`} type={type} onChange={(e) => onChange && onChange({ val: e.target.value, name: e.target.name })} disabled={disable} name={name} placeholder={placeholder} />
    </div>
}

export default Input

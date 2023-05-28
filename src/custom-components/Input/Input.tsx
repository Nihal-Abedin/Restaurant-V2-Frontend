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
    value?: string;
    style?: CSSProperties
}
const Input: React.FC<Input> = ({ disable = false, name, onChange, placeholder, type = 'text', required = true, value, style }) => {
    // console.log(disable, placeholder, type, required)
    return <div style={disable ? { cursor: "not-allowed", ...style } : style} >
        <input value={value} required={required} className={`${styles.inputcss} ${disable ? styles.disabled : ''}`} type={type} onChange={(e) => onChange && onChange({ val: e.target.value, name: e.target.name })} disabled={disable} name={name} placeholder={placeholder} />
    </div>
}

export default Input

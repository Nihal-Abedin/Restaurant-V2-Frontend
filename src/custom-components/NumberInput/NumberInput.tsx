import React, { CSSProperties, useEffect, useState } from "react";
import styles from "./numberInput.module.css";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { onchangeInputType } from "../Input/Input";

interface Input {
    name?: string;
    onChange?: (val: onchangeInputType | { name: string, val: string | number }) => void;
    disable?: boolean;
    required?: boolean;
    value?: string;
    style?: CSSProperties;
    max?: number;
    min?: number;
    step?: number;
    defaultValue?: number
}
const NumberInput: React.FC<Input> = ({
    disable,
    name = "",
    onChange,
    required,
    style,
    max = 5,
    min = 1,
    step = 0.5,
    defaultValue = 1
}) => {
    const [value, setvalue] = useState(defaultValue);
    const [finalDate, setFinalData] = useState({
        name: name,
        val: value,
    });

    const handleIncrement = () => {
        setvalue((prev) => {
            if (prev >= max) {
                return prev;
            } else {
                return +prev + step;
            }
        });
    };
    const handleDecrement = () => {
        setvalue((prev) => (prev >= min ? +prev - step : min));
    };
    useEffect(() => {
        setFinalData((prev) => ({ ...prev, val: value }));
    }, [value]);
    useEffect(() => {
        onChange && onChange(finalDate);
    }, [finalDate]);
    return (
        <div
            style={
                disable
                    ? { cursor: "not-allowed", ...style }
                    : { ...style }
            }
        >
            <div
                className={` ${disable
                    ? `${styles.disabled} ${styles.inputContainer}`
                    : styles.inputContainer
                    } `}
                style={disable ? { cursor: "not-allowed", ...style } : style}
            >
                <MinusOutlined className={styles.actionIcon} onClick={handleDecrement} />
                <input
                    name={name}
                    step={step}
                    type="number"
                    onChange={(e) => {
                        setFinalData({
                            name: e.target.name,
                            val: +e.target.value
                        })
                        setvalue(+e.target.value)
                    }
                    }
                    // defaultValue={value}
                    value={value}
                    min={1}
                    max={5}
                />
                <PlusOutlined className={styles.actionIcon} onClick={handleIncrement} />
            </div>
        </div>
    );
};
export default NumberInput;

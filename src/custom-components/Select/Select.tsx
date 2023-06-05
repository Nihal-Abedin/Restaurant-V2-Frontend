import React, { ReactNode, useEffect, useState } from "react";

import styles from "./select.module.css";
import Tag from "../Tag/Tag";
import { CheckOutlined, DownOutlined } from "@ant-design/icons";
import Spin from "../Spin/Spin";

interface selectTypes {
    options?: {
        name?: string;
        id?: string;
        _id?: string;
    }[];
    multiple?: boolean;
    values?: string[];
    disable?: boolean;
    onSelect?: (val: string[]) => void;
    onDeselect?: (val: string[]) => void;
    isLoading?: boolean
}
type optionType = {
    name?: string;
    id?: string;
    _id?: string;
}
type valueType = string[];
const Select: React.FC<selectTypes> = ({
    disable = false,
    multiple = false,
    onDeselect,
    onSelect,
    options = [],
    values = [], isLoading = false
}) => {
    // console.log(options, "OPTIONS")
    const [selectedValues, setSelectedValues] = useState<valueType>([]);
    const [showOptions, setOptions] = useState<boolean>(false);

    const [tag, settags] = useState<object[]>();

    useEffect(() => {
        const val: any = [];

        if (values.length > 0 && options) {
            options.forEach(op => {
                values.forEach((v: any) => {
                    if (v === op.id) {
                        val.push(op)
                    }
                })
            })
        }

        settags(val)
        setSelectedValues(values)
    }, [options])
    useEffect(() => {
        const val: any = [];

        if (options) {
            options.forEach(op => {
                selectedValues.forEach(sv => {
                    if (sv === op.id || sv === op._id) {
                        val.push(op)
                    }
                })
            })

        }
        settags(val)

        onSelect && onSelect(selectedValues)
    }, [selectedValues])


    const handleOnClick = (val: string) => {
        // console.log(val)
        if (selectedValues.includes(val)) {
            return
        }

        if (!multiple) {
            setOptions(false)
            return setSelectedValues([val])
        }
        setSelectedValues(prev => [...prev, val])

        setOptions(false)

    }
    const handleDeSelect = (val: string) => {
        // console.log(val)
        const filterdLists = selectedValues.filter(sv => sv !== val);
        setSelectedValues(filterdLists)
    }
    let optionsEl: ReactNode = <p style={{ textAlign: 'center' }} className={`${styles.optionsList} `}>No Items.</p>;

    if (options.length > 0) {
        optionsEl = options?.map((op: optionType) => (
            <p key={op.id || op._id} onClick={handleOnClick.bind(this, `${op.id || op._id}`)} className={`${styles.optionsList} ${selectedValues.includes(`${op.id || op._id}`) ? styles.optionsListSelected : ''}`}>
                {op.name} {selectedValues.includes(`${op.id || op._id}`) && <CheckOutlined />}
            </p>
        ))
    }
    if (isLoading) {
        optionsEl = <p style={{ textAlign: 'center' }} className={`${styles.optionsList} `}>
            <Spin />
        </p>;
    }
    return (
        <div className={styles.selectContainer}>
            <div className={styles.selectContent} style={showOptions ? { borderRadius: "1rem 1rem 0 0" } : {}}>
                {tag && (
                    <div className={styles.tags}>
                        {tag?.map((t: any) => <Tag onClose={handleDeSelect} key={t.id} id={t.id || t._id} closable={true}>{t.name}</Tag>)}
                    </div>
                )}

                <div onClick={() => { setOptions(!showOptions) }} className={styles.inputContainer}>
                    <input placeholder="select" />
                    <DownOutlined className={styles.selectIcon} />
                </div>
                <div
                    className={`${styles.optionsContainer} ${showOptions ? styles.optionActive : ""
                        }`}
                >
                    {optionsEl}
                </div>
            </div>
        </div>
    );
};
export default Select;

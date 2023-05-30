import React, { ReactNode, useEffect, useState } from "react";

import styles from "./menu.module.css";

import { itemsArray } from "../../components/Layout/SideNav/sideNav-utils";
import { DownOutlined } from "@ant-design/icons";
interface Prop {
    items: itemsArray;
    children?: ReactNode;
    openKeys?: string[];
    onSelectItem?: (key: { key: string }) => void;
    activeItemKeys?: string[]
}
const Menu: React.FC<Prop> = ({ items, openKeys = [], onSelectItem, activeItemKeys = [] }) => {
    const [tabKey, setTabKey] = useState<string[]>(openKeys)

    const handleTabkey = ({ key }: { key: string }) => {
        if (tabKey.includes(key)) {
            const filteredKeys = tabKey.filter(k => k !== key)
            setTabKey(filteredKeys)

            return
        }
        setTabKey(prev => prev.concat(key))
    }

    const getChild = (child: itemsArray) => {
        const test: [any] = [""];
        const r = child.map(ch => {

            if (ch.child) {
                test.push(<li key={ch.key} className={styles.nestedChildContainer}>
                    <div>
                        <div style={ch.disable ? { cursor: "not-allowed" } : {}}>

                            <h1
                                onClick={() => {
                                    handleTabkey({ key: ch.key })
                                    // onSelectItem && onSelectItem({ key: ch.key })

                                }}
                                className={styles.nestedChildHeader}
                            >
                                <div className={styles.title}>
                                    {ch.icon && <ch.icon />}<span>{ch.lable}</span></div> <DownOutlined className="icon" />
                            </h1>
                        </div>
                        <ul key={ch.key}
                            className={
                                tabKey.includes(ch.key)
                                    ? `${styles.show} ${styles.menuList} `
                                    : `${styles.hide} ${styles.menuList}`
                            }
                        >
                            {ch.child && getChild(ch.child)}
                        </ul>
                    </div>
                </li>)
            } else {
                test.push(<div key={ch.key} style={ch.disable ? { cursor: "not-allowed" } : {}}>
                    <li onClick={() => onSelectItem && onSelectItem({ key: ch.key })} className={` ${styles.childList} ${ch.disable ? 'disabled' : ''} ${activeItemKeys.includes(ch.key) ? styles.active : ''}`}>
                        <p>{ch.lable}</p>
                    </li>
                </div>)
            }





        })
        return [...r, ...test]
    }

    return (
        <div className={styles.menuContainer}>
            {items.map((item) => (
                <div key={item.key} className={`${styles.menuItems} `}>
                    <div style={item.disable ? { cursor: "not-allowed" } : {}}>
                        <h1 style={item.child && tabKey.includes(item.key) ? { borderRadius: '1rem 1rem 0 0' } : {}}
                            onClick={() => {
                                handleTabkey({ key: item.key })
                                !item.child && onSelectItem && onSelectItem({ key: item.key })
                            }}
                            className={`${styles.menuHeader} ${item.disable ? 'disabled' : ''} ${activeItemKeys.includes(item.key) ? styles.active : ''}`}
                        >
                            <div className={styles.title}>{item.icon && <item.icon />}<span>{item.lable}</span></div>
                            {item.child && <DownOutlined className={`icon ${tabKey.includes(item.key) ? styles.rotate : ''}`} />}
                        </h1>
                    </div>
                    {item.child && <ul
                        className={
                            tabKey.includes(item.key)
                                ? `${styles.show} ${styles.menuList}`
                                : `${styles.hide} ${styles.menuList}`
                        }
                    >
                        {item.child && getChild(item.child)}
                    </ul>}
                </div>

            ))}
        </div>
    );
};
export default Menu;

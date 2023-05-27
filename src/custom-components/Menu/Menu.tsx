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


    const getChild = (child: itemsArray) => {
        const test: [any] = [""];
        const r = child.map(ch => {

            if (ch.child) {
                console.log(ch.lable, "HAS CHILD")
                test.push(<li key={ch.key} className={styles.nestedChildContainer}>
                    <div>
                        <h1
                            onClick={() => {
                                onSelectItem && onSelectItem({ key: ch.key })

                            }}
                            className={styles.nestedChildHeader}
                        >
                            <div className={styles.title}>
                                {ch.icon && <ch.icon />}<span>{ch.lable}</span></div> <DownOutlined className="icon" />
                        </h1>
                        <ul key={ch.key}
                            className={
                                openKeys.includes(ch.key)
                                    ? `${styles.show} ${styles.menuList} `
                                    : `${styles.hide} ${styles.menuList}`
                            }
                        >
                            {ch.child && getChild(ch.child)}
                        </ul>
                    </div>
                </li>)



            } else return <li style={ch.disable ? { cursor: "not-allowed" } : {}} key={ch.key} onClick={() => onSelectItem && onSelectItem({ key: ch.key })} className={`${styles.childList} ${activeItemKeys.includes(ch.key) ? styles.active : ''}`}>
                <p className={`${ch.disable ? 'disabled' : ''}`}>{ch.lable}</p>
            </li>


        })
        return [...r, ...test]
    }

    return (
        <div className={styles.menuContainer}>
            {items.map((item) => (
                <div key={item.key} className={`${styles.menuItems} `}>
                    <div style={item.disable ? { cursor: "not-allowed" } : {}}>
                        <h1
                            onClick={() => {
                                onSelectItem && onSelectItem({ key: item.key })

                            }}
                            className={`${styles.menuHeader} ${item.disable ? 'disabled' : ''}`}
                        >
                            <div className={styles.title}>{item.icon && <item.icon />}<span>{item.lable}</span></div>
                            <DownOutlined className="icon" />
                        </h1>
                    </div>
                    <ul key={item.key}
                        className={
                            openKeys.includes(item.key)
                                ? `${styles.show} ${styles.menuList}`
                                : `${styles.hide} ${styles.menuList}`
                        }
                    >
                        {item.child && getChild(item.child)}
                    </ul>
                </div>

            ))}
        </div>
    );
};
export default Menu;

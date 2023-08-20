import React, { ReactNode, useCallback, useEffect, useState } from "react";

import styles from "./menu.module.css";

import { itemsArray } from "../../components/Layout/SideNav/sideNav-utils";
import { DownOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
interface Prop {
  items: itemsArray;
  children?: ReactNode;
  openKeys?: string[];
  activeItemKeys?: string[];
  isChild?: boolean;
}
const Menu: React.FC<Prop> = ({
  items,
  openKeys = [],
  activeItemKeys = [],
  isChild = false,
}) => {
  console.count("items");

  const location = useLocation();
  const root = location.pathname.split("/")[1];
  const [tabKey, setTabKey] = useState<string[]>([""]);

  const handleTabkey = ({ key }: { key: string }) => {
    if (tabKey.includes(key)) {
      const filteredKeys = tabKey.filter((k) => k !== key);
      setTabKey(filteredKeys);

      return;
    }
    setTabKey((prev) => prev.concat(key));
  };

  return (
    <div className={styles.menuContainer}>
      {items.map((item) => (
        <div key={item.key} className={`${styles.menuItems} `}>
          <div style={item.disable ? { cursor: "not-allowed" } : {}}>
            {isChild ? (
              <Link to={`/${item.key}`} style={{ width: "100%" }}>
                <div
                  className={` ${styles.childList} ${
                    item.disable ? "disabled" : ""
                  } ${root === item.key ? styles.active : ""}`}
                >
                  <p>{item.lable}</p>
                </div>
              </Link>
            ) : (
              <h1
                style={
                  tabKey.includes(item.key)
                    ? { borderRadius: "1rem 1rem 0 0" }
                    : {}
                }
                onClick={() => {
                  handleTabkey({ key: item.key });
                }}
                className={`${styles.menuHeader} ${
                  item.disable ? "disabled" : ""
                }`}
              >
                <div className={styles.title}>
                  {item.icon && <item.icon />}
                  <span>{item.lable}</span>
                </div>
                {item.child && (
                  <DownOutlined
                    className={`icon ${
                      tabKey.includes(item.key) ? styles.rotate : ""
                    }`}
                  />
                )}
              </h1>
            )}
          </div>
          {item.child && item.child.length > 0 ? (
            <ul
              className={
                tabKey.includes(item.key)
                  ? `${styles.show} ${styles.menuList}`
                  : `${styles.hide} ${styles.menuList}`
              }
            >
              {item.child.map((ch) => {
                return (
                  <li
                    style={{
                      //   background: "red",
                      border: "none",
                      borderRadius: "0",
                      //   padding: "0 0 0 1rem",
                    }}
                  >
                    <Menu items={[ch]} />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
};
export default Menu;

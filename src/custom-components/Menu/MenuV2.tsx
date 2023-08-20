import React, { createContext, useCallback, useContext, useState } from "react";
import { itemsArray } from "../../components/Layout/SideNav/sideNav-utils";
import { DownOutlined } from "@ant-design/icons";
import styles from "./menu.module.css";
import { Link } from "react-router-dom";

interface MenuTemplate {
  MenuHeader: React.FC<MenuHeaderProps>;
  MenuItem: React.FC<MenuItemProps>;
}
interface MenuProps {
  children: React.ReactNode;
}
interface MenuHeaderProps {
  title: string;
  menuKey: string;
}
interface MenuItemProps {
  items: itemsArray;
  parentKey: string;
}
interface InitialValueTypes {
  activeKey: string[];
  setActiveMenuKEy: React.Dispatch<React.SetStateAction<string[]>>;
  handleActiveKey: (key:string) => void;
}
const MenuTemplateContext = createContext<InitialValueTypes>({
  activeKey: [""],
  setActiveMenuKEy: () => null,
  handleActiveKey:(key) => null ,
});
const MenuV2: React.FC<MenuProps> & MenuTemplate = ({ children }) => {
  const [activeKey, setActiveMenuKEy] = useState([""]);

  const handleActiveKey = useCallback((key: string) => {
    if (activeKey.includes(key)) {
      const filteredKeys = activeKey.filter((k) => k !== key);
      setActiveMenuKEy(filteredKeys);

      return;
    }
    setActiveMenuKEy((prev) => prev.concat(key));
  },[activeKey]);
  return (
    <MenuTemplateContext.Provider value={{ activeKey, setActiveMenuKEy, handleActiveKey }}>
      {children}
    </MenuTemplateContext.Provider>
  );
};
const MenuHeader: React.FC<MenuHeaderProps> = ({ title, menuKey }) => {
  const { handleActiveKey,activeKey } = useContext(MenuTemplateContext);
  return (
    <h1
      className={`${styles.menuHeader}`}
      onClick={() => handleActiveKey(menuKey)}
    >
      {title}{" "}
      <DownOutlined
        className={`icon ${activeKey.includes(menuKey) ? styles.rotate : ""}`}
      />
    </h1>
  );
};
const MenuItem: React.FC<MenuItemProps> = ({ items, parentKey }) => {
  const { activeKey, handleActiveKey } = useContext(MenuTemplateContext);
//   console.log(activeKey, parentKey);
  return (
    <div>
      {items?.map((item) => {
        return (
          <div
            style={{
              display: `${activeKey.includes(parentKey) ? "none" : "block"}`,
            }}
            key={item.key}
          >
            {item.child ? (
              <h4
                style={{ cursor: "pointer" }}
                className={` ${styles.childList}`}
                onClick={() => handleActiveKey(item.key)}
              >
                {item.lable}{" "}
                <DownOutlined
                  className={`icon ${
                    activeKey.includes(item.key) ? styles.rotate : ""
                  }`}
                />
              </h4>
            ) : (
              <Link to={`/${item.key}`} className={` ${styles.childList}`}>{item.lable}</Link>
            )}
            {item.child ? (
              <div
                style={{
                  display: `${
                    activeKey.includes(parentKey) ? "none" : "block"
                  }`,
                }}
                className={styles.nestedChild}
              >
                <MenuItem items={item.child} parentKey={item.key} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

MenuV2.MenuHeader = MenuHeader;
MenuV2.MenuItem = MenuItem;

export default MenuV2;

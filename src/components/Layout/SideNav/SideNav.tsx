import React, { useEffect, useState } from "react";
import styles from "./sideNav.module.css";
import { items, itemsArray } from "./sideNav-utils";
import MenuV2 from "../../../custom-components/Menu/MenuV2";
const SideNav: React.FC = () => {
    console.log("SIDENAV")
  return (
    <div className={styles.sidNavContainer}>
      {/* <Menu items={items} /> */}
      <MenuV2>
        {items.map((item) => (
          <div key={item.key} style={{marginBottom:'1rem'}}>
            <MenuV2.MenuHeader title={item.lable as string} menuKey={item.key}/>
            <MenuV2.MenuItem items={item.child as itemsArray} parentKey={item.key}/>
          </div>
        ))}
      </MenuV2>
    </div>
  );
};
export default SideNav;

import React, { ReactNode } from "react";
import SideNav from "./SideNav/SideNav";
import Header from "./Header/Header";
import styles from "./layout.module.css";
import { Outlet } from "react-router";
// type Props = {
//   children: ReactNode;
// };
const Layout: React.FC = () => {
  return (
    <div>
      <div className={styles.layoutcontainer}>
      <Header />
        <SideNav />
        <div className={styles.childrenContainer}><Outlet/></div>
      </div>
    </div>
  );
};

export default Layout;

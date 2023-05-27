import React, { ReactNode } from "react";
import SideNav from "./SideNav/SideNav";
import Header from "./Header/Header";
import styles from "./layout.module.css";
type Props = {
    children: ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
    return <div>
        <Header />
        <div className={styles.layoutcontainer}>
            <SideNav />
            <div className={styles.childrenContainer}>

                {children}
            </div>
        </div>
    </div>
}

export default Layout;
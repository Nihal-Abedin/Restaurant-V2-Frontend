import React, { useEffect, useState } from "react";
import styles from "./sideNav.module.css"
import { items } from "./sideNav-utils";
import Menu from "../../../custom-components/Menu/Menu";
import { useLocation, useNavigate } from "react-router";
const SideNav: React.FC = () => {
    const [openKeys, setOpenKeys] = useState<string[]>(["user"]);
    const [activeChild, setActiveChild] = useState<string[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const root = location.pathname.split("/")[1];
    useEffect(() => {
        setActiveChild([root || 'login']);
    }, [root]);
    const handelMenu = ({ key }: { key: string }) => {
        console.log(key, "KEY")
        setActiveChild([key]);
        if (openKeys.includes(key)) {
            const filteredKeys = openKeys.filter(k => k !== key)
            setOpenKeys(filteredKeys)

            return
        }
        setOpenKeys(prev => prev.concat(key))
        navigate(`/${key}`);
    }
    return <div className={styles.sidNavContainer}>
        <Menu items={items} openKeys={openKeys} activeItemKeys={activeChild} onSelectItem={handelMenu} />
    </div>
}
export default SideNav;
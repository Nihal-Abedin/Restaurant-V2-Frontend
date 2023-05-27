import React, { ReactNode } from 'react'

import styles from "./header.module.css"

const Header: React.FC = () => {
    return <div className={styles.headerContainer}>
        <h1>Restaurant App.</h1>
    </div>
}
export default Header;
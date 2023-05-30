import React from "react"
import styles from "./tag.module.css"

interface tag {
    title?: string
}

const Tag: React.FC<tag> = ({ title }) => {
    return <section className={styles.tag}>{title}</section>
};

export default Tag;
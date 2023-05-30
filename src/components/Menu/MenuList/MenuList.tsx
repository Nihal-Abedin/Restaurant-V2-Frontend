import React from 'react';
import styles from "./menuList.module.css"
import Tag from '../../../custom-components/Tag/Tag';

interface menuList {
    name?: string;
    reviews?: number;
    ratings?: number;
    items?: string[]
}
const MenuList: React.FC<menuList> = ({ items, name, ratings, reviews }) => {
    return <div className={styles.listContainer}>
        <h3>{name}</h3>
        <div>
            <p>Reviews: {reviews}</p>
            <p>Rating: {ratings}</p>
        </div>
        <div>
            <span>Items: </span>
            {items && items.map(i => <Tag key={i} title={i} />)}
        </div>
        {/* <p>Items : <Tag title='asssssssssssd' /></p> */}
    </div>
}
export default MenuList
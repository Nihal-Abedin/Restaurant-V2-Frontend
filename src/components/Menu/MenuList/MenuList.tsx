import React from 'react';
import styles from "./menuList.module.css"
import Tag from '../../../custom-components/Tag/Tag';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

interface menuList {
    name?: string;
    reviews?: number;
    ratings?: number;
    items?: string[];
    category?: string;
    id?: string;
}
const MenuList: React.FC<menuList> = ({ items, name, ratings, reviews, category, id }) => {
    const navigate = useNavigate()
    const handleMenuDetails = () => {
        navigate(`/menu/${id}`)
    }

    return <div className={styles.listContainer}>
        <h3>{name}</h3>
        <div>
            <p>Reviews: {reviews}</p>
            <p>Rating: {ratings}</p>
        </div>
        <div className={styles.menucategory}>
            {category}
        </div>
        <section style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span>Items: </span>
            {items && items.map((i: any) => <Tag key={i._id} title={i.name} />)}
        </section>
        <div onClick={handleMenuDetails} className={styles.listBtnDiv}>
            Details <ArrowRightOutlined />
        </div>
        {/* <p>Items : <Tag title='asssssssssssd' /></p> */}
    </div>
}
export default MenuList
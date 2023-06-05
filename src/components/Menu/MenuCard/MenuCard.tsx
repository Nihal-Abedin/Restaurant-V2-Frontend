import React from 'react'

import styles from "./menuCard.module.css";
import Card from '../../../custom-components/Card/Card';
import { CommentOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import Button from '../../../custom-components/Button/Button';
import Tag from '../../../custom-components/Tag/Tag';

interface PropTypes {
    menuName?: string
    onClick?: () => void;
    rating?: number;
    total_reviews?: number;
    category?: string;
    total_items?: number;
    res?: {
        name: string;
        id: string
    };
    menu_items?: object[];


}

const MenuCard: React.FC<PropTypes> = ({ onClick, rating, menuName, category, total_items, total_reviews, res = { name: "", id: "" } }) => {
    return <Card bookmark={category} footer={true} title={`${menuName}`} onClick={onClick}>
        <div className={`${styles.restaurantCardContainer}`}>
            <div className={styles.menucardHeader}>
                <h1>
                    {menuName}
                </h1>
                <Tag onClick={() => { console.log(res.id) }}># {res.name}</Tag>
            </div>
            <div className={styles.cardInfos}>
                <p>Rating : <span>{rating}</span> </p>
                <p>Total items : <span>{total_items}</span> </p>
                <p>Total Reviews : <span>{total_reviews}</span> </p>

            </div>

            {/* <div className={styles.btnDiv}>
                <Button text="Details" type='primary' onClick={onClick} />
            </div> */}

        </div>
    </Card>
};

export default MenuCard;
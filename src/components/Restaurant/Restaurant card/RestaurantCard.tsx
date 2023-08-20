import React from 'react'

import styles from "./restaurantCard.module.css";
import Card from '../../../custom-components/Card/Card';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Button from '../../../custom-components/Button/Button';

interface PropTypes {
    resName?: string
    onClick?: () => void;
    id?: any;
    rating?: number;
    menus?: number

}

const Restaurantcard: React.FC<PropTypes> = ({ onClick, id, rating, resName, menus }) => {
    return <Card footer={true} title={`${resName}`} onClick={onClick}>
        <div className={`${styles.restaurantCardContainer}`}>
            <h1>
                {resName}
            </h1>
            <div className={styles.cardInfos}>
                <p>Menus : <span>{menus}</span> </p>
                <p>Rating : <span>{rating?.toFixed(2)}</span> </p>

            </div>

            {/* <div className={styles.btnDiv}>
                <Button text="Details" type='primary' onClick={onClick} />
            </div> */}

        </div>
    </Card>
};

export default Restaurantcard
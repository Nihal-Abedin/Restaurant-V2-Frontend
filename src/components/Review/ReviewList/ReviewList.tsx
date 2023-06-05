import React from "react";

import styles from "./review.module.css";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import ReviewStars from "../../../custom-components/ReviewStars/ReviewStars";

interface reviewListTypes {
    userName?: string;
    review?: string;
    rating?: number;
    image?: string;
    id?: string;

    // date
}
const ReviewList: React.FC<reviewListTypes> = ({
    rating,
    review,
    userName,
    image,
    id
}) => {
    return (
        <div key={id} className={styles.listContainer}>
            <div className={styles.userHero}>
                <div className={styles.userImage}>
                    {image && <img src="" alt="" />}
                    {!image && <UserOutlined style={{ fontSize: '2rem' }} />}
                </div>
            </div>
            <div className={styles.userInfo}>
                <h3>{userName} <ReviewStars rating={rating} coverColor="#141414" /></h3>
                <div className={styles.comment}>
                    <p>{review}</p>
                </div>
            </div>
            <div className={styles.userHero}>
                <DeleteOutlined />
            </div>
        </div>
    );
};

export default ReviewList;

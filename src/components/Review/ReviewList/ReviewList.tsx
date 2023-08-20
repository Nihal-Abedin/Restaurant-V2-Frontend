import React, { Dispatch, SetStateAction } from "react";

import styles from "./review.module.css";
import {
    DeleteOutlined,
    EditFilled,
    EditOutlined,
    UserOutlined,
} from "@ant-design/icons";
import ReviewStars from "../../../custom-components/ReviewStars/ReviewStars";
import useModalStore from "../../../store/useModalState";
import ReviewModal from "../../Modal/Review Modal/ReviewModal";

interface reviewListTypes {
    userName?: string;
    review?: string;
    rating?: number;
    image?: string;
    id?: string;
    onsetReviewData?: Dispatch<
        SetStateAction<{
            review: string;
            rating: number;
            id: string;
        }>
    >;

    // date
}
const ReviewList: React.FC<reviewListTypes> = ({
    rating = 0,
    review = '',
    userName,
    image,
    id = '',
    onsetReviewData,
}) => {
    const modalname = useModalStore((state) => state.modalName);
    const handleModal = useModalStore((state) => state.openModal);
    return (
        <>

            <div key={id} className={styles.listContainer}>
                <div className={styles.userHero}>
                    <div className={styles.userImage}>
                        {image && <img src="" alt="" />}
                        {!image && <UserOutlined style={{ fontSize: "2rem" }} />}
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <h3>
                        {userName} <ReviewStars rating={rating} coverColor="#141414" />
                    </h3>
                    <div className={styles.comment}>
                        <p>{review}</p>
                    </div>
                </div>
                <div className={styles.userHero}>
                    <EditOutlined
                        onClick={() => {
                            onsetReviewData &&
                                onsetReviewData({ rating: rating, review: review, id: id });
                            handleModal({ updateReviewModal: true });
                        }}
                    />
                </div>
                <div className={styles.deleteContainer}>
                    <DeleteOutlined />
                </div>
            </div>
        </>
    );
};

export default ReviewList;

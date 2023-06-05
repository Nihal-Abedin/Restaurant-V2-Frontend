import { StarFilled } from "@ant-design/icons";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./reviewStars.module.css";
interface reviewTypes {
    rating?: number;
    coverColor?: string
}
const ReviewStars: React.FC<reviewTypes> = ({ rating = 0, coverColor }) => {
    const [ratingStars, setRatingStars] = useState<ReactNode[]>([]);
    useEffect(() => {
        for (let i = 1; i <= Math.round(rating); i++) {
            setRatingStars(prev => ([...prev, <StarFilled key={i} style={{ color: '#fff', fontSize: '2rem' }} />]))
        }

        return () => {
            setRatingStars([])
        }
    }, [rating])

    let width = 2;
    if (rating % 1 === 0) {
        width = 0;
    }
    else {
        width = (rating / width) + 1
    }
    return <div className={styles.starContainer}>
        {...ratingStars}
        <div className={styles.coverStart} style={{ width: `${width}rem`, background: `${coverColor}` }}>

        </div>

    </div>
}
export default ReviewStars;
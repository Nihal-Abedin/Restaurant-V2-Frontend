import React, { ReactNode } from 'react';
import styles from "./card.module.css"
import { ArrowRightOutlined } from '@ant-design/icons';
interface Card {
    title: string
    image?: string
    children?: ReactNode
    footer?: boolean
    onClick?: () => void

}
const Card: React.FC<Card> = ({ title, children, image, footer, onClick }) => {
    console.log(footer)
    const shortTitelName = title.split(" ");
    const convetName = shortTitelName.map((name) => name[0]).join('')

    return <div className={styles.cardContainer}>
        <div className={styles.cardHero}>
            {image && <img src='' alt='' />}
            {!image && <div className={styles.defaultHero}>
                {convetName}
            </div>
            }
        </div>
        <div className={styles.cardChildren}>
            {children}
            {footer && <div onClick={onClick} className={styles.buttonDiv}>
                Details <ArrowRightOutlined className={styles.arrowIcon} />
            </div>}
        </div>
    </div>
};

export default Card

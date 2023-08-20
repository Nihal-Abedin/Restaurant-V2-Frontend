import React, { ReactNode, useEffect, useState } from "react";

import styles from "./detailsTemplate.module.css";
import Layout from "../../components/Layout/Layout";
import CreateMenuModal from "../../components/Modal/Menu Create Modal/MenuCreateModal";
import useModalStore from "../../store/useModalState";
import { PlusOutlined, StarFilled } from "@ant-design/icons";
import Button from "../Button/Button";
import ReviewStars from "../ReviewStars/ReviewStars";
import Tag from "../Tag/Tag";
import ReviewModal from "../../components/Modal/Review Modal/ReviewModal";

interface templateTypes {
    name?: string;
    image?: string;
    onClick?: () => void;
    children?: ReactNode;
    total_count?: number;
    header_Title?: string;
    rating?: number;
    refetchAfterAction?: () => void;
    bookmark?: string;
    tag?: {
        name?: string;
        id?: string
    }
}

const DetailsTemplate: React.FC<templateTypes> = ({
    children,
    image,
    name,
    onClick,
    total_count,
    header_Title,
    refetchAfterAction,
    rating = 0,
    bookmark,
    tag
}) => {
    const modalname = useModalStore((state) => state.modalName);
    const handleModal = useModalStore((state) => state.openModal);

    return (
        <Layout>
            {modalname && modalname?.menuCreateModal && (
                <CreateMenuModal
                    visible={modalname?.menuCreateModal}
                    onClose={() => {
                        handleModal({ menuCreateModal: false });
                    }}
                    onRefetch={refetchAfterAction}
                />
            )}
            {modalname && modalname?.reviewModal && (
                <ReviewModal
                    visible={modalname?.reviewModal}
                    onClose={() => {
                        handleModal({ reviewModal: false });
                    }}
                    onRefetch={refetchAfterAction}
                />
            )}
            <div className={styles.detailContainer}>
                <div className={styles.detailsHero}>
                    {image && <img src="" alt="hero.png" />}
                    {!image && (
                        <div className={styles.defaultHero}>
                            <p>{name}</p>
                            {tag && <Tag
                                style={{
                                    position: "absolute",
                                    bottom: "1rem",
                                    left: 0,
                                    fontSize: "1.6rem",
                                    cursor: 'pointer'
                                }}
                                onClick={() => { console.log('navigate to that restaurant') }}
                            >
                                # {tag.name}
                            </Tag>}
                        </div>
                    )}
                    {bookmark && <div className={styles.bookmarkRibbon}>{bookmark}</div>}
                </div>
                <div className={styles.detialsContent}>
                    <div className={styles.detailsHeader}>
                        <h1>
                            {header_Title} ({total_count}) / ({rating.toFixed(2)}){" "}
                            <ReviewStars rating={rating} />
                        </h1>

                        <Button onClick={onClick} type="primary">
                            <PlusOutlined /> Create {header_Title}
                        </Button>
                    </div>
                </div>
                {children}
            </div>
        </Layout>
    );
};

export default DetailsTemplate;

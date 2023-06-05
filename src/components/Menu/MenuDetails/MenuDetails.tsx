import React, { useEffect, useState } from "react";
import styles from "./menuDetails.module.css";
import DetailsTemplate from "../../../custom-components/DetailsTemplate/DetailsTemplate";
import { useParams } from "react-router";
import useModalStore from "../../../store/useModalState";
import useFetch from "../../../hook/useFetch";
import Layout from "../../Layout/Layout";
import Spin from "../../../custom-components/Spin/Spin";
import ReviewList from "../../Review/ReviewList/ReviewList";
interface resData {
    name?: string;
    shortName?: string;
    reviews?: [];
    total_reviews?: number;
    image?: string;
    rating?: number;
    category?: {
        name?: string;
        id?: string
    },
    restaurant?: {
        name?: string;
        id?: string
    }
}
const MenuDetails: React.FC = () => {
    const { menuId } = useParams();
    const handleModal = useModalStore((state) => state.openModal);
    const [resData, setResData] = useState<resData>({
        name: "",
        reviews: [],
        total_reviews: 0,
        image: "",
        rating: 0,
        category: {
            name: "", id: ""
        },
        restaurant: {
            name: "", id: ""
        }
    });
    const { data, sendReq, error, isLoading } = useFetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/menu/${menuId}`,
        {
            method: "GET",
        }
    );
    console.log(data)
    const handleOpenModal = () => {
        handleModal({ reviewModal: true });
    };

    useEffect(() => {
        sendReq();
    }, []);

    useEffect(() => {
        if (!data) {
            return;
        }
        const shortTitelName = data.data.data.name?.split(" ");
        const convetName = shortTitelName?.map((name: string) => name[0]).join("");
        setResData({
            name: data.data.data.name,
            shortName: convetName,
            reviews: data.data.data.reviews,
            total_reviews: data.data.data.total_reviews,
            image: data.data.data.image || "",
            rating: data.data.data.average_ratings,
            category: {
                name: data.data.data.category.name,
                id: data.data.data.category.id
            },
            restaurant: {
                name: data.data.data.restaurant.name,
                id: data.data.data.restaurant.id
            }
        });
    }, [data]);
    if (isLoading || !data || !resData.name) {
        return (
            <Layout>
                <Spin />
            </Layout>
        );
    }
    return (
        <DetailsTemplate
            header_Title="Review"
            name={resData.name}
            onClick={handleOpenModal}
            total_count={resData.total_reviews}
            onCloseModal={() => {
                handleModal({ reviewModal: false });
            }}
            refetchAfterAction={sendReq}
            rating={resData.rating}
            bookmark={resData.category?.name}
            tag={resData.restaurant}
        >
            {resData.reviews?.length === 0 && (
                <p style={{ fontSize: "3rem", textAlign: "center" }}>
                    Add some review to this menu.
                </p>
            )}
            <div className={styles.listContainer}>

                {resData.reviews?.map((rev: any) => (
                    <ReviewList
                        key={rev._id}
                        id={rev._id}
                        rating={rev.rating}
                        review={rev.review}
                        userName={rev.user.name}
                        image={rev.user.image}
                    />
                ))}
            </div>
        </DetailsTemplate>
    );
};

export default MenuDetails
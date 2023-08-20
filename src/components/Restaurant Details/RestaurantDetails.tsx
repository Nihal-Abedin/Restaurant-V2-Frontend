import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./restaurantDetails.module.css";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router";
import Spin from "../../custom-components/Spin/Spin";
import MenuList from "../Menu/MenuList/MenuList";
import Button from "../../custom-components/Button/Button";
import { PlusOutlined } from "@ant-design/icons";
import useModalStore from "../../store/useModalState";
import CreateMenuModal from "../Modal/Menu Create Modal/MenuCreateModal";
import DetailsTemplate from "../../custom-components/DetailsTemplate/DetailsTemplate";
interface resData {
    name?: string;
    shortName?: string;
    menus?: [];
    total_menus?: number;
    image?: string;
    rating?: number
}
const RestaurantDetails: React.FC = () => {
    const { id } = useParams();
    const handleModal = useModalStore((state) => state.openModal);
    const [resData, setResData] = useState<resData>({
        name: "",
        menus: [],
        total_menus: 0,
        image: "",
        rating: 0
    });
    const { data, sendReq, error, isLoading } = useFetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurant/${id}`,
        {
            method: "GET",
        }
    );
    const handleOpenModal = () => {
        handleModal({ menuCreateModal: true });
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
            menus: data.data.data.menus,
            total_menus: data.data.data.total_menus,
            image: data.data.data.image || "",
            rating: data.data.data.average_ratings
        });
    }, [data]);
    if (isLoading || !data || !resData.name) {
        return (
            <>
                <Spin />
            </>
        );
    }
    return (
        <DetailsTemplate
            header_Title="Menu"
            name={resData.name}
            total_count={resData.menus?.length}
            onClick={handleOpenModal}
            refetchAfterAction={sendReq}
            rating={resData.rating}
        >
            {resData.menus?.length === 0 && (
                <p style={{ fontSize: "3rem", textAlign: "center" }}>
                    Add some menus to this restaurant.
                </p>
            )}
            <div className={styles.listContainer}>
                {resData.menus?.map((menu: any) => (
                    <MenuList
                        items={menu.menu_items}
                        name={menu.name}
                        key={menu.id}
                        id={menu.id}
                        category={menu.category.name}
                        reviews={menu.total_reviews}
                        ratings={menu.average_ratings}
                    />
                ))}
            </div>
        </DetailsTemplate>
    );
};
export default RestaurantDetails;

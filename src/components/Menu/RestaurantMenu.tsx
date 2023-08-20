import React, { useEffect } from "react";
import styles from "./menu.module.css";
import Layout from "../Layout/Layout";
import useFetch from "../../hook/useFetch";
import Spin from "../../custom-components/Spin/Spin";
import MenuCard from "./MenuCard/MenuCard";
import { useNavigate } from "react-router";

const RestaurantMenu: React.FC = () => {
    const navigate = useNavigate()
    const { data, sendReq, isLoading, isError, isSuccess } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/menu`, {
        method: "GET"
    })

    useEffect(() => {
        sendReq()
    }, [])
    console.log(data)

    const handleMenuClick = (id: string) => {
        navigate(`/menu/${id}`)
        // console.log(`/menu/${id}`)
    }
    if (isLoading || !data) {
        return <>
            <Spin />
        </>
    }

    return <>
        <div className={styles.menusContainer}>

            {data.data.menu.map((m: any) => <MenuCard key={m.id} rating={m.average_ratings} category={m.category.name} menuName={m.name} menu_items={m.menu_items} res={m.restaurant} total_items={m.total_items} total_reviews={m.total_reviews} onClick={handleMenuClick.bind(this, m.id)} />)}

        </div>
    </>
}
export default RestaurantMenu;
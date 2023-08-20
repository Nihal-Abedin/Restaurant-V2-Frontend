import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import useFetch from "../../hook/useFetch";
import Spin from "../../custom-components/Spin/Spin";
import Restaurantcard from "./Restaurant card/RestaurantCard";
import styles from "./restaurant.module.css";
import { useNavigate } from "react-router";

const Restaurant: React.FC = () => {
    const navigate = useNavigate();
    const { data, sendReq, error, isError, isLoading, isSuccess } = useFetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurant/`,
        {
            method: "GET",
        }
    );
    console.log(data);
    const handleRouteToResDetails = (id: string) => {
        navigate(`/restaurant/${id}`);
    };
    useEffect(() => {
        sendReq();
    }, []);
    if (isLoading && !data) {
        return (
            <>
                <Spin />
            </>
        );
    }
    // console.log(data.data?.data)
    return (
        <>
            <div className={styles.resContainer}>
                {data?.data?.data.map((res: any) => (
                    <Restaurantcard
                        key={res.id}
                        resName={res.name}
                        rating={res.average_ratings}
                        menus={res.total_menus}
                        onClick={handleRouteToResDetails.bind(this, res.id)}
                    />
                ))}
            </div>
        </>
    );
};

export default Restaurant;

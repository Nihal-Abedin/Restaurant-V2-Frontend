import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout";
import styles from "./restaurantDetails.module.css"
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router";
import Spin from "../../custom-components/Spin/Spin";
import MenuList from "../Menu/MenuList/MenuList";
import Button from "../../custom-components/Button/Button";
import { PlusOutlined } from "@ant-design/icons";
interface resData {
    name?: string;
    shortName?: string;
    menus?: [];
    total_menus?: number;
    image?: string
}
const RestaurantDetails: React.FC = () => {
    const { id } = useParams();
    const [resData, setResData] = useState<resData>({
        name: '',
        menus: [],
        total_menus: 0, image: ""
    });
    const { data, sendReq, error, isLoading } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurant/${id}`, {
        method: 'GET'
    })
    useEffect(() => {
        sendReq()
    }, [])
    // const shortTitelName = title.split(" ");
    // const convetName = shortTitelName.map((name) => name[0]).join('')
    console.log(resData)
    useEffect(() => {
        if (!data.data?.data) {
            return
        }
        const shortTitelName = data.data.data.name?.split(" ");
        const convetName = shortTitelName?.map((name: string) => name[0]).join('')
        setResData({
            name: data.data.data.name,
            shortName: convetName,
            menus: data.data.data.menus,
            total_menus: data.data.data.total_menus,
            image: data.data.data.image || ""
        })
    }, [data])
    if (isLoading || !data.data?.data || !resData.name) {
        return <Layout>
            <Spin />
        </Layout>
    }
    return <Layout>
        <div className={styles.detailContainer}>
            <div className={styles.detailsHero}>
                {resData.image && <img src="" alt="hero.png" />}
                {!resData.image && <div className={styles.defaultHero}>
                    <p>{resData.name}</p>
                </div>
                }
            </div>
            <div className={styles.menuContainer}>
                <div className={styles.menuHeader}>
                    <h1>Menus ({resData.total_menus})</h1>
                    <Button type="primary">
                        <PlusOutlined /> Create Menu
                    </Button>
                </div>
                <div className={styles.listContainer}>
                    {resData.menus?.map((menu: any) => <MenuList items={menu.menu_items} name={menu.name} key={menu.id} reviews={menu.total_reviews} ratings={menu.average_ratings} />)}

                </div>
            </div>
        </div>
    </Layout>
}
export default RestaurantDetails;
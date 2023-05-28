import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import useFetch from '../../hook/useFetch';

const Restaurant: React.FC = () => {
    const { data, sendReq, error, isError, isLoading, isSuccess } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurant/`, {
        method: "GET"
    })
    console.log(error, "ERRRRRRRRRRRRRRRROOOOOOOOOOR")
    console.log(data, isLoading, "LOADING", isSuccess, "IS SUCCESS", isError, "ERROR")

    useEffect(() => {
        sendReq()
    }, [])
    return <Layout>
        Restaurant
    </Layout>
};

export default Restaurant;
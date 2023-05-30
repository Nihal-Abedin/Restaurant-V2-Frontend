import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import instance from "../utils/axiosIntance";
import useLogin from "../store/useLoginState";

interface optionsType {
    isEnable?: boolean;
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    retry?: boolean;
    retryDelay?: number;
}
interface ReturnTypes {
    data: [] | any;
    error?: string | object | null;
    refetch?: () => void;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean

}


const useFetch = (URL: string, { isEnable = false, method = 'GET', retry = false, retryDelay = 0 }: optionsType) => {
    const [returnState, setReturnState] = useState<ReturnTypes>({
        data: [],
        error: null,
        refetch: () => {
            // 
        },
        isLoading: false,
        isSuccess: false,
        isError: false
    })
    //   const handleModalOpen = useModalStore((state) => state.handleModalOpen);
    const sendReq = useCallback(async (data?: any) => {
        setReturnState(prev => ({ ...prev, isLoading: true }))

        try {
            const { data: resData } = await instance({
                method: method,
                url: URL,
                data: data ? data : null
            })

            setReturnState(prev => ({ ...prev, data: resData, isSuccess: true, isError: false, error: null }))
        } catch (err: any) {
            console.log(err)
            // console.log(err.response.data, "SADAS")
            setReturnState(prev => ({
                ...prev,
                error: err?.message,
                isError: true,
                isSuccess: false,
            }))

        }
        setReturnState(prev => ({
            ...prev,
            isLoading: false,
        }))

    }, [])
    useEffect(() => {
        setReturnState(prev => ({ ...prev, refetch: sendReq }))

    }, [])
    return { ...returnState, sendReq }
}
export default useFetch;
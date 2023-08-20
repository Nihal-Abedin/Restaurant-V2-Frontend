import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import instance from "../utils/axiosIntance";
import useLogin from "../store/useLoginState";
import { toast } from "react-hot-toast";

interface optionsType {
    isEnable?: boolean;
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    retry?: boolean;
    retryDelay?: number;
}
interface ReturnTypes {
    data: [] | any;
    error?: string | null;
    refetch?: () => void;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    sendReq?: () => void


}


const useFetch = (URL: string, { isEnable = true, method = 'GET', retry = false, retryDelay = 0, }: optionsType) => {
    const [returnState, setReturnState] = useState<ReturnTypes>({
        data: null,
        error: null,
        refetch: () => {
            // 
        },
        isLoading: false,
        isSuccess: false,
        isError: false
    })
    // console.log(URL)
    //   const handleModalOpen = useModalStore((state) => state.handleModalOpen);
    const sendReq = async (data?: any) => {
        setReturnState(prev => ({ ...prev, isLoading: true }))

        try {
            const { data: resData } = await instance({
                method: method,
                url: URL,
                data: data ? data : null
            })
            // toast.success(resData.message)

            setReturnState(prev => ({ ...prev, data: resData, isSuccess: true, isError: false, error: null }))
        } catch (err: any) {
            console.log(err)
            toast.error(err.message)
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


    }
    useEffect(() => {
        // window.addEventListener("focus", sendReq);
        setReturnState(prev => ({ ...prev, refetch: sendReq }))

    }, [])
    // console.log(isEnable, "IS ENABLE")
    if (!isEnable) {
        return {
            ...returnState, sendReq: () => {
                // 
            }
        }
    }
    return { ...returnState, sendReq }
}
export default useFetch;
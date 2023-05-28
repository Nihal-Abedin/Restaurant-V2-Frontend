import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";


interface optionsType {
    isEnable?: boolean;
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    retry?: boolean;
    retryDelay?: number;
    payload?: any | null
}
interface ReturnTypes {
    data: [];
    error?: string | object | null;
    refetch?: () => void;
    isLoading?: boolean;

}


const useFetch = (URL: string, { isEnable = false, method = 'GET', retry = false, retryDelay = 0, payload = null }: optionsType) => {
    const [returnState, setReturnState] = useState<ReturnTypes>({
        data: [],
        error: null,
        refetch: () => {
            // 
        },
        isLoading: false
    })
    const header = {
        'Content-Type': 'application/json',
    }
    const sendReq = useCallback(async () => {
        setReturnState(prev => ({ ...prev, isLoading: true }))

        try {
            const { data: resData } = await axios({
                method: method,
                url: URL,
                data: payload ? payload : null
            })
            setReturnState(prev => ({ ...prev, data: resData }))
        } catch (err: any) {
            // console.log(err.response.data, "SADAS")
            setReturnState(prev => ({ ...prev, error: err.response.data.message }))

        }
        setReturnState(prev => ({ ...prev, isLoading: false }))

    }, [])
    useEffect(() => {
        setReturnState(prev => ({ ...prev, refetch: sendReq }))

    }, [])
    return { ...returnState, sendReq }
}
export default useFetch;
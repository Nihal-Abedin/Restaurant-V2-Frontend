import { create } from 'zustand'

type Store = {
    isLogin?: boolean;
    setLogin: (state: boolean) => void;
}

const useLogin = create<Store>()((set) => ({
    isLogin: false,
    setLogin: (state) => {
        set(() => ({ isLogin: state }))
    },
}))

export default useLogin;
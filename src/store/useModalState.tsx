import { create } from 'zustand';

interface modalStore {
    modalName: any;
    openModal: (state: object) => void
}

const useModalStore = create<modalStore>()((set => ({
    modalName: {},
    openModal: (state) => {
        set(() => ({ modalName: state }))
    }
})))

export default useModalStore;
import React, { useEffect, useState } from 'react';
import styles from './menuCreateModal.module.css'
import Modal from '../../../custom-components/Modal Temp/Modal';
import Input, { onchangeInputType } from '../../../custom-components/Input/Input';
import Select from '../../../custom-components/Select/Select';
import useFetch from '../../../hook/useFetch';
import Spin from '../../../custom-components/Spin/Spin';
import Button from '../../../custom-components/Button/Button';
import { useParams } from 'react-router';
interface modalType {
    visible?: boolean;
    onClose?: () => void;
    onRefetch?: () => void
}
type formata = {
    name: string;
    category: string;
    menu_items: string[]
}

const CreateMenuModal: React.FC<modalType> = ({ onClose, visible, onRefetch }) => {
    const { id } = useParams();

    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [categoryItems, setCategoryItems] = useState<object[]>([{}]);
    const [formData, setFormData] = useState<formata>({
        name: '',
        category: '',
        menu_items: []
    })
    const { data: cat, sendReq, isLoading } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/category`, {
        method: 'GET'
    })
    const { data: items, sendReq: getItems, isLoading: isItemsLoading } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/category/${selectedCategory[0]}/`, {
        method: 'GET',
        isEnable: selectedCategory.length > 0
    })
    const { sendReq: createMenu, isLoading: isMEnuLoading, isError, error, isSuccess } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/restaurant/${id}/menu`, {
        method: 'POST',
        isEnable: true
    })
    useEffect(() => {
        sendReq()
    }, [])

    useEffect(() => {

        getItems()
    }, [selectedCategory])

    useEffect(() => {
        items && setCategoryItems(items.data.category.items)
    }, [items])
    const handleInputChange = (val: onchangeInputType) => {
        setFormData(prev => ({ ...prev, [val.name]: val.val }))

    }

    const onHandleSelect = (val: string[]) => {
        // console.log(val)
        setSelectedCategory(val)
        setFormData(prev => ({ ...prev, category: val[0] }))
        setCategoryItems([])
        // getItems()

    }
    const handleItemSelect = (val: string[]) => {
        setFormData(prev => ({ ...prev, menu_items: val }))

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createMenu(formData)
        // onClose && onClose();
        // onRefetch && onRefetch()

    }
    useEffect(() => {

        if (isError) {
            console.log(error)
        } if (isSuccess) {
            onClose && onClose();
            onRefetch && onRefetch()
        }
    }, [isError, isSuccess])

    return <Modal visible={visible} onClose={onClose} title='Create Menu'>
        {!cat?.data ? <Spin /> : <form onSubmit={handleSubmit} className={styles.menuForm}>
            <div className={styles.menuInputs}>
                <h1>Name</h1>
                <Input name='name' placeholder='Menu name' onChange={handleInputChange} required />
            </div>
            <div className={styles.menuInputs}>
                <h1>Category</h1>
                <Select options={cat.data.catagories} onSelect={onHandleSelect} />

            </div>
            <div className={styles.menuInputs}>
                <h1>Items</h1>
                <Select options={categoryItems} isLoading={isItemsLoading} onSelect={handleItemSelect} />
                {/* <Input name='name' placeholder='Menu name' onChange={handleInputChange} required /> */}

            </div>
            <div className={styles.btnDiv}>
                <Button type='primary' htmlType='submit' isLoading={isMEnuLoading}>Create</Button>
            </div>
        </form>}
    </Modal>
}
export default CreateMenuModal;
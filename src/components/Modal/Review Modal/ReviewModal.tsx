import React, { useEffect, useState } from 'react';
import styles from "./reviewMoal.module.css";
import Modal from '../../../custom-components/Modal Temp/Modal';
import Button from '../../../custom-components/Button/Button';
import Input, { onchangeInputType } from '../../../custom-components/Input/Input';
import NumberInput from '../../../custom-components/NumberInput/NumberInput';
import useFetch from '../../../hook/useFetch';
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

const ReviewModal: React.FC<modalType> = ({ onClose, onRefetch, visible }) => {
    const { menuId } = useParams()
    const [formData, setFormData] = useState({
        review: '',
        rating: ''
    });

    const { sendReq, isError, isSuccess, isLoading } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/menu/${menuId}/review`, {
        method: 'POST'
    })
    const handleInputChange = (val: onchangeInputType | { name: string, val: string | number }) => {

        setFormData(prev => ({ ...prev, [val.name]: val.val }))

    }
    console.log(formData)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendReq(formData)

    }
    useEffect(() => {
        if (isSuccess) {
            onClose && onClose();
            onRefetch && onRefetch()
        }
    }, [isSuccess])
    return <Modal visible={visible} onClose={onClose} title='Create Menu'>
        <form onSubmit={handleSubmit} className={styles.menuForm}>

            <div className={styles.menuInputs}>
                <h1>Review</h1>
                <Input type='textarea' name='review' placeholder='Excellent' onChange={handleInputChange} required />
            </div>
            <div className={styles.menuInputs}>
                <h1>Rating</h1>
                <NumberInput name='rating' onChange={handleInputChange} />
            </div>

            <div className={styles.btnDiv}>
                <Button type='primary' htmlType='submit' isLoading={isLoading}>Submit</Button>
            </div>
        </form>
    </Modal>
}
export default ReviewModal;
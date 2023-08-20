import React, { useEffect, useState } from 'react';
import styles from "../Review Modal/reviewMoal.module.css";
import Modal from '../../../custom-components/Modal Temp/Modal';
import Button from '../../../custom-components/Button/Button';
import Input, { onchangeInputType } from '../../../custom-components/Input/Input';
import NumberInput from '../../../custom-components/NumberInput/NumberInput';
import useFetch from '../../../hook/useFetch';
import { useParams } from 'react-router';
interface modalType {
    visible?: boolean;
    onClose?: () => void;
    onRefetch?: () => void;
    review?: string;
    rating?: number;
    id?: string
}

const ReviewUpdateModal: React.FC<modalType> = ({ onClose, onRefetch, visible, review = '', rating = 0, id }) => {
    const { menuId } = useParams()
    const [btnDisable, setBtnDisable] = useState(true);
    const [formData, setFormData] = useState({
        review: review,
        rating: rating
    });

    const { sendReq, isError, isSuccess, isLoading } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/review/${id}`, {
        method: 'PATCH'
    })
    const handleInputChange = (val: onchangeInputType | { name: string, val: string | number }) => {

        setFormData(prev => ({ ...prev, [val.name]: val.val }))

    }
    console.log(formData)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(id)
        sendReq(formData)

    }
    useEffect(() => {
        if (isSuccess) {
            onClose && onClose();
            onRefetch && onRefetch()
        }
    }, [isSuccess])
    useEffect(() => {
        if (formData.review !== review || formData.rating !== rating) {
            setBtnDisable(false)
        }
        else {
            setBtnDisable(true)
        }
    }, [formData.review, formData.rating])
    return <Modal visible={visible} onClose={onClose} title='Create Menu'>
        <form onSubmit={handleSubmit} className={styles.menuForm}>

            <div className={styles.menuInputs}>
                <h1>Review</h1>
                <Input type='textarea' name='review' defaultValue={review} placeholder='Excellent' onChange={handleInputChange} required />
            </div>
            <div className={styles.menuInputs}>
                <h1>Rating</h1>
                <NumberInput name='rating' defaultValue={rating} onChange={handleInputChange} />
            </div>

            <div className={styles.btnDiv}>
                <Button type='primary' htmlType='submit' isLoading={isLoading} disable={btnDisable}>Update</Button>
            </div>
        </form>
    </Modal>
}
export default ReviewUpdateModal;
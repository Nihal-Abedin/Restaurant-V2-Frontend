import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './login.module.css'
import Input, { onchangeInputType } from '../../custom-components/Input/Input'
import Button from '../../custom-components/Button/Button'
import useFetch from '../../hook/useFetch'

const Login: React.FC = () => {
    console.log(import.meta.env.VITE_REACT_APP_BASE_URL)
    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })
    const { data, sendReq, error, isLoading, refetch } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login/`,
        {
            payload: formData,
            method: 'POST'
        })
    console.log(data, error, isLoading)
    const handleFormData = (val: onchangeInputType) => {
        setFormData(prev => ({ ...prev, [val.name]: val.val }))
    }
    // console.log(JSON.stringify(formData))
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendReq()
    }
    return <Layout>
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div>
                    <h1>Email</h1>

                    <Input name="email"
                        onChange={handleFormData}
                        placeholder="example@gmail.com" required />
                </div>
                <div>
                    <h1>Password</h1>
                    <Input type='password'
                        name="password"
                        onChange={handleFormData}
                        placeholder="sad"
                    />
                </div>
                <Button type='primary' htmlType="submit" isLoading={isLoading}>
                    Login
                </Button>
            </form>
        </div>
    </Layout>
}
export default Login
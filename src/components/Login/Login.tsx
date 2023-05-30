import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './login.module.css'
import Input, { onchangeInputType } from '../../custom-components/Input/Input'
import Button from '../../custom-components/Button/Button'
import useFetch from '../../hook/useFetch'
import Cookies from 'js-cookie';
import useLogin from '../../store/useLoginState'
import { useNavigate } from 'react-router'


const Login: React.FC = () => {
    const setLogin = useLogin((state) => state.setLogin);
    const isLogin = useLogin((state) => state.isLogin);
    const navigate = useNavigate()

    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })
    const { data, sendReq, error, isLoading, isError, isSuccess } = useFetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/user/login/`,
        {
            method: 'POST'
        })
    console.log(error, "ERRRRRRRRRRRRRRRROOOOOOOOOOR")
    console.log(data, isLoading, "LOADING", isSuccess, "IS SUCCESS", isError, "ERROR")
    const handleFormData = (val: onchangeInputType) => {
        setFormData(prev => ({ ...prev, [val.name]: val.val }))
    }
    // console.log(JSON.stringify(formData))
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendReq(formData)
    }
    useEffect(() => {
        if (isSuccess) {
            Cookies.set("JWT_TOKEN", data.token, { path: '/' })
            setLogin(true)
            navigate('/restaurant')
        }
    }, [isSuccess])

    if (isLogin) {
        return <Layout>
            <h1>You are already Logged in.</h1>
            <Button style={{ marginTop: '1rem' }} type='primary' onClick={() => {
                Cookies.remove("JWT_TOKEN")
                setLogin(false)
            }} text="Logout" />
        </Layout>
    }
    return <Layout>
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div>
                    <h1>Email</h1>

                    <Input name="email" value={formData.email}
                        onChange={handleFormData}
                        placeholder="example@gmail.com" required />
                </div>
                <div>
                    <h1>Password</h1>
                    <Input type='password' value={formData.password}
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
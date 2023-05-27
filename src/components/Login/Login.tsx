import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import styles from './login.module.css'
import Input, { onchangeInputType } from '../../custom-components/Input/Input'
import Button from '../../custom-components/Button/Button'

const Login: React.FC = () => {
    const [formData, setFormData] = useState<{ email: string, password: string }>({
        email: '',
        password: ''
    })
    const handleFormData = (val: onchangeInputType) => {
        setFormData(prev => ({ ...prev, [val.name]: val.val }))
    }
    console.log(formData)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("SUBMIT")
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
                <Button type='primary' htmlType="submit">
                    Login
                </Button>
            </form>
        </div>
    </Layout>
}
export default Login
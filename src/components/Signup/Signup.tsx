import React, { useState } from "react"
import styles from "../Login/login.module.css"
import Layout from "../Layout/Layout";
import Input, { onchangeInputType } from "../../custom-components/Input/Input";
import Button from "../../custom-components/Button/Button";
interface FormData {
    name: string;
    email: string;
    password: string;
    confirm_password: string

}
const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const handleFormData = (val: onchangeInputType) => {
        setFormData(prev => ({ ...prev, [val.name]: val.val }))
    }
    console.log(formData)
    return <>
        <div className={styles.formContainer}>
            <form className={styles.loginForm}>
                <div>
                    <h1>Name</h1>
                    <Input
                        onChange={handleFormData}
                        name="name"
                        placeholder="example" required
                    />
                </div>
                <div>
                    <h1>Email</h1>
                    <Input
                        onChange={handleFormData}
                        name="email"
                        placeholder="example@gmail.com" required
                    />
                </div>
                <div>
                    <h1>Password</h1>
                    <Input
                        onChange={handleFormData}
                        name="password"
                        placeholder="*^&%^*%"
                        type="password" required
                    />
                </div>
                <div>
                    <h1>Confirm Password</h1>
                    <Input
                        onChange={handleFormData}
                        name="confirm_password"
                        placeholder="*^&%^*%"
                        type="password" required
                    />
                </div>
                <Button type="primary" htmlType="submit" text=' Sign Up' />
            </form>
        </div>
    </>
}

export default Signup;
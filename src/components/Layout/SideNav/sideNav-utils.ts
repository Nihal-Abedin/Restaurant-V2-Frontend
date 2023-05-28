import { ReactNode } from "react"
import { DownOutlined, LockOutlined } from "@ant-design/icons";

export interface itemsObject {
    key: string,
    lable: string | ReactNode,
    icon?: typeof LockOutlined | null,
    child?: itemsArray,
    disable?: boolean,
    onClick?: () => void

}
export type itemsArray = itemsObject[];

export const items: itemsArray = [
    {
        key: "authentication",
        lable: "Authentication",
        child: [
            {
                key: "login",
                lable: "Login",

            },
            {
                key: "signup",
                lable: "Signup"
            }
        ],
        icon: LockOutlined,
        disable: false
    },
    {
        key: 'user',
        lable: 'User',
        child: [
            {
                key: 'getAllUser',
                lable: 'GET All User',


            },
            {
                key: 'getUser',
                lable: "GET User",


            },
        ], disable: true
    }

]
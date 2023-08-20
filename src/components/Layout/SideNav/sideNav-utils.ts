import { ReactNode } from "react";
import {
  UserOutlined,
  LockOutlined,
  HomeOutlined,
  ReadOutlined,
} from "@ant-design/icons";

export interface itemsObject {
  key: string;
  lable: string | ReactNode;
  icon?: typeof LockOutlined | null;
  child?: itemsArray;
  disable?: boolean;
  onClick?: () => void;
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
        lable: "Signup",
      },
    ],
    icon: LockOutlined,
    disable: false,
  },
  {
    key: "user",
    lable: "User",
    icon: UserOutlined,
    child: [
      {
        key: "all-users",
        lable: "All Users",
        child: [
          {
            key: "all-users1",
            lable: "All Users 1",
          },
          {
            key: "all-users2",
            lable: "All Users 2",
          },
        ],
      },
      {
        key: "update-user",
        lable: "Update user",
        child: [
          {
            key: "update-user1",
            lable: "Update user 1",
          },
          {
            key: "update-user2",
            lable: "Update user 2",
          },
        ],
      }
    ],
  },
  {
    key: "restaurants",
    lable: "Restaurants",
    child: [
      {
        key: "restaurant",
        lable: "All Restaurant",
      },
    ],
    icon: HomeOutlined,
  },
  {
    key: "allmenu",
    lable: "Menu",
    icon: ReadOutlined,
    child: [
      {
        key: "menu",
        lable: "All Menu",
        child: [
          {
            key: "menuSub",
            lable: "Menu SUB",
          },
        ],
      },
    ],
  }
];

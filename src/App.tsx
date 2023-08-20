import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Restaurant from "./components/Restaurant/Restaurant";
import useLogin from "./store/useLoginState";
import RestaurantDetails from "./components/Restaurant Details/RestaurantDetails";
import Menu from "./custom-components/Menu/Menu";
import RestaurantMenu from "./components/Menu/RestaurantMenu";
import MenuDetails from "./components/Menu/MenuDetails/MenuDetails";
import Layout from "./components/Layout/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtedTedRoutes";
function App() {
  const isLogin = useLogin((state) => state.isLogin);
  const setLogin = useLogin((state) => state.setLogin);

  const navigate = useNavigate();
  console.log(isLogin, "IS LOGGED IN USER");
  // console.log(Cookies.get("JWT_TOKEN"))
  useEffect(() => {
    console.log(Cookies.get("JWT_TOKEN"));
    if (Cookies.get("JWT_TOKEN")) {
      setLogin(true);
    } else {
      navigate("/");
    }
  }, [Cookies.get("JWT_TOKEN")]);
  return (
    // <Suspense>
    <Routes>
      <Route element={<Layout />}>
        <Route path={`/`} index element={<Login />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/signup`} element={<Signup />} />
        <Route path={`/restaurant`} element={<Restaurant />} />
        <Route path={`/restaurant/:id`} element={<RestaurantDetails />} />
        <Route path={`/menu`} element={<RestaurantMenu />} />
        <Route path={`/menu/:menuId`} element={<MenuDetails />} />
      </Route>
    </Routes>
    // </Suspense>
  );
}

export default App;

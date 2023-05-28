import { Suspense, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Restaurant from "./components/Restaurant/Restaurant";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  console.log(Cookies.get("JWT_TOKEN"))
  useEffect(() => {
    if (Cookies.get("JWT_TOKEN")) {
      console.log("LOGGGEDIN")
      setIsLoggedIn(true);
    }

  }, [Cookies.get("JWT_TOKEN")])
  return (
    <Suspense>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/signup`} element={<Signup />} />
        <Route path={`/restaurant`} element={<Restaurant />} />
      </Routes>
    </Suspense>
  )
}

export default App

import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
function App() {
  return (
    <Suspense>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/signup`} element={<Signup />} />
      </Routes>
    </Suspense>
  )
}

export default App

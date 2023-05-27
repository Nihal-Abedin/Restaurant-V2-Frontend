import Para from './components/Test/Para'
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
function App() {
  return (
    // <>
    //   <Para />
    // </>
    <Suspense>
      <Routes>
        <Route path={`/`} element={<Login />} />
        <Route path={`/login`} element={<Login />} />
      </Routes>
    </Suspense>
  )
}

export default App

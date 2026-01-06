import Login from "./Components/Login.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./Components/SignIn.tsx";

function App() {
  return (
   <>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/SignIn" element={<SignIn/>}/>
   </Routes>
   </>
  );
}

export default App;

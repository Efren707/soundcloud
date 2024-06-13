import { BrowserRouter, Navigate, Routes, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./loginPage";
import HomePage from "./homePage";


import './App.css';
import UserPage from "./userPage";
import Navbar from "./navbar/Navbar";

function App() {

  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  console.log(isAuth);

  return (
    <BrowserRouter>
      <div className="App">

        {isAuth ? <Navbar/> : null}
        
        <Routes>
          <Route path="/" element={<LoginPage/>} /> 
          <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/" /> } />
          <Route path="/profile" element={isAuth ? <UserPage/> : <Navigate to="/" /> } />
        </Routes>

      </div>
    </BrowserRouter>
      
  );
}

export default App;

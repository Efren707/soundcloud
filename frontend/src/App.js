import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./loginPage";
import HomePage from "./homePage";

import './App.css';

function App() {

  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/" /> } />
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Navigate, Routes, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./loginPage";
import DiscoverPage from "./discoverPage/Discover";

import './App.css';
import ProfilePage from "./profilePage/ProfilePage";
import Navbar from "./navbar/Navbar";
import Playbar from "./playbar/Playbar";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <div className="App">

        { isAuth ? 
          <Navbar/> 
        : null}
        
        <Routes>
          <Route path="/" element={<LoginPage/>} /> 
          <Route path="/discover" element={isAuth ? <DiscoverPage/> : <Navigate to="/" /> } />
          <Route path="/profile" element={isAuth ? <ProfilePage/> : <Navigate to="/" /> } />
        </Routes>
        
        { isAuth ? 
          <Playbar/> 
        : null}
      </div>
    </BrowserRouter>
      
  );
}

export default App;

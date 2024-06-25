import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./homePage/HomePage";
import DiscoverPage from "./discoverPage/Discover";

import './App.css';
import ProfilePage from "./profilePage/ProfilePage";
import Navbar from "./navbar/Navbar";
import Playbar from "./playbar/Playbar";
import ArtistPage from "./artistPage/ArtistPage";
import SongPage from "./songPage/SongPage";
import UploadSong from "./uploadSong/UploadSong";

function App() {

  const isAuth = Boolean(useSelector((state) => state.token));
  const isSong = Boolean(useSelector((state) => state.song));

  return (
    <BrowserRouter>
      <div className="App">

        { isAuth ? 
          <Navbar/> 
        : null}
        
        <Routes>
          <Route path="/" element={ !isAuth ? <HomePage/> : <Navigate to="discover" /> } /> 
          <Route path="/discover" element={isAuth ? <DiscoverPage/> : <Navigate to="/" /> } />
          <Route path="/profile" element={isAuth ? <ProfilePage/> : <Navigate to="/" /> } />
          <Route path="/artist/:id" element={isAuth ? <ArtistPage/> : <Navigate to="/" /> } />
          <Route path="/track/:id" element={isAuth ? <SongPage/> : <Navigate to="/" /> } />
          <Route path="/upload" element={isAuth ? <UploadSong/> : <Navigate to="/" /> } />
        </Routes>
        
        { isAuth && isSong ? 
          <Playbar/> 
        : null}
      </div>
    </BrowserRouter>
      
  );
}

export default App;

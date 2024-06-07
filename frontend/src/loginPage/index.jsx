import "./styles/index.css"
import "./styles/carousel.css"
import "./styles/search.css"
import "./styles/trending.css"
import { useState } from "react";
import LoginForm from "./LoginModal";
import RegisterForm from "./RegisterModal";
import SontTile from "../components/SongTile"; 

const LoginPage = () => {
  
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  return (
    <div className="container">
      <div className="content">

        <div className="carousel">

          <div className="topBar">

            <div className="logoContainer">
              <div className="logo"></div>
              <h1 className="interHeader">SOUNDCLOUD</h1>
            </div>

            <div className="buttonContainer">
              <button className="button interText signIn">Sign In</button>
              <button className="button interText">Create account</button>
            </div>

          </div>

          <div className="carouselText">
            <div className="carouselTextContent">
              <h1 className="interHeader">What's next in music is first on SoundCloud</h1>
              <h3 className="interText">Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans, and connect with other artists.</h3>
              <button className="bigButton interText">Start uploading today</button>
            </div> 
          </div>

        </div>

        <div className="search">

          <div className="searchInput">
          <input className="interText" placeholder="Search for artist, bands, tracks, podcasts"></input>
          <button className="searchButton"></button>
          </div>

          <span>or</span>
          <button className="bigButton">Upload your own</button>

        </div>







        <div className="trending">
          <h3>Hear what’s trending for free in the SoundCloud community</h3>

          <div className="songTilesContainer">
            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>

            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>
            <SontTile/>
          </div>

          <button className="bigButton">Explore trending playlists</button>
        </div>












        <div className="mobile"></div>

        <div className="callingCreators"></div>

        <div className="thankyou"></div>
      </div>
    </div>
  );
};

export default LoginPage;
import "./styles/homepage.css"
import "./styles/carousel.css"
import "./styles/search.css"
import "./styles/trending.css"
import "./styles/mobile.css"
import "./styles/creators.css"
import React, { useState } from "react";
import LoginForm from "./LoginModal";
import RegisterForm from "./RegisterModal";
import SongTile from "../components/SongTile"; 

const LoginPage = () => {
  
  const [showForm, setForm] = useState("close");

  function openForm(formtype) {
    
    if(formtype === "signIn"){
      setForm("signIn");
    } 

    if(formtype === "signUp"){
      setForm("signUp");
    }
    
    if(formtype === "close"){
      setForm("close");
    } 

  }

  return (
    <div className="container">
      
      {showForm === "signIn" ? 
        <div className='formContainer'>

          <div className="closeBtn">
            <button onClick={() => {openForm("close")}}>X</button>
          </div>

          <LoginForm/> 

        </div>
      : null }

      {showForm === "signUp" ? 
        <div className='formContainer'>

          <div className="closeBtn">
            <button onClick={() => {openForm("close")}}>X</button>
          </div>

          <RegisterForm/> 

        </div>
      
      : null }

      <div className="content">

        <div className="carousel">

          <div className="topBar">

            <div className="logoContainer">
              <div className="logo"></div>
              <h1>SOUNDCLOUD</h1>
            </div>

            <div className="buttonContainer">
              <button className="button signIn" onClick={() => {openForm("signIn")}}>Sign In</button>
              <button className="button" onClick={() => {openForm("signUp")}}>Create account</button>
            </div>

          </div>

          <div className="carouselText">
            <div className="carouselTextContent">
              <h1>What's next in music is first on SoundCloud</h1>
              <h3>Upload your first track and begin your journey. SoundCloud gives you space to create, find your fans, and connect with other artists.</h3>
              <button className="bigButton">Start uploading today</button>
            </div> 
          </div>

        </div>

        <div className="search">

          <div className="searchInput">
          <input placeholder="Search for artist, bands, tracks, podcasts"></input>
          <button className="searchButton"></button>
          </div>

          <span>or</span>
          <button className="bigButton">Upload your own</button>

        </div>

        <div className="trending">
          <h3>Hear what’s trending for free in the SoundCloud community</h3>

          <div className="songTilesContainer">
            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>

            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
          </div>

          <button className="bigButton">Explore trending playlists</button>
        </div>

        <div className="mobile">

          <div className="mobileImg">
            <div className="mobilePicture"></div>
          </div>
          
          <div className="mobileInfo">

            <div className="infoContent">
              <div className="infoContentHeader">
                <h1>Never stop listening</h1>
              </div>

              <div className="line"></div>
              
              <h2>SoundCloud is available on Web, iOS, Android, Sonos, Chromecast, and Xbox One.</h2>

              <div className="mobileBadges">
                <div className="badge appleBadge"></div>
                <div className="badge googleBadge"></div>
              </div>
            </div>
            
          </div>
        </div>

        <div className="callingCreators">

          <div className="creatorsContent">
            <h1>Calling all creators</h1>
            <h2>Get on SoundCloud to connect with fans, share your sounds, and grow your audience. What are you waiting for?</h2>
            <button className="bigButton">Find out more</button>
          </div>

        </div>

        <div className="thankyou">
          <div className="thankyouSubContainer">
            <h1>Thanks for listening. Now join in.</h1>
            <h2>Save tracks, follow artists and build playlists. All for free.</h2>

            <div className="thankyouBtns">
              <button className="bigButton" onClick={() => {openForm("signUp")}}>Create account</button>

              <div className="tySignIn">
                <p>Already have an account?</p>
                <button className="bigButton" onClick={() => {openForm("signIn")}}>Sign in</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
import React, {useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import "./styles/playbar.css";
import { useSelector } from "react-redux";
import { playSong } from '../state';

const Playbar = () => {

  const song = useSelector((state) => state.song);
  const audioRef = useRef();
  const navigate = useNavigate();

  function onTrackChange(){
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.load();
    } 
  }

  useEffect(() => {
    playSong();
    onTrackChange();
  }, [song]);

  return (
    <div className='playbarContainer'>

      <div className="playbarSubcontainer">
        
        <div className="songAudioPlayer">
          
          <audio controls ref={audioRef} preload="metadata">
            <source src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songMP3/${song.mp3URL}`} type="audio/mpeg"/>
          </audio>

        </div>
        

        <div className="playbarSongInfo">

          <div className="playbarSongImg">
            <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songPicture/${song.imageURL}`}/>
          </div>

          <div className="playbarSongArtist">
            <h1 onClick={() => navigate(`/track/${song._id}`)}>{song.title}</h1>
            <h1 onClick={() => navigate(`/artist/${song.userId}`)}>{song.displayName}</h1>
          </div>
        
        </div>

      </div>

    </div>
  );
  
}

export default Playbar
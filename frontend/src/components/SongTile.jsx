import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import { playSong } from '../state';
import { useNavigate } from "react-router-dom";


import "./styles/songTile.css";
import defaultPic from "./images/defaultSongPic.jpg";

function SongTile({song}) {

  const [style, setStyle] = useState({display: 'none'});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePlay(){
    dispatch(playSong({song: song}));
  }

  return (
    <div className='tileContainer'>

      <div className="songImg"
        onMouseEnter={e => {
          setStyle({display: 'block'});
        }}
        onMouseLeave={e => {
          setStyle({display: 'none'})
        }}
        style={{
          backgroundImage: song.imageURL ? `url(https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songPicture/${song.imageURL})` : "url(./images/defaultSongPic.jpg)"
        }}
      >

        <div className="playBtn" style={style} onClick={handlePlay}>
          <div className="playIcon"></div>
        </div>
      
      </div>

      <div className="songInfo">
        <h4 onClick={() => navigate(`/track/${song._id}`)}>{song.title}</h4>
        <h5 onClick={() => navigate(`/artist/${song.userId}`)}>{song.displayName}</h5>
      </div>
      
    </div>
  )
}

export default SongTile;
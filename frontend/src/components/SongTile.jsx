import React, {useState} from 'react';
import "./styles/songTile.css";

function SontTile() {

  const [style, setStyle] = useState({display: 'none'});

  return (
    <div className='tileContainer'>

      <div className="songImg"
        onMouseEnter={e => {
          setStyle({display: 'block'});
        }}
        onMouseLeave={e => {
          setStyle({display: 'none'})
        }}
      >
        
        <div className="playBtn" style={style}>
          <div className="playIcon"></div>
        </div>
      
      </div>

      <div className="songInfo">
        <h4>Title</h4>
        <h5>Artist</h5>
      </div>
      
    </div>
  )
}

export default SontTile;
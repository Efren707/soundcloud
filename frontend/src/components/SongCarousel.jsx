import React from 'react';
import "./styles/songCarousel.css";

import SongTile from "./SongTile";

function SongCarousel({title, songs}) {

  const songItems = songs.map((song) => 
    <SongTile song={song} />
  )

  return (
    <div className='songCarouselContainer'>

        <div className="carouselTitle">
            <h1>{title}</h1>
        </div>

        <div className="carouselContainer">
            { songItems }
        </div>

    </div>
  )
}

export default SongCarousel
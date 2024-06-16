import React from 'react';
import "./styles/songCarousel.css";

import SongTile from "./SongTile";

function SongCarousel() {
  return (
    <div className='songCarouselContainer'>

        <div className="carouselTitle">
            <h1>Trending Music on SoundCloud</h1>
        </div>

        <div className="carouselContainer">
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

            <SongTile/>
            <SongTile/>
            <SongTile/>
            <SongTile/>
        </div>

    </div>
  )
}

export default SongCarousel
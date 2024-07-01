import React, { useEffect, useState } from 'react';
import "./styles/songPage.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { playSong } from '../state';

function SongPage() {

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [song, setSong] = useState();

    const getSong = async () => {
        axios({
            url: `http://localhost:4000/songs/${id}`,
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        }).then((res) => {
            setSong(res.data);
        },(err) => {
            console.log(err)
        })
    };

    function handlePlay(){
        dispatch(playSong({song: song}));
    }

    useEffect(() => {
        getSong();
    }, []);

    return (
        <div className='songPageContainer'>
            <div className="songBanner">
                <div className="songBannerInfo">
                    
                    <div className="songPlayBtn" onClick={handlePlay}>
                        <div className="songPlayIcon"></div>
                    </div>

                    <div className="songInfoText">
                        <div className="songInfoTextCon">
                            <h1>{song?.title}</h1>
                        </div>

                        <div className="songInfoTextCon">
                            <h2 onClick={() => navigate(`/artist/${song.userId}`)}>{song?.displayName}</h2>
                        </div>
                    </div>
                    
                </div>


                <div className="songBannerImg">
                    <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songPicture/${song?.imageURL}`}/>
                </div>
            </div>
        </div>
    )
}

export default SongPage
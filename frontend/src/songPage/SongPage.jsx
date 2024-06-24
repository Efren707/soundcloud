import React, { useEffect, useState } from 'react';
import "./styles/songPage.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { playSong } from '../state';

function SongPage() {

    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [song, setSong] = useState();

    const getSong = async () => {
        axios({
            url: `http://localhost:4000/songs/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            }
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
                    
                    <div className="playBtn" onClick={handlePlay}>
                        <div className="playIcon"></div>
                    </div>

                    <h1>{song?.title}</h1>
                    <h2>{song?.displayName}</h2>
                </div>
                <div className="songBannerImg">
                    <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songPicture/${song?.imageURL}`}/>
                </div>
            </div>
        </div>
    )
}

export default SongPage
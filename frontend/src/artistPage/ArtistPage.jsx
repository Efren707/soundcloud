import React, { useEffect, useState } from 'react';
import "./styles/artistPage.css"
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from "axios";

function ArtistPage() {

    const token = useSelector((state) => state.token);
    const { id } = useParams();
    const [artist, setArtist] = useState();

    const getArtist = async () => {
        axios({
            url: `http://localhost:4000/users/${id}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            setArtist(res.data);
        },(err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getArtist();
    }, [artist])

    return (
        <div className="profileContainer">

            <div className="banner">

                <div className="bannerUserInfo">
                
                <div className="profileImg">
                    <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${artist?.profileURL}`}/>
                </div>

                <div className="profileName">
                    <h1>{artist?.displayName}</h1>
                    <h3>{artist?.firstName} {artist?.lastName}</h3>
                </div>
                
                </div>

                <div className="bannerUploadHeader"></div>

            </div>

            <div className="profileHeader">
                <div className="profileHeadings">
                <h3>Your Tracks</h3>
                </div>
            </div>

            <div className="profileContent">

                <div className="userSongs">

                </div>

                <div className="rightBar">
                <div className="followInfo"></div>
                
                </div>
            </div>
        </div>
    )
}

export default ArtistPage
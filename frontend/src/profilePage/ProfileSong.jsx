import React, { useState } from 'react';
import "./styles/profileSongs.css";
import { useDispatch } from "react-redux";
import { playSong } from '../state';
import { useNavigate } from "react-router-dom";

import EditSongPage from '../songPage/EditSongPage';

import EditIcon from '@mui/icons-material/EditOutlined';
import PlayIcon from '@mui/icons-material/PlayArrow';
import CommentIcon from '@mui/icons-material/ChatBubble';
import LikeIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSongModal from './DeleteSongModal';

function ProfileSong({song}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showModal, setModal] = useState("");

    const likeCount = Object.keys(song.likes).length;
    const commentCount = Object.keys(song.comments).length;
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function handlePlay(){
        dispatch(playSong({song: song}));
    }

    function openModal() {
        if(showModal.length === 0) {
            setModal("open");
        } else {
            setModal("")
        }
    } 

    return (
        <div className='profileSongsContainer'>

            { showModal === "open" ? <DeleteSongModal songId={song._id} title={song.title} closeModal={openModal} /> : null }

            <div 
                className="profileSongImg"
                style={{
                    backgroundImage: song.imageURL ? `url(https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/songPicture/${song.imageURL})` : "url(./images/defaultSongPic.jpg)"
                }}
            ></div>
            

            <div className="profileSongsSubcontainer">

                <div className="profileSongInfo">

                    <div className="profileSongInfoLeft">
                        <div className="profilePlayBtn" onClick={handlePlay}>
                            <div className="profilePlayIcon"></div>
                        </div>

                        <div className="profileSongLeftMain">
                            <h3>{song.displayName}</h3>
                            <h1 onClick={() => navigate(`/track/${song._id}`)}>{song.title}</h1>
                        </div>
                    </div>

                    <div className="profileSongInfoRight">
                        <h1>{new Date(song.createdAt).toLocaleDateString('en-US', DATE_OPTIONS)}</h1>
                        <button># {song.genre}</button>
                    </div>

                </div>

                <div className="profileSongInteractions">
                    
                    <div className="profileSongInteractionsLeft">
                        <button><LikeIcon/>{likeCount}</button>
                        <button onClick={() => navigate(`/editTrack/${song._id}`, {state: {song : song}})}>Edit <EditIcon/></button>
                        <button onClick={() => setModal("open")}>Delete <DeleteIcon/></button>
                    </div>

                    <div className="profileSongInteractionsRight">
                        <h1 className='profileSongPlayCount'> <PlayIcon/> {song.playCount}</h1>
                        <h1 className='profileSongCommentCount'> <CommentIcon/> {commentCount}</h1>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default ProfileSong;
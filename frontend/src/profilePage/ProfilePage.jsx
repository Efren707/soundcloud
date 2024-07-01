import "./styles/profilePage.css";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUserSongs } from "../state";
import axios from "axios";
import EditUserModal from "./EditUserModal";
import ProfileSong from "./ProfileSong";
import EditIcon from '@mui/icons-material/EditOutlined';

function UserPage() {
  const token = useSelector((state) => state.token);
  const { _id, displayName, firstName, lastName, profileURL } = useSelector((state) => state.user);
  const userSongs = useSelector((state) => state.userSongs);

  const dispatch = useDispatch();
  const [showForm, setForm] = useState("");

  function openForm() {
    if(showForm.length === 0) {
      setForm("open");
    } else {
      setForm("")
    }
  } 

  const setUserSongs = async () => {
    axios({
      url: `http://localhost:4000/songs/artist/${_id}`,
      method: "GET",
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(getUserSongs({ userSongs: res.data }));
    },(err) => {
      console.log(err)
    })

  };

  useEffect(() => {
    setUserSongs();
  }, []); 

  return (
    <div className="profileContainer">

      {
        showForm === "open" ? 
        <div className='userEditModalContainer'>

          <div className="userEditCloseBtn">
            <button onClick={() => {openForm()}}>X</button>
          </div>

          <EditUserModal closeForm={openForm}/> 

        </div>
        : null 
      }

      <div className="banner">

        <div className="bannerUserInfo">
          
          <div className="profileImg">
            <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${profileURL}`}/>
          </div>

          <div className="profileName">
            <h1>{displayName}</h1>
            <h3>{firstName} {lastName}</h3>
          </div>
          
        </div>

        <div className="bannerUploadHeader"></div>

      </div>

      <div className="profileHeader">
        <div className="profileHeadings">
          <h3>Your Tracks</h3>
        </div>

        <button onClick={() => {openForm()}}>
          <EditIcon/>
          Edit
        </button>
      </div>

      <div className="profileContent">

        <div className="userSongs">
          {
            userSongs?.map((song) =>{
              return(
                <ProfileSong song={song}/>
              )
            })
          }
        </div>

        <div className="rightBar">
          <div className="followInfo"></div>
          
        </div>
      </div>
    </div>
  )
}

export default UserPage;
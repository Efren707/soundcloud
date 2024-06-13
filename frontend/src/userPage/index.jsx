import "./styles/index.css";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import EditUserModal from "./EditUserModal";

function UserPage() {

  const {_id, userName, email, password, profilePicPath, followers, following} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [showForm, setForm] = useState("close");

  function openForm(formtype) {
    
    if(formtype === "update"){
      setForm("update");
    } 

    if(formtype === "close"){
      setForm("close");
    } 

  } 


  return (
    <div className="profileContainer">

      {showForm === "update" ? 
      <div className='modalContainer'>

        <div className="closeBtn">
          <button onClick={() => {openForm("close")}}>X</button>
        </div>

        <EditUserModal/> 

      </div>
      : null }

      <div className="banner">

        <div className="bannerUserInfo">
          
          <div className="profileImg">
            <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${profilePicPath}`}/>
          </div>

          <div className="profileName">
            <h1>{userName}</h1>
            <h3>{userName}</h3>
          </div>
          
        </div>

        <div className="bannerUploadHeader"></div>

      </div>

      <div className="profileNav">
        <button onClick={() => {openForm("update")}}>Edit</button>
      </div>
    </div>
  )
}

export default UserPage;
import "./styles/profileDD.css";
import React from 'react';
import { useNavigate } from "react-router-dom";


import ProfileIcon from '@mui/icons-material/Person';
import LikesIcon from '@mui/icons-material/Favorite';
import StationsIcon from '@mui/icons-material/Sensors';
import FollowIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/StarRate';
import TracksIcon from '@mui/icons-material/GraphicEq';

function ProfileDD() {

    const navigate = useNavigate();

  return (
    <div className="navProfileDDContainer">
        <ul>
            <li onClick={() => navigate("/profile")}>
                <ProfileIcon/>
                Profile
            </li>
            
            <li>
                <LikesIcon/>
                Likes
            </li>

            <li>
                <StationsIcon/>
                Stations
            </li>

            <li>
                <FollowIcon/>
                Who to follow
            </li>

            <li>
                <StarIcon/>
                Try Next Pro
            </li>

            <li>
                <TracksIcon/>
                Tracks
            </li>
        </ul>
    </div>
  )
}

export default ProfileDD
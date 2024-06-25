import "./styles/navbar.css";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileDD from "./ProfileDD";
import MoreDD from "./MoreDD";

import NotificationsIcon from '@mui/icons-material/Notifications';
import Emaiacon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar() {
    const { displayName, profileURL } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [actLink, setActlink] = useState("home");
    const [actIcon, setActIcon] = useState("");

    function handleActiveIcon(icon) {
        if(actIcon === icon){
            setActIcon("");
        } else {
            setActIcon(icon)
        }
    }

    function clickLink(link){

        if(link === "upload"){
            navigate("/upload");
            setActlink("upload")
        } else if(link === "home"){
            navigate("/discover");
            setActlink("home");
        } else {
            setActlink(link);
        }
        
    }

    return (
        <div className='navContainer'>

            <div className="navSubContainer">

                <div className="navLeft">
                    <a 
                        className="navLogoContainer"
                        onClick={() => navigate("/discover")}
                    >
                        <div className="navLogo"></div>
                    </a>

                    <div className="navLeftLinks">
                        <a 
                            className="navLink" 
                            style={actLink === "home" ? {backgroundColor: '#111'} : null}
                            onClick={() => clickLink("home")}
                        >Home</a>
                        <a 
                            className="navLink" 
                            style={actLink === "feed" ? {backgroundColor: '#111'} : null}
                            onClick={() => clickLink("feed")}
                        >Feed</a>
                        <a 
                            className="navLink" 
                            style={actLink === "library" ? {backgroundColor: '#111'} : null}
                            onClick={() => clickLink("library")}
                        >Library</a>
                    </div>
                </div>
                
                <div className="navSearchBar">
                    <input type="text" placeholder="Search"/>
                    <div className="searchBtnCtn">
                        <button className="searchButton"/>
                    </div>
                </div>
                
                <div className="navRight">

                    <div className="navRightSubContainer">
                        <a 
                            className="navUpload"
                            style={actLink === "upload" ? {backgroundColor: '#111'} : null}
                            onClick={() => clickLink("upload")}
                        >Upload</a>
                
                        <a className="navProfile"
                            style={actIcon === "profile" ? {backgroundColor: '#111', color: 'white'} : null}
                            onClick={() => handleActiveIcon("profile")}
                        >
                            <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${profileURL}`}/>
                            <ExpandMoreIcon/>

                            { actIcon === "profile" ? 
                                <ProfileDD/> : null
                            }
                        </a>

                        <div className="navRightIcons">
                            <a 
                                className="navIcons"
                                style={actIcon === "notif" ? {backgroundColor: '#111', color: 'white'} : null}
                                onClick={() => handleActiveIcon("notif")}
                            >
                                <NotificationsIcon/>
                            </a>

                            <a 
                                className="navIcons"
                                style={actIcon === "message" ? {backgroundColor: '#111', color: 'white'} : null}
                                onClick={() => handleActiveIcon("message")}
                            >
                                <Emaiacon/>
                            </a>

                            <a 
                                className="navIcons"
                                style={actIcon === "more" ? {backgroundColor: '#111', color: 'white'} : null}
                                onClick={() => handleActiveIcon("more")}
                            >
                                <MoreHorizIcon/>
                            </a>

                            { actIcon === "more" ? 
                                <MoreDD/> : null
                            }
                        </div>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default Navbar;
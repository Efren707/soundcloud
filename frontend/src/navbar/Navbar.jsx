import "./styles/navbar.css";
import React from 'react';
import { useSelector } from "react-redux";

import NotificationsIcon from '@mui/icons-material/Notifications';
import Emaiacon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navbar() {

    const {_id, userName, email, password, profilePicPath, followers, following} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    return (
        <div className='navContainer'>

            <div className="navSubContainer">

                <div className="navLeft">
                    <a className="navLogoContainer">
                        <div className="navLogo"></div>
                    </a>

                    <div className="navLeftLinks">
                        <a className="navLink">Home</a>
                        <a className="navLink">Feed</a>
                        <a className="navLink">Library</a>
                    </div>
                </div>
                
                <div className="navSearchBar">
                    <input type="text"/>
                </div>
                
                <div className="navRight">

                    <div className="navRightSubContainer">
                        <a className="navUpload">Upload</a>
                
                        <a className="navProfile">
                            <img src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${profilePicPath}`}/>
                            <ExpandMoreIcon/>
                        </a>

                        <div className="navRightIcons">
                            <a className="navIcons">
                                <NotificationsIcon/>
                            </a>

                            <a className="navIcons">
                                <Emaiacon/>
                            </a>

                            <a className="navIcons">
                                <MoreHorizIcon/>
                            </a>
                        </div>
                    </div>
                    
                </div>

            </div>
            
        </div>
    )
}

export default Navbar;
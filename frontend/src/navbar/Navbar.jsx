import "./styles/navbar.css";
import React from 'react';

import NotificationsIcon from '@mui/icons-material/Notifications';
import Emaiacon from '@mui/icons-material/Email';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Navbar() {
  return (
    <div className='navContainer'>

        <div className="navSubContainer">

            <div className="navLeft">
                <a className="navLogoContainer">
                    <div className="navLogo"></div>
                </a>
                <a className="navLink">Home</a>
                <a className="navLink">Feed</a>
                <a className="navLink">Library</a>
            </div>
            
            <a className="navSearchBar">
                <input type="text"/>
            </a>
            
            <div className="navRight">
                <a className="navUpload">Upload</a>
            
                <a className="navProfile">
                    <img/>
                </a>
                
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
  )
}

export default Navbar;
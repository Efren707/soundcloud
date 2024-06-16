import "./styles/moreDD.css";
import React from 'react';
import { setLogout } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MoreDD() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout(){
        dispatch(setLogout());
        navigate("/");
    }
    
    return (
        <div className="navMoreDDContainer">
            <ul>
                <li>
                    About us
                </li>

                <li>
                    Legal
                </li>

                <li className="ddLine">
                    Copyright
                </li>

                <li style={{color: "#f50"}}>
                    Get SoundCloud Go+
                </li>

                <li>
                    Mobile Apps
                </li>

                <li>
                    For Creators
                </li>

                <li>
                    Blog
                </li>

                <li>
                    Jobs
                </li>

                <li className="ddLine">
                    Developers
                </li>

                <li>
                    Support
                </li>

                <li className="ddLine">
                    Keyboard shortcuts
                </li>

                <li>
                    Subscription
                </li>

                <li>
                    Settings
                </li>

                <li onClick={() => handleLogout()}>
                    Sign out
                </li>
            </ul>
        </div>
    )
}

export default MoreDD;
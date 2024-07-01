import React from 'react';
import "./styles/deleteSongModal.css";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteSong } from "../state"

function DeleteSongModal(props) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    console.log(props.songId);

    function handleDelete() {
        axios({
            url: `http://localhost:4000/songs/delete/${props.songId}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            dispatch(deleteSong({ deletedSong: res.data }));
        },(err) => {
            console.log(err)
        })

        props.closeModal()
    }

    return (
        <div className='deleteSongModalContainer'>
            <div className='deleteSongModalSubcontainer'>

                <div className="deleteModalWarning">
                    <h1>Are you sure you want to delete {props.title}?</h1>
                    <h3>This song will be permanently deleted. You can't undo this action</h3>
                </div>

                <div className="deleteModalBtns">
                    <button onClick={() => props.closeModal()}>Cancel</button>
                    <button onClick={() => handleDelete()}>Delete</button>
                </div>

            </div>
        </div>
    )
}

export default DeleteSongModal
import React, { useEffect, useMemo, useState } from 'react';
import "./styles/editSongPage.css";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSong } from "../state"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";

const schema = yup.object({
  title: yup.string().required("Please enter a title").min(3),
  genre: yup.string().required("Please select a genre"),
  description: yup.string().max(100),
  caption: yup.string().max(100),
  mp3URL: yup.mixed().required("Please upload a MP3 file"),
  imageURL: yup.mixed().required("Please upload a JPEG image"),
}).required();

function EditSongPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const location = useLocation()
    const song = location.state.song;
    const { id } = useParams();

    console.log(song, "song")

    const mp3URLKey = song.mp3URL.split("-");
    const mp3URLFormatted = mp3URLKey[mp3URLKey.length - 1];

    const imageURLKey = song.imageURL.split("-");
    const imageURLFormatted = imageURLKey[imageURLKey.length - 1];

    const { register, handleSubmit, watch, formState:{ errors } } = useForm({
        defaultValues: song ? {
            title: song.title,
            genre: song.genre,
            description: song.description,
            caption: song.caption,
            mp3URL: song.mp3URL,
            imageURL: song.imageURL,
        } : undefined,
        resolver: yupResolver(schema)
    });

    const onSubmit = async (values) => {

        const formData = new FormData();

        formData.append("userId", user._id);

        for (let value in values) {
            if(value === "mp3URL" && typeof values[value] === "object") {
                formData.append("mp3URL", values.mp3URL[0]);
            } else if(value === "imageURL" && typeof values[value] === "object") {
                formData.append("imageURL", values.imageURL[0]);
            } else {
                formData.append(value, values[value]);
            }
        }

        axios({
            url: `http://localhost:4000/editSong/${id}`,
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data",
            },
            data: formData
        }).then((res) => {
            dispatch(updateSong({ updatedSong: res.data }));
            navigate(`/track/${id}`)
        },(err) => {
            console.log(err)
        })
        
    };

    return (
        <div className='editSongContainer'>
            <div className="editSongSubcontainer">
                <form onSubmit={handleSubmit(onSubmit)} className="editSongForm">

                    <input {...register("title", { required: true, min: 3 })} placeholder={song.title ? `${song.title}` : "Title"}></input>
                    <p>{errors.title?.message}</p>

                    <label htmlFor="genre">Select genre</label>
                    <br></br>
                    <select {...register("genre", { required: true })} defaultValue={song.genre ? song.genre : ""}>
                        <option value="Blues">Blues</option>
                        <option value="Classical">Classical</option>
                        <option value="Corridos">Corridos</option>
                        <option value="Country">Country</option>
                        <option value="Heavy Metal">Heavy Metal</option>
                        <option value="House Music">House Music</option>
                        <option value="Jazz">Jazz</option>
                        <option value="K-Pop">K-Pop</option>
                        <option value="Latin">Latin</option>
                        <option value="Other">Other</option>
                        <option value="Pop">Pop</option>
                        <option value="Rap & Hip Hop">Rap & Hip Hop</option>
                        <option value="Rock">Rock</option>
                        <option value="Techno">Techno</option>
                    </select>
                    <p>{errors.genre?.message}</p>

                    <input {...register("description")} placeholder="Describe your track"></input>
                    <p>{errors.description?.message}</p>

                    <input {...register("caption")} placeholder="Add a caption to your post (optional)"></input>
                    <p>{errors.caption?.message}</p>

                    <label htmlFor="mp3URL">
                        Current mp3 file {mp3URLFormatted}
                    </label>
                    <br></br>
                    <input 
                        {...register("mp3URL", { required: true })} 
                        type="file" 
                        id="mp3URL" 
                        name="mp3URL"
                    ></input>
                    <p>{errors.mp3URL?.message}</p>

                    <label htmlFor="imageURL">
                        Current image {imageURLFormatted}
                    </label>
                    <br></br>
                    <input 
                        {...register("imageURL", { required: true })} 
                        type="file" 
                        id="imageURL" 
                        name="imageURL"
                    ></input>
                    <p>{errors.imageURL?.message}</p>

                    <div className="editSongBtns">
                        <button className="editSongBtn" onClick={() => navigate("/discover")}>Cancel</button>
                        <button className="editSongBtn" type='submit'>Submit</button>
                    </div>
                    
                </form>

                <div className="songFormLegalNotice">
                    <p>By uploading, you confirm that your sounds comply with our <span>Terms of Use</span> and you don't infringe anyone else's rights.</p>
                </div>
            </div>
        </div>
    )
}

export default EditSongPage
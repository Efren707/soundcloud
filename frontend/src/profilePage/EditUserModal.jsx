import "./styles/editModal.css";
import CameraIcon from '@mui/icons-material/CameraAlt';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../state"

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  displayName: yup.string().required("Please enter a display name").min(3),
  firstName: yup.string(),
  lastName: yup.string(),
  city: yup.string(),
  country: yup.string(),
  bio: yup.string(),
  profileURL: yup.mixed()
}).required();

function EditUserModal(props) {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState:{ errors } } = useForm({
        defaultValues: user ? {
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            country: user.country,
            bio: user.bio,
            profileURL: user.profileURL
        } : undefined,
        resolver: yupResolver(schema)
    });

    const onSubmit = async (values) => {

        const formData = new FormData();

        for(let value in values) {
            formData.append(value, values[value]);
        }

        formData.append("profileURL", values.profileURL);
                
        const updatedUserResponse = await fetch(`http://localhost:4000/update/${user._id}`, {
            method: "PATCH",
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        
        const updatedUser = await updatedUserResponse.json();

        if(updatedUser) {
            dispatch(updateUser({ updatedUser: updatedUser }));
        }

        props.closeForm();
        
    };

    return (
        <div className="userEditFormSubcontainer">

            <div className="userEditFormHeader">
                <h1>Edit your Profile</h1>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="userEditForm">

                <div className="userEditFormFields">
                    
                    <div className="userEditPicture">
                        <img 
                            src={`https://efren-soundcloud-storage.s3.us-east-2.amazonaws.com/profilePicture/${user.profileURL}`}
                        />

                        <label for="profileURL">
                            <CameraIcon/> Update image
                        </label>
                        <input 
                            id="profileURL" 
                            type="file"
                            {...register("profileURL")}    
                        ></input>

                        <p>{errors.profileURL?.message}</p>
                    </div>

                    <div className="userEditInfo">

                        <div className="userDisplayName">
                            <label>Display name <span>*</span></label>
                            <input {...register("displayName")} placeholder={user.displayName ? `${user.displayName}` : ""}></input>
                            <p>{errors.displayName?.message}</p>
                        </div>
                        
                        <div className="userSmallField">

                            <div className="smallField">
                                <label>First name</label>
                                <input {...register("firstName")} placeholder={user.firstName ? `${user.firstName}` : ""}></input>
                                <p>{errors.firstName?.message}</p>
                            </div>
                            
                            <div className="smallField">
                                <label>Last name</label>
                                <input {...register("lastName")} placeholder={user.lastName ? `${user.lastName}` : ""}></input>
                                <p>{errors.lastName?.message}</p>
                            </div>

                        </div>

                        <div className="userSmallField">

                            <div className="smallField">
                                <label>City</label>
                                <input {...register("city")} placeholder={user.city ? `${user.city}` : ""}></input>
                                <p>{errors.city?.message}</p>
                            </div>

                            <div className="smallField">
                                <label>Country</label>
                                <input {...register("country")} placeholder={user.country ? `${user.country}` : ""}></input>
                                <p>{errors.country?.message}</p>
                            </div>
                            
                        </div>

                        <div className="userBio">
                            <label>Bio</label>
                            <textarea {...register("bio")} placeholder={user.bio ? `${user.bio}` : ""}></textarea>
                        </div>
                        
                    </div>

                </div>

                <div className="userEditBtns">
                    
                    <button 
                        className=""
                        onClick={() => props.closeForm()}
                        style={{marginRight: "5px"}}
                    >Cancel</button>

                    <button 
                        type="submit" 
                    >Save changes</button>

                </div>

            </form>

        </div>
    )
}

export default EditUserModal;
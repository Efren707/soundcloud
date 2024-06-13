import "../loginPage/styles/forms.css"
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  userName: yup.string(),
  profilePicPath: yup.string(),
}).required();

function EditUserModal() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (values) => {
    
    };

    return (
        <div>

            <h1>Edit your Profile</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="formInputContainer">

                <input {...register("userName")} placeholder="Username"></input>
                <p>{errors.userName?.message}</p>

                <input {...register("profilePicPath")} type="file"></input>
                <p>{errors.profilePicPath?.message}</p>

                <button type="submit" className="bigButton">Continue</button>

            </form>

        </div>
    )
}

export default EditUserModal;
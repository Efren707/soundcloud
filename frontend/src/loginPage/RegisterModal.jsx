import "./styles/forms.css";

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegister } from "../state";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  userName: yup.string().required("Please enter a username").min(3),
  email: yup.string().email("Invalid email").required("Please enter an email"),
  password: yup.string().required("Please enter a password").min(5)
}).required();

function RegisterForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const onSubmit = async (values) => {

    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    
    const savedUserResponse = await fetch(
      "http://localhost:4000/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await savedUserResponse.json();

    console.log(savedUser);

    if(savedUser) {
      dispatch(
        setRegister({
          user: savedUser.user,
          token: savedUser.token,
        })
      );
      navigate("/profile");
    }
  };


  return (
    
    <div className="formSubcontainer">

      <form onSubmit={handleSubmit(onSubmit)} className="formInputContainer registerFormInputContainer">
          
        <input {...register("userName", { required: true, min: 3, max: 50 })} placeholder="Username"></input>
        <p>{errors.userName?.message}</p>


        <input {...register("email", { required: true, min: 2, max: 50 })} placeholder="Email address"></input>
        <p>{errors.email?.message}</p>


        <input {...register("password", { required: true, min: 5 })} placeholder="Password"></input>
        <p>{errors.password?.message}</p>

        <button type="submit" className="bigButton">Continue</button>

      </form>

      <div className="formLegalNotice">
        <p>When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our <span>Privacy Policy</span>.</p>
      </div>

    </div>
      
  )
}

export default RegisterForm
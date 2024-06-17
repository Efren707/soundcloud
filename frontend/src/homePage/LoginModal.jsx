import "./styles/forms.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Please your email"),
  password: yup.string().required("Please enter your password").min(5)
}).required();

function LoginForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values) => {
    const loggedInResponse = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    
    const loggedIn = await loggedInResponse.json();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/discover");
    }
  };

  return (

    <div className="formSubcontainer">
      
      <form onSubmit={handleSubmit(onSubmit)} className="formInputContainer">

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

export default LoginForm
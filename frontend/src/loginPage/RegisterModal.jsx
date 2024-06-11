import "./styles/forms.css";
import React, { useState } from 'react';

function RegisterForm() {

  const [style, setStyle] = useState({display: 'flex'});

  return (
    <div className='formContainer' style={style}>

      <div className="closeBtn">
        <button>X</button>
      </div>

      <div className="formSubcontainer">

        <form className="formInputContainer registerFormInputContainer">
            
          <input placeholder="Username"></input>

          <input placeholder="Email address"></input>

          <input placeholder="Password"></input>

          <button type="submit" className="bigButton">Continue</button>

        </form>

        <div className="formLegalNotice">
          <p>When registering, you agree that we may use your provided data for the registration and to send you notifications on our products and services. You can unsubscribe from notifications at any time in your settings. For additional info please refer to our <span>Privacy Policy</span>.</p>
        </div>

      </div>
      
    </div>
  )
}

export default RegisterForm
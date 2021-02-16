import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Form.css';
import FormSignup from '../forms/FormSignup';
import FormSignUpEmail from '../forms/FormSignUpEmail';
import FormSuccess from '../forms/FormSuccess';
import axios from "axios";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    uwi_email: '',
    password: '',
    password2: '',
    dob: '123456',
    type: 'student',
    alt: null,
    sex: ''
  });

  function submitForm(valuesToSend) {
    const data = {
      uwi_email: valuesToSend.uwi_email,
      first_name: valuesToSend.first_name,
      last_name: valuesToSend.last_name,
      alt_email: valuesToSend.alt_email,
      dob: valuesToSend.dob,
      type: valuesToSend.type,
      sex: valuesToSend.sex,
      password: valuesToSend.password
    };
    const config = {
      headers: {}
    };

    console.log(data);
    axios
      .post(
        "/users/add",
        data,
        config
      )
      .then(
        res => console.log(res.data),
      )
      .catch(err => console.log(err));
    setIsSubmitted(true);
    
  }

  function checkEmail(valuesToSend) {
    setEmailChecked(true);
    
    axios
      .get(
        "/users/email/" + valuesToSend.uwi_email,
      )
      .then(
        res => console.log(res.data,"hello"),
      );
  }


  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' alt='DCIT Picture' />
        </div>
        {
        !emailChecked ? (
          <FormSignUpEmail checkEmail={checkEmail}/>
        ) : (
          !isSubmitted ? (
            <FormSignup submitForm={submitForm}/>
          ) : (
            <FormSuccess />
          )
        )
        }
      </div>
    </>
  );
}

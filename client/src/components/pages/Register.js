import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import FormSignup from '../forms/FormSignup';
import FormSignUpEmail from '../forms/FormSignUpEmail';
import FormSuccess from '../forms/FormSuccess';
import axios from "axios";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
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
      uwi_email: values.uwi_email,
      first_name: values.first_name,
      last_name: values.last_name,
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
        setIsSubmitted(true),
      )
      .catch(err => console.log(err));
    
    
  }

  function checkEmail(valuesToSend) {
    axios
      .get(
        "/users/email/" + valuesToSend.uwi_email,
      )
      .then(
        res => { 
        if (res.data.msg == "User with same username already exist")
        console.log(res.data,"hello")
        else{
        const first = valuesToSend.uwi_email.split(".");
        const second = first[1].split("@");
        values.first_name = first[0];
        values.last_name = second[0];
        values.uwi_email = valuesToSend.uwi_email;
        console.log(first[0]);
        console.log(second[0]);
        setEmailChecked(true);
        }
      });
  }


  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
        <img className='form-img' src='/1.png' alt='DCIT Picture' />
        </div>
        {
        !emailChecked ? (
          <FormSignUpEmail checkEmail={checkEmail}/>
        ) : (
          !isSubmitted ? (
            <FormSignup submitForm={submitForm} name={values} />
          ) : (
            <FormSuccess />
          )
        )
        }
      </div>
    </>
  );
}

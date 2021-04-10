// Imported Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

// Imported Components
import FormSignup from '../forms/FormSignup';
import FormSignUpEmail from '../forms/FormSignUpEmail';
import FormSuccess from '../forms/FormSuccess';

// Imported CSS
import '../../App.css';
import '../css/Form.css';

export default function SignUp() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const [values] = useState({
    first_name: '',
    last_name: '',
    uwi_email: '',
    password: '',
    password2: '',
    dob: '',
    type: '',
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

    axios
      .post(
        "/users/add",
        data,
        config
      )
      .then(
        axios
          .post(
            'https://api.chatengine.io/projects/people',
            {
              'username': `${values.uwi_email}`,
              'secret': `${valuesToSend.password}`,
              'first_name': `${values.first_name}`,
              'last_name': `${values.last_name}` },
            { headers: 
              {
                "Private-Key": '6451a947-04bd-4a1f-ad1b-f26ea5f77c3a' 
              }
            }
          )
          .then(
            console.log('User created to ChatEngine.io!')
          )
          .catch(
            error => console.log(error)
          ),
        
        console.log('User created to database!'),
        setIsSubmitted(true),
      )
      .catch(error => console.log(error));
  }

  function checkEmail(valuesToSend) {
    axios
      .get(
        '/users/email/' + valuesToSend.uwi_email,
      )
      .then(
        res => { 
          if (res.data.msg === "User with same username already exist."){
            console.log('User already exists.')
          }
          else {
            const first = valuesToSend.uwi_email.split(".");
            const second = first[1].split("@");
            values.first_name = first[0].charAt(0).toUpperCase() + first[0].slice(1);
            values.last_name = second[0].charAt(0).toUpperCase() + second[0].slice(1);
            values.uwi_email = valuesToSend.uwi_email;
            setEmailChecked(true);
          }
      });
  }

  return (
    <>
      <div className='back'>
        <div className='form-container-signup'>
          <span className='close-btn'><Link to='/'>x</Link></span>
          <div className='form-content-left-register' >
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
      </div>
    </>
  );
}
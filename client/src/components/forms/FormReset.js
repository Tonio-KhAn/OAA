import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import axios from "axios";
import FormReset from '../forms/FormReset';
import { json } from 'body-parser';


export default function Reset() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm(valuesToSend) {
    const data = {
      uwi_email: valuesToSend.uwi_email
    };
    console.log("inside")
    const config = {
      headers: {}
    };

    console.log(data);
    axios
      .post(
        "/users/reset",
        data,
        config
      )
      .then(
        res => console.log(res.data),
        setIsSubmitted(true),
      )
      .catch(err => console.log(err));
    
    
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' src='/1.png' alt='DCIT Picture' />
        </div>
          <FormReset submitForm={submitForm} />
        </div>
    </>
  );
}
import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Form.css';
import FormLogin from '../forms/FormLogin';
import axios from "axios";

export default function Login() {
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' alt='DCIT Picture' />
        </div>
          <FormLogin />
        </div>
    </>
  );
}

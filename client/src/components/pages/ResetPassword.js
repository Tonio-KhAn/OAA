import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import axios from "axios";
import FormReset from '../forms/FormReset';

export default function Reset() {
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' src='/1.png' alt='DCIT Picture' />
        </div>
          <FormReset />
        </div>
    </>
  );
}
// Imported Modules
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Imported Components
import FormSignup from './FormSignup';
import FormSuccess from './FormSuccess';

// Imported CSS
import './css/Form.css';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
    
  }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' alt='DCIT Picture' />
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;

import React from 'react';
import validate from '../validate/validateEmail';
import useForm from '../useForm';
import '../Form.css';

const FormSignUpEmail = ({ checkEmail }) => {
  const { handleChange, handleSubmit, errors, values} = useForm(
    checkEmail,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>UWI email</label>
          <input
            className='form-input'
            type='email'
            name='uwi_email'
            placeholder='Enter your UWI email'
            value={values.uwi_email}
            onChange={handleChange}
          />
          {errors.uwi_email && <p>{errors.uwi_email}</p>}
        </div>
        
        <button className='form-input-btn' type='submit'>
          Continue
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='/login'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignUpEmail;

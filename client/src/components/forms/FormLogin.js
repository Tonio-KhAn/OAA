import React from 'react';
import validate from '../validate/validateLogin';
import useForm from '../useforms/useFormsLogin';
import '../css/Form.css';

const FormLogin = ({ submitForm } ) => {
  const { handleChange, handleSubmit, errors, values } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Welcome back!
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
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Login
        </button>
        <span className='form-input-login'>
          New to DCIT Connect? Sign up <a href='/register'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;

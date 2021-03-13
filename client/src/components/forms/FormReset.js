import React from 'react';
import validate from '../validate/validateEmail';
import useForm from '../useforms/useFormReset';
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
          Forgot password?
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
          Submit
        </button>
        <span className='form-input-login'>
          New to DCIT Connect? Sign up <a href='/register'>here</a>
        </span>
        <span className='form-input-login'>
          Forgot password? Click <a href='/reset'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormLogin;

import React from 'react';
import validate from '../validate/validateEmail';
import useForm from '../useforms/useFormSignup';
import '../css/Form.css';

const FormReset = ({ checkEmail }) => {
  const { handleChange, handleSubmit, errors, values} = useForm(
    checkEmail,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Forgot your passport?
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
          Reset Password
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='/login'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormReset;

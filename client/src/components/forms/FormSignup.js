import React from 'react';
import validate from '../validate/validateInfoSignUp';
import useForm from '../useForm';
import '../Form.css';


const FormSignup = ({ submitForm } ) => {
  const { handleChange, handleSubmit, errors, values } = useForm(
    submitForm,
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
          <label className='form-label'>First name</label>
          <input
            className='form-input'
            type='text'
            name='first_name'
            placeholder='Enter your first name'
            value={values.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p>{errors.first_name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Last name</label>
          <input
            className='form-input'
            type='text'
            name='last_name'
            placeholder='Enter your last name'
            value={values.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p>{errors.last_name}</p>}
        </div>
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
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='/login'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;

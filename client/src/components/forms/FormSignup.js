// Imported Modules
import React from 'react';

// Imported Components
import validate from '../validate/validateInfoSignUp';
import useForm from '../useforms/useFormSignup';

// Imported CSS
import '../css/Form.css';


const FormSignup = ({ submitForm, name }) => {
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
            value={name.first_name}
            
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
            value={name.last_name}
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
            value={name.uwi_email}
            readOnly
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
        <div className='form-inputs'>
          <label className='form-label'>Alternate email</label>
          <input
            className='form-input'
            type='email'
            name='alt_email'
            placeholder='Enter an alternate email'
            value={values.alt_email}
            onChange={handleChange}
          />
          {errors.alt_email && <p>{errors.alt_email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Date of Birth</label>
          <input
            className='form-input'
            type='date'
            name='dob'
            placeholder='Enter your date of birth (yyyy-mm-dd)'
            value={values.dob}
            onChange={handleChange}
          />
          {errors.dob && <p>{errors.dob}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Sex</label>
          <select id="sex" name="sex" form="form" onChange={handleChange}>
            <option value='M'>Male</option>
            <option value='F'>Female</option>
          </select>
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Type</label>
          <select id="type" name="type" form="form" onChange={handleChange}>
            <option value='Student'>Student</option>
            <option value='Alumni'>Alumni</option>
          </select>
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
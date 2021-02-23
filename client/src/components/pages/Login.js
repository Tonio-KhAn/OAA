import '../../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import FormLogin from '../forms/FormLogin';
import axios from "axios";
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';


function Login(props) {
  const [values, setValues] = useState({
    uwi_email: '',
    password: '',
  });
  
    const propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login:PropTypes.func.isRequired
  }

  function submitForm(valuesToSend) {
    const data = {
      uwi_email: valuesToSend.uwi_email,
      password: valuesToSend.password
     
    };
   
    console.log(data);
    props.login(data);
  }
  if (props.isAuthenicated) {
    return <Redirect push to="/profile" />;
    }
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
          <img className='form-img' alt='DCIT Picture' />
        </div>
          <FormLogin submitForm={submitForm}/>
        </div>
    </>
  );
}

const mapStateToProps = state =>({
  isAuthenicated: state.auth.isAuthenticated,
  error:state.error
}); 

const mapDispatchToProps = dispatch => {
  return{
    login: (data) => dispatch(login(data))  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (Login)

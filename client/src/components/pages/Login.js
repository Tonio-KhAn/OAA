import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Form.css';
import FormLogin from '../forms/FormLogin';
import {login} from '../../actions/authActions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';


function Login(props) {

  
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
    <div className='back'>
    <div className='form-container-login'>
        <span className='close-btn'><Link to='/'>x</Link></span>
        <div className='form-content-left'>
        </div>
          <FormLogin submitForm={submitForm}/>
        </div>
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
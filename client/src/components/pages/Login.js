// Imported Modules
import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

// Imported Components
import FormLogin from '../forms/FormLogin';
import {login} from '../../actions/authActions';

// Imported CSS
import '../../App.css';
import '../css/Form.css';

function Login(props) {

  function submitForm(valuesToSend) {
    const data = {
      uwi_email: valuesToSend.uwi_email,
      password: valuesToSend.password
    };

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
(Login);
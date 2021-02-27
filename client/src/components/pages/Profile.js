import React, { useState , useEffect } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import axios from "axios";
import {Link } from 'react-router-dom';

function Profile(props) {

 
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    uwi_email: '',
    password: '',
    password2: '',
    dob: '123456',
    type: 'student',
    alt: null,
    sex: ''
  });

function loadUser(){
  const token = props.auth.token;

  const config = {
    headers: {}
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
  .get(
    "/users/user",
    config
  )
  .then(
    res => { console.log(res.data)
    setValues({
      ...values,
      ["first_name"]: res.data.first_name,
      ["last_name"]: res.data.last_name
    });
    },
  )
  .catch(err => console.log(err));
  };

  useEffect(() => {
    loadUser();
  }, []);
    return (

      <div class= "page">
        <div class= "profile__card card">
          <div>
            <img style ={{width:"180px",height:"160px",borderRadius:"20px"}} 
            src="https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"/>
          </div>
          <div><h2>{values.first_name} {values.last_name}</h2>
            <div class = "profile_content">
              <h5>friends </h5>
              <h5>posts </h5>
              <h5>chat </h5>
            </div>
            <div><p>Graduated in 2018. Software Developer.</p></div>
          </div>
        </div>
<div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
  <Link to='/profile/myPost' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >My Post</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/profile/manageDegrees' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Manage Degree</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/profile/editProfile' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Edit Profile</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/profile/resume' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Upload Resume</button>
    </Link>
  </li>
</ul>
</div>
         </div>


                                                        );
                                                      }


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Profile);
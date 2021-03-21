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
    setValues(res.data);
    },
  )
  .catch(err => console.log(err));
  };

  useEffect(() => {
    loadUser();
  }, []);
    return (

      <div class= "page-back">
      <div class= "page">
        <div class= "profile__card card">
          <div>
            <img alt="user" style ={{width:"180px",height:"160px",borderRadius:"20px"}} 
            src="https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"/>
          </div>
          <div><h2 style={{textTransform: 'capitalize'}} >{values.first_name} {values.last_name}</h2>
          <h4 style={{textTransform: 'capitalize'}} >{values.type}</h4>
          <h6 style={{}} >{values.uwi_email}</h6>
          </div>
        </div>
<div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
  <Link to='/profile/manageDegrees' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Manage Degree</button>
    </Link>
  </li>
  <li class="nav-item">
  <Link to='/profile/posts' className='nav-links'>
    <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >Posts</button>
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
         </div>

                                                        );
                                                      }


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Profile);
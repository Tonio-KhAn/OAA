// Imported Modules
import React, { useState , useEffect } from 'react';
import {connect} from 'react-redux';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

// Imported CSS
import '../../App.css';


function Profile(props) {
  const [profile, setProfile] = useState({
    location:"https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
  });
 
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    uwi_email: '',
    type: '',
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
    res => { 
      console.log('Profile data pulled.')
      setValues(res.data);
    },
  )
  .catch(err => console.log(err));
  }

  function loadProfile(){
    const token = props.auth.token;
  
    const config = {
      headers: {}
    };
  
    if (token) {
      config.headers["x-auth-token"] = token;
    }
  
    axios
    .get(
      "/media/profile",
      config
    )
    .then(
      res => { 
        console.log('Profile picture loaded.')
        if (res.data.location == null){
          console.log('User has no profile picture.')
          setProfile({
            "location": "https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"});
          
        }
        else{
          setProfile({
            "location": res.data.location
          });
        }
      }
    )
    .catch(err => console.log(err));
    }

  useEffect(() => {
    loadUser();
    loadProfile();
  }, []);
  
  return (
    <div class= "page-back">
      <div class= "page">
        <div class= "profile__card card">
          <div>
            <img alt="user" style ={{width:"180px",height:"160px",borderRadius:"20px"}} 
              src={profile.location}/>
          </div>
          <div>
            <h2 className='profilel' >{values.first_name} {values.last_name}</h2>
            <h4 className='occl' >{values.type}</h4>
            <h6 style={{}} >{values.uwi_email}</h6>
          </div>
        </div>
        <div>
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <Link to='/profile/manageDegrees' className='nav-links'>
                <button class="nav-link active " id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >
                  Manage Degrees
                </button>
              </Link>
            </li>
            <li class="nav-item">
              <Link to='/profile/myPosts' className='nav-links'>
                <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >
                  My Posts
                </button>
              </Link>
            </li>
            <li class="nav-item">
              <Link to='/profile/editProfile' className='nav-links'>
                <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >
                  Edit Profile
                </button>
              </Link>
            </li>
            <li class="nav-item">
              <Link to='/profile/resume' className='nav-links'>
                <button class="nav-link active" id="home-tab" data-toggle="tab"  role="tab" aria-controls="home" aria-selected="true" >
                  Upload Resume
                </button>
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
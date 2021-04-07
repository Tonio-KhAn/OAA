import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';


function EditProfile(props) {
    const [profileImg, setProfileImg] = useState({
        location:"https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
      });
    const[image, setImage] = useState(null)
    const handleSingleChange = e =>{
        setImage(e.target.files[0]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        let formdata = new FormData();
        formdata.append("image", image);
       
          const config = {
            headers: {}
          };
          
          console.log(formdata);
          if (token) {
            config.headers["x-auth-token"] = token;
          }
          axios
            .post(
              "/media/profilePic/",
              formdata,
              config
            )
            .then(
              res => { setProfileImg({
                "location": res.data})}
            )
            .catch(err => console.log(err));
          
          
        
      }

      function loadProfilePic(){
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
          res => { console.log(res.data)
            if (res.data.location == null){
              setProfileImg({
                "location": "https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"});
              
            }
            else{
              setProfileImg({
            "location": "../" + res.data.location });
          }
        }
        )
        .catch(err => console.log(err));
        };
 
    useEffect(() => {
        loadProfilePic();
      }, []);

    return (
        <>
<div>

        <br></br>
<form class="test" onSubmit={handleSubmit}>
<img alt="user" style ={{width:"500px",height:"500px",borderRadius:"20px"}} 
            src={profileImg.location}/>
<div>
  <br></br>
  <div class="input-group">
    <input
      type="file"
      class="input100" 
      name="image"
      placeholder='Select Profile Picture'
      onChange={handleSingleChange}>
    
    </input>
  </div>
 
</div>
<br></br>

<br></br>
<div>
<div class="container-contact100-form-btn">
  <div class="wrap-contact100-form-btn">  
  <div class="contact100-form-bgbtn"></div>
  <button class="contact100-form-btn" type='submit'>
    Create
    </button>
    </div>
    </div>          
    </div>
    </form>
<div class="row">
<br></br>
</div>
<div class="row">
<br></br>
</div>
<div class="row">
<br></br>
</div>
</div>
</>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(EditProfile);
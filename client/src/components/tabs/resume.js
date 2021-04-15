import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';


function Resume(props) {
    const [profileImg, setProfileImg] = useState({
        location:""
      });
    const[image, setImage] = useState(null)
    const handleSingleChange = e =>{
        setImage(e.target.files[0]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        let formdata = new FormData();
        formdata.append("pdf", image);
       
          const config = {
            headers: {}
          };
          
          console.log(formdata);
          if (token) {
            config.headers["x-auth-token"] = token;
          }
          axios
            .post(
              "/media/resume/",
              formdata,
              config
            )
            .then(
              res => { setProfileImg({
                "location": res.data})
                alert('Resume uploaded!')
                window.location.href = '/profile';
              }
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
          "/media/resume",
          config
        )
        .then(
          res => { console.log(res.data)
            if (res.data.location == null){
              setProfileImg({
                "location": ""});
              
            }
            else{
              setProfileImg({
            "location": res.data.location });
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
{profileImg.location != '' ? (
<iframe
              width="600"
              height="409"
              src={"http://localhost:8080/" + profileImg.location}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style={{ outline : "none", borderColor : "#7198b8", boxShadow : "0 0 30px #62a3d8", margin: "auto"}}
             
            ></iframe>
) :

(<> </>)
    }
<div>
  <br></br>
  <div class="input-group">
    <input
      type="file"
      class="padtop" 
      name="image"
      placeholder='Select Profile Picture'
      onChange={handleSingleChange}>
    
    </input>
  </div>
 
</div>
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
  )(Resume);
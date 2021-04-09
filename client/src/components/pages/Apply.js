import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';

import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';

function Apply(props) {
    const[ values] = useState(
        {jobtitle: 'IT Manage', company: 'A Company', description:'A Job description goes here'},
    )
    const[ inputFields, setInputFields] = useState([
    ])
    
    function getMedias(){
      const token = props.auth.token;
      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios
      .get(
        "/jobOpportunity/media/"+ props.match.params.id,
        config
      )
      .then(
        res => { console.log(res.data)
          setInputFields(res.data);
        },
      )
      .catch(err => console.log(err));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const token = props.auth.token;
    const data = {
        jobId: props.match.params.id
      };
      
      const config = {
        headers: {}
      };
      
      console.log(data);
      if (token) {
        config.headers["x-auth-token"] = token;
      }
      axios
        .post(
          "/jobApplication/add",
          data,
          config
        )
        .then(
          res => console.log(res.data),
        )
        .catch(err => console.log(err));
      
      
    
  }

  useEffect(() => {
    getMedias();
  }, []);

    return (
     <>
     <div>
     <div class="page" style={{marginTop: "20px"}}>
        <div class="card" style={{ margin : "auto"}}>
          <div>
     <h1 class='firstlabel'><em>{values.jobtitle}</em></h1>
     <h2 class='secondlabel'>{values.company}</h2>
     <p class='thirdlabel'>{values.description}</p>
     </div>
     <br></br>
      <div>
        <form onSubmit={handleSubmit} >
      { inputFields.map((inputField,index) =>(
      <div class="input-group" key={index}>
          <span >{inputField.mediaName}</span>
  <div class="custom-file">
  
    <input type="file" class="custom-file-input" id="inputGroupFile04"></input>
    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
  </div>
</div> 
))}
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Comments:</span>
  </div>
  <textarea class="form-control" aria-label="With textarea"></textarea>

</div>

<div>
          <div class="container-contact100-form-btn">
            <div class="wrap-contact100-form-btn">  
            <div class="contact100-form-bgbtn"></div>
            <button class="contact100-form-btn theme-bgg text-white f-122" type='submit'>
              Apply
              </button>
              </div>
              </div>          
              </div>
          
</form> 
</div>
</div>
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
)(Apply);

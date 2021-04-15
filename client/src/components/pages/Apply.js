import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';

import {Link } from 'react-router-dom';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';

function Apply(props) {
    const[values, setValues] = useState(
        {jobtitle: '', company: '', description:''},
    )
    const[ inputFields, setInputFields] = useState([
    ])

    const[ comment, setComment] = useState('')

    const handleSingleChange = (index,e) =>{
      const value = [...inputFields];
        value[index]["file"] = e.target.files[0];
        setInputFields(value);
  }

  const handleSingleChangeComment = e =>{
    setComment(e.target.value);
}

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
        "/jobOpportunity/media2/"+ props.match.params.id,
        config
      )
      .then(
        res => { console.log(res.data)
          setInputFields(res.data);
        },
      )
      .catch(err => console.log(err));
  }

  function getJobInformation(){
    const token = props.auth.token;
    const config = {
        headers: {}
      };

      if (token) {
        config.headers["x-auth-token"] = token;
      }

    axios
    .get(
      "/jobOpportunity/individual/"+ props.match.params.id,
      config
    )
    .then(
      res => { console.log(res.data)
        setValues(res.data);
      },
    )
    .catch(err => console.log(err));
}

  const handleSubmit = e => {
    e.preventDefault();
    var count=0
    var tempArray =[];
    const token = props.auth.token;
    const data = {
        jobId: props.match.params.id,
        comment:comment,
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
          res => {
            console.log("successful upload")
            inputFields.forEach(file => {
              let formdata2 = new FormData();
              formdata2.append("files", file.file);
              formdata2.append("title", file.mediaName);
              formdata2.append("applicationId", res.data);

              axios
                .post(
                "/media/jobApplication/",
                formdata2,
                config
              )
              .then(
                res => console.log("successful upload")
              )
              .catch(err => console.log(err));
            })
          },
        )
        .catch(err => console.log(err));
      
      
    
  }

  useEffect(() => {
    getJobInformation();
    getMedias();
  }, []);

    return (
     <>
     <div>
     <div class="page" style={{marginTop: "20px"}}>
        <div style={{ margin : "auto"}}>
          <div>
     <h1 class='firstlabel'><em>{values.jobtitle}</em></h1>
     <h2 class='secondlabel'>{values.company}</h2>
     <p class='thirdlabell'>{values.description}</p>
     </div>
     <br></br>
      <div>
        <form onSubmit={handleSubmit} >
      { inputFields.map((inputField,index) =>(
      <div class="input-group" key={index}>
          <span class='thirdlabel'>{inputField.mediaName}:</span>
  

<div class="input-group">
    <input
      type="file"
      class="padtop" 
      name={inputField.mediaName}
      placeholder='Select Profile Picture'
      onChange={(e) => handleSingleChange(index,e)}>
    
    </input>
  </div>
  </div> 
))}
<div class="input-group">
  <div class="input-group-prepend">
    <span class='thirdlabel'>Comments:</span>

  </div>
              <textarea
                class="input100"
                name="description"
                placeholder='Any Additional Comments'
                value={comment}
                onChange={handleSingleChangeComment}>
              </textarea>
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
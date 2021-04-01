import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function JobInfo(props) {
 
    const[ inputFields, setInputFields] = useState([
    ])
    
    const[ jobState, setJobState] = useState(true)

    const[ applicants, setApplicants] = useState([])
    
    const[ applicantsToAdd, setApplicantsToAdd] = useState([])

    function getJobOpportunity() {

      const token = props.auth.token;

      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios
       .get("/jobOpportunity/individual/"+ props.match.params.id, 
            config
            )
            .then(
              res => { console.log(res.data)
              setJobState(res.data.open)
              setApplicants(res.data.applicants)
             },
            )
        .catch(err => console.log(err));

  }

  const handleReviewChange = (index, e) =>{
    const value = [...applicants];
    value[index][e.target.name] = e.target.value;
    setApplicants(value);
    console.log(value);
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
        "/jobApplication/all/"+ props.match.params.id,
        config
      )
      .then(
        res => { console.log(res.data)
          setInputFields(res.data)
        },
      )
      .catch(err => console.log(err));
  }

 
  function close(){
    const token = props.auth.token;
    const config = {
        headers: {}
      };
    const data = null;

      if (token) {
        config.headers["x-auth-token"] = token;
      }
      console.log(config.headers)
    axios
    .put(
      "/jobOpportunity/close/"+ props.match.params.id,
      data,
      config
    )
    .then(
      res => { console.log(res.data)
        setJobState(res.data)
      },
      )
      .catch(err => console.log(err));
  }

  const handleAddCourse = (id, f_name, l_name) => {
    setApplicantsToAdd([...applicantsToAdd, {userID:id, first_name:f_name, last_name:l_name, review:""} ]);
}

const submit = () =>{
  const token = props.auth.token;
  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    const data = applicantsToAdd;
  axios
  .put(
    "/jobOpportunity/successfulApplicants/"+ props.match.params.id,
    data,
    config
  )
  .then(
    res => { console.log(res.data)
      setApplicants(res.data)
    },
  )
  .catch(err => console.log(err));
}

const submitReview = (index , e) =>{
  e.preventDefault();
  const token = props.auth.token;
  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }
    const data = {
      review: applicants,
      index: index,
    }

  axios
  .put(
    "/jobOpportunity/review/"+ props.match.params.id,
    data,
    config
  )
  .then(
    res => { console.log(res.data)
    },
  )
  .catch(err => console.log(err));
}

  useEffect(() => {
    getMedias();
    getJobOpportunity();
  }, []);
    
    if (jobState === true)
    return (
     <>
     <div>
     <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
     <button type="button" class="contact300-form-btn" onClick={() => close()}>Close Job</button>
            <h5 class="card-header">Job Info</h5>
                { inputFields.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <p class="card-text">{inputField.uwi_email}</p>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                    ))}
            </div>
          
</div>

        </>
    )
    else 
    if (applicants.length === 0)
    return(
      <>
      <div>
            <h5 class="card-header">Successful Applicants</h5>
                { applicantsToAdd.map((inputField,index) =>(

                        <h5 key={index} class="card-title" >{inputField.first_name} {inputField.last_name}</h5>
                   
                    ))}
                      {
               applicantsToAdd.length === 0 ? (
               null
                ):(
                  <button type="button" class="contact300-form-btn" onClick={() => submit()}>continue</button>
                )
              }
            <div>

            <h5 class="card-header">All Applicants</h5>
      { inputFields.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <span>
                        <h5 style={{float : 'left'}} class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <button type="button" class="contact300-form-btn" onClick={() => handleAddCourse(inputField.userID,inputField.first_name,inputField.last_name)}>choose applicant</button>
                    </span>
                    </div>
                    ))}
                    </div>
 </div>
 
         </>
    )
    else
    return(
      <>
     <div>
     <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >

            <h5 class="card-header">Review Applicant</h5>
                { applicants.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <form  class="test"  onSubmit={e => submitReview(index, e)} >
          <div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="review"
                placeholder='Review'
                value={inputField.review}
                onChange={e => handleReviewChange(index, e)}>
              </input>
            </div>
            
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnnew' type='submit' >
                    Add
                  </button>
                  </div>
              </form>
                    </div>

                    ))}
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
)(JobInfo);



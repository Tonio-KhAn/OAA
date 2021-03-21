import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';

function RecomendedJobs(props) {

    const[ id , setId] = useState()
    const[ myJobOpportunity, setMyJobOpportunity] = useState([])
    const[ applyiedJobs, setApplyiedJobs] = useState([])

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
          setId(res.data._id);
          getMyJobOpportunity(res.data._id);
          getAppliedJobs(res.data._id)
          console.log(res.data._id);
          },
        )
        .catch(err => console.log(err));
        
    }

    function getMyJobOpportunity(userID) {

        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios.get('/jobOpportunity/'+userID, config)
        .then(
            res => { console.log(res.data)
            setMyJobOpportunity(res.data);
            },
          )
          .catch(err => console.log(err));

    }

    function getAppliedJobs(userID) {

      const token = props.auth.token;

      const config = {
          headers: {}
        };

        if (token) {
          config.headers["x-auth-token"] = token;
        }

      axios.get('/jobOpportunity/applyiedJobs/' + userID, config)
      .then(
          res => { console.log(res.data)
          setApplyiedJobs(res.data)
          },
        )
        .catch(err => console.log(err));

  }

    useEffect(() => {
        loadUser();
        getMyJobOpportunity(id);
      }, []);
    return (
     <>
      <div>

      <div>

<div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '0px'}} >
<h1 class="card-header" style={{fontFamily:"monospace"}}>Jobs</h1>
{ myJobOpportunity.map((job,index) =>(
    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
        <h5 class="card-title" style={{color: "grey"}}>{job.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{job.company}</h6>
        <p class="card-text"  style={{fontFamily:"initial"}}>{job.description}</p>
        <Link to={'/jobs/info/'+ job._id}className='nav-links'><button  class="card-link">go to job</button></Link>
    </div>
    ))}
</div>

<div>

<div class="card" style={{width : "300px", marginTop: '10px'}}>
<h1 class="card-header" style={{fontFamily:"monospace"}}>Applied Jobs</h1>
                    { applyiedJobs.map((applyiedJob,index2) =>(
                    <div class="card-body" key={index2} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h3 class="card-title" style={{color: "grey"}}>{applyiedJob.title}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">{applyiedJob.company}</h6>
                        <a href="#" class="card-link">Read More</a>
                        
                        
                    </div>
                    ))}
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
    )(RecomendedJobs);
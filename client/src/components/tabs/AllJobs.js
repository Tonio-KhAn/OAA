import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function AllJobs(props) {
    const[ jobOpportunity, setJobOpportunity] = useState([])
    
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
        getAppliedJobs(res.data._id)
        console.log(res.data._id);
        },
      )
      .catch(err => console.log(err));
      
  }

    function getJobOpportunity() {

        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios.get('/jobOpportunity/', config)
        .then(
            res => { console.log(res.data)
            setJobOpportunity(res.data);
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
        getJobOpportunity(); 
        loadUser();
      }, []);

    return (
     <> 
     <div >
      <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '0px'}} >
            <h1 class="card-header" style={{fontFamily:"monospace"}}>All Jobs</h1>
                { jobOpportunity.map((job,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h3 class="card-title" style={{color: "grey"}}>{job.title}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">{job.company}</h6>
                        <p class="card-text" style={{fontFamily:"initial"}}>{job.description}</p>
                        <a href="#" class="card-link">Read More</a>
                        <Link to={'/apply/'+ job._id}className='nav-links'><button  class="card-link">Apply</button></Link>
                        
                    </div>
                    ))}
            </div>

                <div style={{margin: "0px"}}>

                <div class="card" style={{width : "300px", marginTop: '55px'}}>
                <button type="button" class="btn btn-primary btn-lg"  style={{marginBottom: '10px'}} >Create Job <i class="fas fa-plus"></i></button>
                </div>

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
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(AllJobs);
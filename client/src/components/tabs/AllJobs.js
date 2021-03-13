import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function AllJobs(props) {

    const[ id , setId] = useState()
    const[ jobOpportunity, setJobOpportunity] = useState([])

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

    useEffect(() => {
        loadUser();
        getJobOpportunity();
      }, []);

    return (
     <> 
      <div>
      <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '50px'}} >
            <h5 class="card-header">Jobs</h5>
                { jobOpportunity.map((job,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{job.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{job.company}</h6>
                        <p class="card-text">{job.description}</p>
                        <Link to={'/apply/'+ job._id}className='nav-links'><button  class="card-link">Apply</button></Link>
                        <a href="#" class="card-link">Read More</a>
                    </div>
                    ))}
            </div>
            
                

                <div>

                <div class="card" style={{width : "300px", marginTop: '55px'}}>
                <button type="button" class="btn btn-primary btn-lg"  style={{marginBottom: '10px'}} >Create Job <i class="fas fa-plus"></i></button>

                <button type="button" class="btn btn-primary btn-lg">Large button</button>
                </div>

                <div class="card" style={{width : "300px", marginTop: '10px'}}>
                <h5 class="card-header">Applied Jobs</h5>
                    <div class="card-body" style={{borderBottom : '2px solid black'}} >
                        <h5 class="card-title">IT Manager</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Company Name</h6>
                        <p class="card-text">Description of Job Here</p>
                        <a href="#" class="card-link">Read More</a>
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
  )(AllJobs);
import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';

function AllJobs(props) {
    const[ jobOpportunity, setJobOpportunity] = useState([])
    
    const[ applyiedJobs, setApplyiedJobs] = useState([])
    
    const[ modalJob, setModalJobs] = useState({
      title: "",
      company:"",
      description:"",
      skills:[],
      degrees:[],
       })
    
    const[ modalSkills, setModalSkills] = useState([])
    
    const[ modalDegrees, setModalDegrees] = useState([])
    
    const[ show, setShow] = useState(false)

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
        getJobOpportunity(res.data._id)
        console.log(res.data._id);
        },
      )
      .catch(err => console.log(err));
      
  }

    function getJobOpportunity(userID) {

        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios.get('/jobOpportunity/allJobs/' + userID, config)
        .then(
            res => { console.log(res.data)
            var tempArray = [];
            var count = 0;
            res.data.forEach(temp =>{
              if (temp.open === true){
                tempArray.push(temp)
              }
            count ++  
            if (count === res.data.length)
            setJobOpportunity(tempArray);
            })
            
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

  function getSkills(jobId) {

    const token = props.auth.token;

    const config = {
        headers: {}
      };

      if (token) {
        config.headers["x-auth-token"] = token;
      }

    axios.get('/jobOpportunity/skills/' + jobId, config)
    .then(
        res => { console.log(res.data)
          setModalSkills(res.data)
        },
      )
      .catch(err => console.log(err));

}

function getDegrees(jobId) {

  const token = props.auth.token;

  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

  axios.get('/jobOpportunity/degrees/' + jobId, config)
  .then(
      res => { console.log(res.data)
        setModalDegrees(res.data)
      },
    )
    .catch(err => console.log(err));

}

  const openModal = (job) =>{
    setModalJobs(job)
    getSkills(job._id)
    getDegrees(job._id)
    setShow(true)
  }

  const closeModal = e =>{
    setShow(false)
  }

    useEffect(() => {
        
        loadUser();
      }, []);

    return (
     <> 
     <div >
     <div >
     
     <Modal show = {show}>
         <Modal.Header>
         <h3 class="card-title" style={{color: "grey"}}>{modalJob.title}</h3>
         <Button onClick={()=> closeModal()}> close</Button>
         
         </Modal.Header>
         <Modal.Body>
         <h6 class="card-subtitle mb-2 text-muted">{modalJob.company}</h6>
                        <p class="card-text" style={{fontFamily:"initial"}}>{modalJob.description}</p>
                        <h4>Requires Skills</h4>
                        {modalSkills.map((skill,index3) =>(
                          <h4 key={index3} style={skill.has ? {color: 'blue'}:{}} >{skill.skillName}{skill.has ? (<i class="fas fa-check"></i>):(null)}</h4>
                          ))}
                          <h4>Requires Degrees</h4>
                        {modalDegrees.map((degree,index4) =>(
                          <h4 key={index4} style={degree.has ? {color: 'blue'}:{}}>{degree.degreeName} {degree.has ? (<i class="fas fa-check"></i>):(null)}</h4>
                          ))}
                        </Modal.Body>
                        <Modal.Footer>
                        <Link to={'/apply/'+ modalJob._id}className='nav-links'><button  class="applybtn">Apply</button></Link>
                        </Modal.Footer>
     </Modal>
    </div>
      <div class="card" style={{float : 'left', width : "800px" , marginRight: '100px', marginLeft: '50px', marginTop: '0px'}} >
            <h1 class="card-header" style={{fontFamily:"monospace"}}>All Jobs</h1>
                {jobOpportunity.map((job,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h3 class="card-title" style={{color: "grey"}}>{job.title}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">{job.company}</h6>
                        <p class="card-text" style={{fontFamily:"initial"}}>{job.description}</p>
                        <Button onClick={()=> openModal(job)}>Read More</Button>
                        <Link to={'/apply/'+ job._id}className='nav-links'><button  class="applybtn">Apply</button></Link>
                        
                    </div>
                    ))}
            </div>

                <div style={{margin: "0px"}}>

                <div class="card" style={{width : "300px", marginTop: '55px'}}>
                <button type="button" class="createbtn"  style={{marginBottom: '10px'}} >Create Job <i class="fas fa-plus"></i></button>
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
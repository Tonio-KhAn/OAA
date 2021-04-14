import React, { useEffect, useState } from 'react';
import '../css/suggestedFriends.css';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";


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
    <div>
    <div >
     
     <Modal show = {show} >
         <Modal.Header>
         <h3 class='biglabel'>{modalJob.title}</h3>
         <button type="label theme-bg text-white f-12" class="label theme-bg text-white f-12"onClick={()=> closeModal()}>X</button>
         
         </Modal.Header>
         <Modal.Body>
                        <h6 className='skillsetclabel'>Requires Skills:</h6>
                        {modalSkills.map((skill,index3) =>(
                          <h6 className='options ital' key={index3} style={skill.has ? {color: 'green'}:{}} >{skill.skillName}{skill.has ? (<i class="fas fa-check-circle"></i>):(null)}</h6>
                          ))}
                          <h6 className='skillsetclabel'>Requires Degrees:</h6>
                        {modalDegrees.map((degree,index4) =>(
                          <h6 className='options ital' key={index4} style={degree.has ? {color: 'green'}:{}}>{degree.degreeName} {degree.has ? (<i class="fas fa-check-circle"></i>):(null)}</h6>
                          ))}
                          <div>
                        <Link to={'/apply/'+ modalJob._id}>

                                              <button className="btnlabell theme-bgg text-white f-122">
                                                 Apply</button></Link>
                                                </div>
                        </Modal.Body>
     </Modal>
    </div>
     <div class='page'>
       <Aux>
         <Row>
           <Col md={6} xl={8}>
                        <Card className='Recent-Users mar'>
                            <Card.Header>
                                <Card.Title as='h5'><i class="fas fa-list"></i> All Jobs</Card.Title>
                            </Card.Header>
                            {jobOpportunity.map((job,indexJob) =>(
                            <Card.Body key={indexJob} className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>
                                             <dt className="cl-sm-3">Job:</dt>
                                             <dd className="cl-sm-3"><em>{job.title}</em></dd>
        
                                             
                                             <dt className="cl-sm-3"> Company:</dt>
                                             <dd className="cl-sm-3"><em>{job.company}</em></dd>
                                             
                                             <dt className="cl-sm-3"> Description:</dt>
                                             <dd className="cl-sm-3"><em>{job.description}</em></dd>
                                             
                                             <div class="container-contact200-form-btn">
                                               <div class="wrap-contact100-form-btn">
                                                 <div class="contact100-form-bgbtn"></div>  
                                                 <button class="contact100-form-btn theme-bgg text-white f-122" onClick={()=> openModal(job)}>
                                                  Read More
                                                        </button>
                                                      </div>
                                                    <div class="wrap-contact100-form-btn">  
                                                  <div class="contact100-form-bgbtn"></div>
                                                  <Link to={'/apply/'+ job._id}>
                                                <p><button class="contact100-form-btn theme-bgg text-white f-122">
                                                       Apply
                                                      </button></p>
                                                      </Link>
                                                    </div>
                                                  </div>
                                        </td>

                                        </tr>
                                    </tbody>
                                </Table>
                              </Card.Body>
                            
                          ))}
                        </Card>
                        
                    </Col>
                    
                    <Col md={6} xl={4}>
                      <Card className='card-event'>
                            <Card.Body>
                            <Link to='/jobscreate'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-plus"></i> Create Job</button></Link>  
                              
                            <Link to='/my'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="far fa-bookmark"></i> My Jobs</button></Link>
                            
                            
                            </Card.Body></Card>
                        <Card className='card-event'> <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Applied Jobs</h5>
                                        
                                    </div>
                                    
                                    <div className="col-auto">
                                    <i class="fas fa-paper-plane"></i>
                                    </div>
                                </div>
                                
                                { applyiedJobs.map((applyiedJob,index2) =>(
                                <div class="border-bottom">
                                <h4 className="cl-sm-3"><sub className="cl-sm-3">Title: <em>{applyiedJob.title}</em></sub></h4>
                                <h5 className="cl-sm-3"><sub className="cl-sm-3">Company: <em>{applyiedJob.company}</em></sub></h5>
                                    </div>
                                ))}
                            </Card.Body>
                            
                        </Card>
                    </Col>
                    
                    </Row>
            </Aux>
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
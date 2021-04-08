import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import '../css/CreateJobs.css';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";

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
     <div class='page'>
       <Aux>
         <Row>
           <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'><i class="far fa-bookmark"></i> My Jobs</Card.Title>
                            </Card.Header>
                            { myJobOpportunity.map((job,index) =>(
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td>
                                             <dt className="cl-sm-3"> Title:</dt>
                                             <dd className="cl-sm-3"><em>{job.title}</em></dd>
        
                                             
                                             <dt className="cl-sm-3"> Company:</dt>
                                             <dd className="cl-sm-3"><em>{job.company}</em></dd>
                                             
                                             <dt className="cl-sm-3"> Description:</dt>
                                             <dd className="cl-sm-3"><em>{job.description}</em></dd>
                                            <p className="mm-h"><a href="#" class="card-link">Read More</a></p>
                                            <p> <Link to={'/info/'+ job._id}className='nav-links'>
                                              <button className="btnlabell theme-bgg text-white f-122">
                                                <i class="fas fa-envelope-open-text"></i> Go to Job</button></Link></p>
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
                            <Card.Body><Link to='/all'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-list"></i> All Jobs</button></Link>
                            
                            <Link to='/jobscreate'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="fas fa-plus"></i> Create Job</button></Link>
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
                                <h2 className="mt-2 f-w-300"><sub className="text-muted f-14">Title: {applyiedJob.title}</sub></h2>
                                <h5 className="text-muted mt-3 f-w-300">Company: {applyiedJob.company}</h5>
                                <h6><span className='text-muted mt-3 f-w-300'><a href="#" class="card-link">Read More...<br></br></a></span></h6>
                                    </div>
                                ))}
                            </Card.Body>
                            
                        </Card>
                    </Col>
                    
                    </Row>
            </Aux>
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
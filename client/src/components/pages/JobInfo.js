import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button} from 'react-bootstrap';
import '../css/suggestedFriends.css';
import Aux from "../../hoc/_Aux";
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
       <br></br>
     <div class="card" style={{width : "800px" , margin: "0 auto"}} >
            <h5 class="card-header">Applicant Info</h5>
                { inputFields.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <p class="card-text">{inputField.uwi_email}</p>
                        
                        <centre><button type="button" class="applybtn" onClick={() => close()}>Close Job</button>
                        </centre>
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
            <Aux>
            <div className='page'>
                <Row>
                    <Col>
                    
                        <Card class='carddd'>
                                <div class='biglabel'>Successful Applicants</div>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    { applicantsToAdd.map((inputField,index) =>(
                                    <tbody>
                                    <tr>
                                        <td class='counterCell'></td>
                                        <td>{inputField.first_name}</td>
                                        <td>{inputField.last_name}</td>
                                        <td>
                                          <button className="label theme-bg text-white f-12" onClick={() => submit()}>Review Applicant <i class="fas fa-pencil-alt"></i> 
                                    </button>
                                    </td>
                                    </tr>
                                    </tbody>     
                            
                            ))}
                                </Table>
                            </Card.Body>
                        </Card>
                            </Col>
                            </Row>
                            </div>
                            </Aux>
            <Aux>
            <div className='page'>
                <Row>
                    <Col>
                    
                        <Card class='carddd'>
                                <div class='biglabel'>All Applicants</div>
                            <Card.Body>
                                <Table responsive hover>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    { inputFields.map((inputField,index) =>( 
                                    <tbody>
                                    <tr>
                                        <td class='counterCell'></td>
                                        <td>{inputField.first_name}</td>
                                        <td>{inputField.last_name}</td>
                                        <td>
                                                    <button className="label theme-bg text-white f-12" onClick={() => handleAddCourse(inputField.userID,inputField.first_name,inputField.last_name)}>
                                                    Choose Applicant <i class="fas fa-plus"></i>
                                                    </button>
                                    </td>
                                    </tr>
                                    </tbody>     
                            
                            ))}
                                </Table>
                            </Card.Body>
                        </Card>
                            </Col>
                            </Row>
                            </div>
                            </Aux>
            
         </>
    )
    else
    return(
      <>
     <div>
     <br></br>
     <div class="card" style={{width : "800px" , margin: "0 auto"}} >
            <h5 class="card-header">Review Applicant</h5>
                { applicants.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <form onSubmit={e => submitReview(index, e)} >
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
            <br></br>
            <div class="wrap-contact100-form-btn">
                  <button className='contact300-form-btn' type='submit' >
                    Review
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

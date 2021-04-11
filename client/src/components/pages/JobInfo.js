import React, { useState, useEffect } from 'react';
import {Row, Col, Card, Table, Tabs, Tab, Button, Modal} from 'react-bootstrap';
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

    const[ modalSkills, setModalSkills] = useState([])
    
    const[ modalDegrees, setModalDegrees] = useState([])

    const[ documents, setDocuments] = useState([])

    const [resume, setResume] = useState({
      location: null
    });

    const[ modalInfo, setModalInfo] = useState({
      first_name:'',
      last_name: '',
      uwi_email: '',
      type:'',
      sex:'',
      dob:'',
      comment:''
    })

    const[ show, setShow] = useState(false)


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
function loadResume(userId){
  const token = props.auth.token;

  const config = {
    headers: {}
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  axios
  .get(
    "/media/resume2/"+userId,
    config
  )
  .then(
    res => { console.log(res.data)
      if (res.data.location == null){
        setResume({
          "location": null});
        }
      else{
        setResume({
      "location": res.data.location });
    }
  }
  )
  .catch(err => console.log(err));
  };

function getDegrees(userId) {

  const token = props.auth.token;

  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }
 
  axios.get('/jobOpportunity/degrees2/' + props.match.params.id +'/'+ userId, config)
  .then(
      res => { console.log(res.data)
        setModalDegrees(res.data)
      },
    )
    .catch(err => console.log(err));

}

function getSkills(userId) {

  const token = props.auth.token;

  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

  axios.get('/jobOpportunity/skills2/' + props.match.params.id +'/'+ userId, config)
  .then(
      res => { console.log(res.data)
        setModalSkills(res.data)
      },
    )
    .catch(err => console.log(err));

}

function getDocuments(applicationId) {

  const token = props.auth.token;

  const config = {
      headers: {}
    };

    if (token) {
      config.headers["x-auth-token"] = token;
    }

  axios.get('/media/document/' + applicationId, config)
  .then(
      res => { console.log(res.data)
        setDocuments(res.data)
      },
    )
    .catch(err => console.log(err));

}

const openModal = (applicant) =>{
  getDegrees(applicant.userID)
  getSkills(applicant.userID)
  getDocuments(applicant._id)
  loadResume(applicant.userID)
  setModalInfo(applicant)
  setShow(true)
}

const closeModal = e =>{
  setShow(false)
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
            <h5 class="card-header">Applicants Info</h5>
                { inputFields.map((inputField,index) =>(
                    <div class="card-body" key={index} style={{borderBottom : '2px solid black', marginTop: '10px'}} >
                        <h5 class="card-title">{inputField.first_name} {inputField.last_name}</h5>
                        <p class="card-text">{inputField.uwi_email}</p>
                        <Button onClick={()=> openModal(inputField)}>Read More</Button>
                       
                    </div>
                    ))}
                     <centre><button type="button" class="applybtn" onClick={() => close()}>Close Job</button>
                        </centre>
            </div>
            </div>
            <Modal show = {show} size="lg">
         <Modal.Header>
         <h3 class="card-title" style={{color: "grey", textTransform: "capitalize"}}>{modalInfo.first_name} {modalInfo.last_name}</h3>
         <Button onClick={()=> closeModal()}> close</Button>
         
         </Modal.Header>
         <Modal.Body>
         <h6 class="card-subtitle mb-2 text-muted">{modalInfo.uwi_email}</h6>
         <h4 class="card-subtitle mb-2 text-muted" style={{color: 'black', textTransform: "capitalize"}}>{modalInfo.type}</h4>
         <h6 class="card-subtitle mb-2 text-muted">date-of-birth: {modalInfo.dob}</h6>
         <h6 class="card-subtitle mb-2 text-muted">sex: {modalInfo.sex}</h6>
         <h6 class="card-subtitle mb-2 text-muted">Additional Comments: {modalInfo.comment}</h6>
                        <p class="card-text" style={{fontFamily:"initial"}}></p>
                        <h4>Degree</h4>
                        {modalDegrees.map((degree,index4) =>(
                          <h6 key={index4} style={degree.has ? {color: 'green'}:{}}>{degree.degreeName} {degree.has ? (<i class="fas fa-check-circle"></i>):(null)}</h6>
                          ))}
                           <h4>Skills</h4>
                        {modalSkills.map((skill,index3) =>(
                          <h6 key={index3} style={skill.has ? {color: 'green'}:{}} >{skill.skillName}{skill.has ? (<i class="fas fa-check-circle"></i>):(null)}</h6>
                          ))}
                          { resume.location != null ? (
                            <div>
                        <h4>Resume</h4>
                        <iframe
              width="727"
              height="409"
              src={"http://localhost:8080/" + resume.location}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              style={{ outline : "none", borderColor : "#7198b8", boxShadow : "0 0 30px #62a3d8", margin: "auto"}}
             
            ></iframe>
            {documents.map((document,index4) =>(
              <div>
                           <h4>{document.title}</h4>
                           <iframe
                 width="727"
                 height="409"
                 src={"http://localhost:8080/" + document.location}
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowfullscreen
                 style={{ outline : "none", borderColor : "#7198b8", boxShadow : "0 0 30px #62a3d8", margin: "auto"}}
                
               ></iframe>
               </div>
                          ))}
            </div>
            ):(<></>)
            }
                        </Modal.Body>
                        <Modal.Footer>
                        </Modal.Footer>
     </Modal>

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

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';

// Imported Components
import Aux from "../../hoc/_Aux";

import '../css/CreateJobs.css';

function CreateJobs(props) {
    const[ id , setId] = useState()

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
          setId(res.data.id);
          },
        )
        .catch(err => console.log(err));
        }

      
    const[ jobInfo, setJobInfo] = useState(
        {title: '',
         Company: '',
         description: '',
        }, 
    )

    const[ inputFields, setInputFields] = useState([])
    const[ qualifications, setQualifications] = useState([
    ])

    const[ qualificationValue, setqualificationValue] = useState("no change")
    
    
    const[ skillsList, setSkillsList] = useState([
    ])

    const[ degreesList, setDegreesList] = useState([
    ])

    const[ degrees, setDegrees] = useState([
    ])
    
    const[ degreeValue, setDegreeValue] = useState("no change")

    function getDegrees(){
        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios
        .get(
          "/degreeName/",
          config
        )
        .then(
          res => { console.log(res.data)
          setDegreesList(res.data);
          },
        )
        .catch(err => console.log(err));
    }

    function getSkills(){
        const token = props.auth.token;

        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios
        .get(
          "/skillName/",
          config
        )
        .then(
          res => { console.log(res.data)
          setSkillsList(res.data);
          },
        )
        .catch(err => console.log(err));
    }

    const handleAdd = () => {
        setInputFields([...inputFields, {name:'', type:''} ])
    }
    
    
    const handleQualificationAdd = () => {
        console.log(qualifications)
        console.log(qualificationValue)
        if (qualificationValue === "no change"){
            setQualifications([...qualifications, {name: skillsList[0].name} ]) 
        }else{
                    setQualifications([...qualifications, {name: qualificationValue} ])
        }
        
        console.log(qualifications)
    }

    const handleQualificationChange = e => {
        
        setqualificationValue(e.target.value);
        console.log(qualificationValue)
    }

    const handleDegreeAdd = () => {
        
        console.log(degrees)
        console.log(degreeValue)
        
        if (degreeValue === "no change"){
            setDegrees([...degrees, {id: degreesList[0]._id, name: degreesList[0].name} ]) 
        }else{
            degreesList.forEach(degreeSingle => {
                if (degreeValue === degreeSingle._id){
                    setDegrees([...degrees, {id: degreeValue, name: degreeSingle.name} ])
                }
            })
        
        }
        console.log(degrees)
    }

    const handleDegreeChange = e => {
        
        setDegreeValue(e.target.value);
        console.log(degreeValue)
        console.log(degreesList)
    }
    
    const handleRemove = (index) => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    
    const handleSingleChange = e =>{
        setJobInfo({
            ...jobInfo,
            [e.target.name]: e.target.value
          });
    }
 
    const handleDocumentChange = (index, e) =>{
        const value = [...inputFields];
        value[index][e.target.name] = e.target.value;
        setInputFields(value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        const data = {
            id: id,
            title :jobInfo.title,
            company : jobInfo.company,
            description: jobInfo.description,
            documents: inputFields,
            skills: qualifications,
            degrees: degrees,
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
              "/jobOpportunity/add",
              data,
              config
            )
            .then(
              res => {
                console.log('Job opportunity created!')
                alert('Job opportunity created!')
                window.location.href = 'http://localhost:3000/my';
              }
            )
            .catch(err => console.log(err));
          
          
        
      }

      useEffect(() => {
        loadUser();
        getDegrees();
        getSkills();
      }, []);

    return (
        <>
        
        <br></br>
        <br></br>

        
    <div class='page'>
      <Aux>
        <Row>
          <Col md={6} xl={8}>
            <Card className='Recent-Users mar'>
              <Card.Header>
                <Card.Title class='biglabel'><i class="fas fa-pencil-alt"></i> Create A New Job Post!</Card.Title>
              </Card.Header>
              <Card.Body className='px-0 py-2'>
              <form class="page" onSubmit={handleSubmit}>
          <div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="title"
                placeholder='Title of the job'
                value={jobInfo.title}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="company"
                placeholder='Name of company'
                value={jobInfo.company}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <div class="input-group">
              <textarea
                class="input100"
                name="description"
                placeholder='Description of job'
                value={jobInfo.description}
                onChange={handleSingleChange}>
              </textarea>
            </div>
          </div>
          <br></br>
          <div>
            { inputFields.map((inputField,index) =>(
            <div class="input-group" key={index}>
              <input type="text"
                class="input100"
                name="name"
                placeholder="Document name"
                value ={inputField.name}
                onChange={e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm">
              </input>
              <input
                type="text"
                class="input100"
                placeholder="Document type"
                name="type"
                value ={inputField.type}
                onChange={ e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm">
              </input>
              <div class="container-contact200-form-btn">

          <div class="wrap-contact100-form-btn">
						<div class="contact100-form-bgbtn"></div>
						<button class="contact100-form-btn theme-bgg text-white" type="button"onClick={() => handleRemove(index)}>
							Remove
						</button>
					</div>
          
				</div>
            </div>
            ))}
            <div class="wrap-contact100-form-btn">
						<div class="contact100-form-bgbtn"></div>
            <button class="contact100-form-btn theme-bgg text-white" type="button"onClick={() => handleAdd()}>
							Add Document
						</button>
					</div>
            
          </div>
          <br></br>
          { degrees.map((degree,index) =>(
            <div key={index}>
              <h5>{degree.name}</h5></div>   
          ))}
          <div class="input-group mb-3">
            <select class="selector" name="qualificationSelect" id="" onChange={handleDegreeChange}>
              { degreesList.map((degreeList,index) =>(
              <option key={index} value={degreeList._id}>{degreeList.name}</option>
              ))}              
            </select>
            
            <div class="sel">
              <button class="btnnew" type="button" onClick={() => handleDegreeAdd()}>Add Required Degree</button>
            </div>
          </div>
          { qualifications.map((qualification,index) =>(
            <div key={index}>
              <h5>{qualification.name}</h5></div>
          ))}
          <div class="input-group mb-3">
            
          <select class="selector" name="qualificationSelect" id="" onChange={handleQualificationChange}>
              { skillsList.map((skillList,index) =>(
              <option key={index} value={skillList.name}>{skillList.name}</option>           
              ))}
            </select>
            <div class="sel">
              <button class="btnnew" type="button" onClick={() => handleQualificationAdd()}>Add Required Skill</button>
            </div>
          </div>        
          <div>
          <div class="container-contact100-form-btn">
            <div class="wrap-contact100-form-btn">  
            <div class="contact100-form-bgbtn"></div>  
            <button class="contact100-form-btn theme-bgg text-white f-122" type='submit'>
              Create  
              </button>
              </div> 
              </div>          
              </div>        
              </form>
        </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className='card-event'>
              <Card.Body>
              <Link to='/all'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="far fa-folder-open"></i> All Jobs</button></Link>  
                              
                            <Link to='/my'> 
                            <button className="btnlabel theme-bgg text-white f-122">
                            <i class="far fa-bookmark"></i> My Jobs</button></Link>
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
)(CreateJobs);
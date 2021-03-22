import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

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

    const[ inputFields, setInputFields] = useState([
        {name:'', type:''} 
    ])
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
        setInputFields([...inputFields, {firstname:'', lastName:''} ])
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
              res => console.log(res.data),
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
        <form class="test" onSubmit={handleSubmit}>
          <div>
            <br></br>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Job Title</span>
              </div>
              <input
                type="text"
                class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                name="title"
                placeholder='Title of the job'
                value={jobInfo.title}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-lg">Company Name</span>
              </div>
              <input
                type="text"
                class="form-control" aria-label="Medium" aria-describedby="inputGroup-sizing-sm"
                name="company"
                placeholder='Name of company'
                value={jobInfo.company}
                onChange={handleSingleChange}>
              </input>
            </div>
            <br></br>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">Description</span>
              </div>
              <textarea
                class="form-control" aria-label="With textarea"
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
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-lg">Document Name</span>
              </div>
              <input type="text"
                class="form-control"
                name="name"
                value ={inputField.name}
                onChange={e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm">
              </input>
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-lg">Document Type</span>
              </div>
              <input
                type="text"
                class="form-control"
                name="type"
                value ={inputField.type}
                onChange={ e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm">
              </input>
              <button type="button" class="btn btn-danger" onClick={() => handleRemove(index)}>Remove</button>
            </div>
            ))}
          <button type="button" class="btn btn-success" onClick={() => handleAdd()}>Add Document</button>
          </div>
          <br></br>
          { degrees.map((degree,index) =>(
            <div key={index}>
              <h5>{degree.name}</h5></div>   
          ))}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-success" type="button" onClick={() => handleDegreeAdd()}>Add Required Degree</button>
            </div>
            <select class="custom-select" name="qualificationSelect" id="" onChange={handleDegreeChange}>
              { degreesList.map((degreeList,index) =>(
              <option key={index} value={degreeList._id}>{degreeList.name}</option>
              ))}              
            </select>
          </div>
          { qualifications.map((qualification,index) =>(
            <div key={index}>
              <h5>{qualification.name}</h5></div>
          ))}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-success" type="button" onClick={() => handleQualificationAdd()}>Add Required Skill</button>
            </div>
            <select class="" name="qualificationSelect" id="" onChange={handleQualificationChange}>
              { skillsList.map((skillList,index) =>(
              <option key={index} value={skillList.name}>{skillList.name}</option>           
              ))}
            </select>
          </div>
          <div>
            <button class="btn btn-primary"  type='submit'>Create</button>
          </div>
        </form>
      </>
    )
  }

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
  mapStateToProps,
)(CreateJobs);
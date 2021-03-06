import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import '../css/CreateJobs.css';

function JobAdd({setSet} , props) {

    const handleClick = () => {
        setSet(0);
     }

    const[ id , setId] = useState()
   
    const[ jobInfo, setJobInfo] = useState(
        {
         id:'',
         title: '',
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

        const config = {
            headers: {}
          };

          

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

        const config = {
            headers: {}
          };

          

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
        const data = {
            id: jobInfo.id,
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

          axios
            .post(
              "/jobOpportunity/add",
              data,
              config
            )
            .then(
              res => { console.log("Job added.")
                alert('Job added.')
                window.location.href = '/admin/job';
              },
            )
            .catch(err => console.log(err));
          
          
        
      }

      useEffect(() => {
        getDegrees();
        getSkills();
      }, []);

    return (
        <>
         
        <br></br>
        <br></br>
        <form class="page" onSubmit={handleSubmit}>
          <div>
          <button className='btnneww' onClick={e => handleClick()}> 
                            Back Again
                            </button>
          <div class="input-group">
              <input
                type="text"
                class="input100"
                name="id"
                placeholder='id of user'
                value={jobInfo.id}
                onChange={handleSingleChange}>
              </input>
            </div>
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
						<button class="contact100-form-btn"onClick={() => handleRemove(index)}>
							Remove
						</button>
					</div>
          <div class="wrap-contact100-form-btn">
						<div class="contact100-form-bgbtn"></div>
            <button class="contact100-form-btn"onClick={() => handleAdd()}>
							Add Document
						</button>
					</div>
				</div>
            </div>
            ))}
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
            <button class="contact100-form-btn" type='submit'>
              Create  
              </button>
              </div> 
              </div>          
              </div>        
              </form>
        
        <br></br>
        
        <br></br>
      </>
    )
  }

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
  mapStateToProps,
)(JobAdd);
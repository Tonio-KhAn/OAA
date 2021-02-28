import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

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
        };

    const[ jobInfo, setJobInfo] = useState(
        {title: '',
         Company: '',
         description: '',
        }, 
    )

    const[ inputFields, setInputFields] = useState([
        {name:'test1', type:''}, 
        {name:'test2', type:''}, 
    ])
    const[ Qualifications, setQualifications] = useState([
        {name:''}, 
    ])

    const[ qualificationValue, setqualificationValue] = useState("networking")

    const handleAdd = () => {
        setInputFields([...inputFields, {firstname:'', lastName:''} ])
    }
    
    
    const handleQualificationAdd = () => {
        console.log(Qualifications)
        console.log(qualificationValue)
        setQualifications([...Qualifications, {name: qualificationValue} ])
        console.log(Qualifications)
    }

    const handleQualificationChange = e => {
        
        setqualificationValue(e.target.value);
        console.log(qualificationValue)
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
      }, []);

    return (
     <>
       
        <form onSubmit={handleSubmit}>
        <div>
        <div class="input-group input-group-lg">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-lg">Job Title</span>
  </div>
  <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" name="title" value={jobInfo.title} onChange={handleSingleChange}></input>
</div>
<br></br>
<div class="input-group input-group-lg">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-lg">Company Name</span>
  </div>
  <input type="text" class="form-control" aria-label="Medium" aria-describedby="inputGroup-sizing-sm" name="company" value={jobInfo.company} onChange={handleSingleChange}></input>
</div>

<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Description</span>
  </div>
  <textarea class="form-control" aria-label="With textarea" name="description" value={jobInfo.description} onChange={handleSingleChange}></textarea>
</div>
        </div>
        <div>
        { inputFields.map((inputField,index) =>(
            <div class="input-group input-group-lg" key={index}>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Document Name</span>
                </div>
            <input type="text" class="form-control" name="name" value ={inputField.name} onChange={e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Document Type</span>
                </div>
            <input type="text" class="form-control" name="type" value ={inputField.type} onChange={ e => handleDocumentChange(index, e)} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <button type="button" class="btn btn-primary btn-sm" onClick={() => handleRemove(index)}>Remove</button>
            </div>
        ))}
         <button type="button" class="btn btn-primary btn-sm" onClick={() => handleAdd()}>Add</button>

        </div>
        { Qualifications.map((Qualifications,index) =>(
            <div key={index} 
            ><h5>{Qualifications.name}</h5></div>
           
        ))}
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button" onClick={() => handleQualificationAdd()}>ADD</button>
                </div>
                <select class="custom-select" name="qualificationSelect" id="" onChange={handleQualificationChange}>
                <option value="networking">networking</option>
                <option value="python">python</option>
                <option value="java">java</option>
  </select>
</div>
<div>
        <button class="btn btn-outline-secondary"  type='submit'>Create</button>
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

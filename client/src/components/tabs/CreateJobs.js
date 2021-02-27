import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';

function CreateJobs() {

    const[ inputFields, setInputFields] = useState([
        {name:'', type:''}, 
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
    return (
     <>
        <div>
        <form>
        <div class="input-group input-group-lg">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-lg">Job Title</span>
  </div>
  <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
</div>
<br></br>
<div class="input-group input-group-lg">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-lg">Company Name</span>
  </div>
  <input type="text" class="form-control" aria-label="Medium" aria-describedby="inputGroup-sizing-sm"></input>
</div>

<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Description</span>
  </div>
  <textarea class="form-control" aria-label="With textarea"></textarea>
</div>
        </form>
        </div>
        <form>
        { inputFields.map((inputField,index) =>(
            <div class="input-group input-group-lg" key={index}>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Document Name</span>
                </div>
            <input type="text" class="form-control" value ={inputField.name} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Document Type</span>
                </div>
            <input type="text" class="form-control" value ={inputField.type} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <button type="button" class="btn btn-primary btn-sm" onClick={() => handleRemove(index)}>Remove</button>
            </div>
        ))}
         <button type="button" class="btn btn-primary btn-sm" onClick={() => handleAdd()}>Add</button>

        </form>
         
        <form>
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

        </form>

        <div>
        <button class="btn btn-outline-secondary" type="button" onClick={() => handleQualificationAdd()}>Create</button>
        </div>

        </>
    )
}

export default CreateJobs

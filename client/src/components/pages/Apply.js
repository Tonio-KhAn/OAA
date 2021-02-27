import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';

function Apply() {
    const[ values, setValues] = useState(
        {jobtitle: 'IT Manage', company: 'A Company', description:'A Job description goes here'},
    )
    const[ inputFields, setInputFields] = useState([
        {name: "birth paper", type: ".php"},
        {name: "grades", type: ".php"},
    ])

    return (
     <>
     <div>
     <h1>{values.jobtitle}</h1>
     <h2>{values.company}</h2>
     <p>{values.description}</p>
     </div>
     <br></br>
      <div>
        <form>
      { inputFields.map((inputField,index) =>(
      <div class="input-group" key={index}>
          <span >{inputField.name}</span>
  <div class="custom-file">
  
    <input type="file" class="custom-file-input" id="inputGroupFile04"></input>
    <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
  </div>
</div> 
))}
<div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text">Additional Coomments</span>
  </div>
  <textarea class="form-control" aria-label="With textarea"></textarea>
</div>
<button className='form-input-btn' type='submit'>
         Apply
          </button>
</form> 
</div>

        </>
    )
}

export default Apply

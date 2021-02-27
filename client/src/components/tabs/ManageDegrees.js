import React, { useState } from 'react';
import '../../App.css';
import axios from 'axios';

function ManageDegrees() {
    const[ inputFields, setInputFields] = useState([
    ])

    const[ degreeInfos, setDegreeInfos] = useState([
        {name: "Information Technology Special"}
    ])

    const[ courses, setCourses] = useState([
    ])

    const[ adding, setAdding] = useState(false)

    const handleAdd = () => {
        setInputFields([...inputFields, {name:'', status:'',startYear:''} ]);
        setAdding(true)
    }

    const handleAddCourse = () => {
        setCourses([...courses, {name:''} ]);
    }

    const handleRemoveCourses = (index) => {
        const values = [...courses];
        values.splice(index, 1);
        setCourses(values);
    }
    const handleCancel = () => {
        const values = [];
        setInputFields(values);
        setAdding(false)
    }
    return (
     <>
   <div>
       Manage degrees
       { degreeInfos.map((degreeInfo,index) =>(
      <div class="input-group" key={index}>
      <h4>{degreeInfo.name}</h4>
</div> 
))}
       
        { inputFields.map((inputField,index) =>(
            <form key={index}>
            <div class="input-group input-group-lg" >
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Degree Name</span>
                </div>
            <input type="text" class="form-control" value ={inputField.name} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Status</span>
                </div>
            <input type="text" class="form-control" value ={inputField.status} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Start Year</span>
                </div>
            <input type="text" class="form-control" value ={inputField.startYear} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
            { courses.map((course,indexCourses) =>(
            <div class="input-group input-group-lg" key={indexCourses} >
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">CourseName</span>
                </div>
            <input type="text" class="form-control" value ={course.name} aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            <button type="button" class="btn btn-primary btn-sm" onClick={() => handleRemoveCourses(indexCourses)}>Remove</button>
            </div>
         ))}
         <button type="button" class="btn btn-primary btn-sm" onClick={() => handleAddCourse()}>Add Course</button>
            <button className='form-input-btn' type='submit'>
          ADD DEGREE
        </button>
            </form>
        ))}
        {
        !adding ? (
        <button type="button" class="btn btn-primary btn-sm" onClick={() => handleAdd()}>Add</button>
        ):
        <button type="button" class="btn btn-primary btn-sm" onClick={() => handleCancel()}>Cancel</button>
        }
         

        
   </div>
        </>
    )
}

export default ManageDegrees

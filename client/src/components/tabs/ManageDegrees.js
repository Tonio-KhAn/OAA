import React, { useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

function ManageDegrees(props) {
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
          setId(res.data._id);
          getDegrees(res.data._id);
          },
        )
        .catch(err => console.log(err));
        };



        const[ inputFields, setInputFields] = useState([])

    const[ degreeInfos, setDegreeInfos] = useState([])
    const[ degreeNames, setDegreeNames] = useState([])

    const[ courses, setCourses] = useState([
    ])

    const[ degreesList, setDegreesList] = useState([
    ])

    const[ adding, setAdding] = useState(false)

    function getDegrees(Userid){
        const token = props.auth.token;
        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }

        axios
        .get(
          "/qualification/"+ Userid,
          config
        )
        .then(
          res => { console.log(res.data)
          setDegreeInfos(res.data);
          getMyDegreeNames(res.data);
          },
        )
        .catch(err => console.log(err));
    }

    function getMyDegreeNames(degreeFromCall){
        const token = props.auth.token;
        const temp = [];
        const config = {
            headers: {}
          };

          if (token) {
            config.headers["x-auth-token"] = token;
          }
        degreeFromCall.forEach(degreeHere => {
        axios
        .get(
          "/degreeName/"+ degreeHere.degreeID,
          config
        )
        .then(
          res => { console.log(res.data)
          temp.push(res.data)
          console.log(temp)
          },
        )
        .catch(err => console.log(err));
        })
        setDegreeNames(temp);
    }

    
    function getDegreesList(){
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

    const handleAdd = () => {
        setInputFields([...inputFields, {id: degreesList[0]._id, status:'student',startYear:''} ]);
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

    const handleCourseChange = (indexCourses, e) =>{
        const value = [...courses];
        value[indexCourses][e.target.name] = e.target.value;
        setCourses(value);
        console.log(value);
    } 

    
    const handleCancel = () => {
        const values = [];
        setInputFields(values);
        setAdding(false)
    }


    const handleAddDegreeChange = (index, e) =>{
        const value = [...inputFields];
        value[index][e.target.name] = e.target.value;
        setInputFields(value);
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        const token = props.auth.token;
        const data = {
            degreeID: inputFields[0].id,
            startDate: inputFields[0].startYear,
            status:inputFields[0].status,
            id: id,
            courses: courses,
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
              "/qualification/add",
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
        getDegreesList()
      }, []);

    return (
     <>
   <div>
       Manage degrees
    <div>
       {degreeNames.map((degreeName,index) =>(
        <div class="input-group" key={index}>
            <h4>{degreeName.name}</h4>
         </div> 
))} 
</div>
        {inputFields.map((inputField,indexA) =>(
            <form onSubmit={handleSubmit} key={indexA}>
            <div class="input-group input-group-lg" >
            <div class="input-group mb-3">
                
                <select class="custom-select" name="id" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
                { degreesList.map((degreeList,indexDegree) =>(
           <option key={indexDegree} value={degreeList._id}>{degreeList.name}</option>           
        ))}        
        
                
                
  </select>
</div>
<div class="input-group mb-3">
                
                <select class="custom-select" name="status" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
           <option  value="student">Student</option>           
           <option  value="alumni">Alumni</option>    
                
                
  </select>
</div>
            <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">Start Year</span>
                </div>
            <input type="date" class="form-control" name="startYear" value ={inputField.startYear}onChange={e => handleAddDegreeChange(indexA, e)}  aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
            { courses.map((course,indexCourses) =>(
            <div class="input-group input-group-lg" key={indexCourses} >
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-lg">CourseName</span>
                </div>
            <input type="text" class="form-control" value={course.name} name="name" aria-label="Large" onChange={e => handleCourseChange(indexCourses, e)} aria-describedby="inputGroup-sizing-sm"></input>
            <button type="button" class="btn btn-primary btn-sm" onClick={() => handleRemoveCourses(indexCourses)}>Remove</button>
            </div>
         ))}
         <button type="button" class="btn btn-primary btn-sm" onClick={() => handleAddCourse()}>Add Course</button>
            <button className='form-input-btn' type='submit' >
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

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
  )(ManageDegrees);



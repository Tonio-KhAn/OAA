// Imported Modules
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// Imported CSS
import '../../App.css';
import '../css/CreateJobs.css';


function ManageDegrees(props) {
  const[ id , setId] = useState();
  
  function loadUser(){
    const token = props.auth.token;
    
    const config = {
      headers: {}
    };
    
    if(token) {
      config.headers["x-auth-token"] = token;
    }
    
    axios
      .get(
        "/users/user",
        config
      )
      .then(
        res => { 
          console.log('User degree page loaded.')
          setId(res.data._id);
          getDegrees(res.data._id);
        },
      )
      .catch(err => console.log(err));
  }
  
  const[ inputFields, setInputFields] = useState([])
  const[ degreeNames, setDegreeNames] = useState([])
  const[ courses, setCourses] = useState([])
  const[ degreesList, setDegreesList] = useState([])
  const[ gradesList, setGradesList] = useState([])
  const[ coursesList, setCoursesList] = useState([])
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
        res => {
          console.log('User qualifications loaded.')
          getMyDegreeNames(res.data);
        }
      )
      .catch(err => console.log(err));
  }
  
  function getMyDegreeNames(degreeFromCall){
    const token = props.auth.token;
    const temp = [];
    const config = {
      headers: {}
    };
    
    if(token) {
      config.headers["x-auth-token"] = token;
    }
    
    degreeFromCall.forEach(degreeHere => {
      axios
        .get(
          "/degreeName/"+ degreeHere.degreeID,
          config
        )
        .then(
          res => {
            temp.push(res.data)
          }
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
        res => {
          setDegreesList(res.data);
        }
      )
      .catch(err => console.log(err));
  }
  
  function getGradesList(){
    const token = props.auth.token;
    const config = {
      headers: {}
    };
    
    if(token) {
      config.headers["x-auth-token"] = token;
    }
    
    axios
      .get(
        "/grades/",
        config
      )
      .then(
        res => {
          setGradesList(res.data);
        }
      )
      .catch(err => console.log(err));
  }

  function getCoursesList(year){
    const token = props.auth.token;
    const config = {
      headers: {}
    };
    
    if(token) {
      config.headers["x-auth-token"] = token;
    }
  console.log(inputFields[0].startYear)
  console.log(year)
    axios
      .get(
        "/courseName/" + inputFields[0].id + "/" + year,
        config
      )
      .then(
        res => {
          console.log(res.data)
          setCoursesList(res.data);
        }
      )
      .catch(err => console.log(err));
  }
  
  const handleAdd = () => {
    setInputFields([...inputFields, {id: degreesList[0]._id, status:'student',startYear:''} ]);
    setAdding(true)
  }
  const handleAddCourse = () => {
    setCourses([...courses, {name:coursesList[0].courseTitle, grade:gradesList[0].grade} ]);
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
    if (e.target.name == 'startYear'){
      getCoursesList(e.target.value)
      setCourses([])
    }
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
        res => {
          console.log('Degree added.')
          alert('Degree added!')
          window.location.href = '/profile';
        }
      )
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    loadUser();
    getDegreesList();
    getGradesList();
  }, []);
  
  return (
    <div class= "page-back">
      <div class= "page">
        <div>
          <div className='alg'>
            {degreeNames.map((degreeName,index) =>(
            <div class="biglabel alg" key={index}>
              <h4>{degreeName.name}</h4>
            </div> 
            ))} 
          </div>
          <br></br>
          <div class="card">
            {inputFields.map((inputField,indexA) =>(
            <form onSubmit={handleSubmit} key={indexA}>
              <h5 className="biglabel">New Degree</h5>
              <div class="input-group input-group-lg" >
                <div class="input-group mb-3">
                  <select class="selector" name="id" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
                    { degreesList.map((degreeList,indexDegree) =>(
                    <option key={indexDegree} value={degreeList._id}>{degreeList.name}</option>
                    ))}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <select class="selector" name="status" id="" onChange={e => handleAddDegreeChange(indexA, e)}>
                    <option  value="student">Student</option>
                    <option  value="alumni">Alumni</option>
                  </select>
                </div>
                <div class="input-group-prepend">
                  <span class="btna" id="inputGroup-sizing-lg"><h5 className="generallabel">Year Started:</h5></span>
                </div>
                <input type="date" class="form-control" name="startYear" value ={inputField.startYear}onChange={e => handleAddDegreeChange(indexA, e)}  aria-label="Large" aria-describedby="inputGroup-sizing-sm"></input>
              </div>
              <br></br>
              { courses.map((course,indexCourses) =>(
              <div class="input-group input-group-lg" key={indexCourses} >
                <div class="input-group-prepend">
                  <span class="btnb" id="inputGroup-sizing-lg"><h5 className="generallabel">Course Name:</h5></span>
                </div>
                <select class="selector" name="name" id="" onChange={e => handleCourseChange(indexCourses, e)}>
                  { coursesList.map((courseList,indexCourse) =>(
                  <option key={indexCourse} value={courseList.courseTitle}>{courseList.courseTitle}</option>
                  ))}
                </select> 
                <br></br>
                <br></br>
                <select class="selector" name="grade" id="" onChange={e => handleCourseChange(indexCourses, e)}>
                  { gradesList.map((gradeList,indexGrades) =>(
                  <option key={indexGrades} value={gradeList.grade}>{gradeList.grade}</option>
                  ))}
                </select>
                <button type="button" class="btnnew" onClick={() => handleRemoveCourses(indexCourses)}>Remove</button>
              </div>
              ))}
              <br></br>
              { !inputField.startYear == '' ? (
              <div>
                <button type="button" class="btnnew" onClick={() => handleAddCourse()}>Add Course <i class="fas fa-plus"></i></button>
              </div>
              ):(
              <></>
              )}
              
              <button className='btnneww' type='submit' >ADD DEGREE<i class="fas fa-plus"></i>
              </button>
            </form>
            ))}
            <div class="container-contact200-form-btn">
              
              { !adding ? (
              <button class="btnneww"onClick={() => handleAdd()}>
                Add 
              </button>
              ):(
              <button class="btnneww"onClick={() => handleCancel()}>
                Cancel
              </button>
              )}
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});
  
export default connect(
  mapStateToProps,
)(ManageDegrees);



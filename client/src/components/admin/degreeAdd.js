import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function DegreeAdd({degree, setDegree, setSet}) {
    const[ coursesList, setCoursesList] = useState([])
    const[ courseValue, setCourseValue] = useState("no change")
    const[ courses, setCourses] = useState([])
    const[ degreeToAdd, setDegreeToAdd] = useState({
      name:"",
    })

    function getCoursesList(){
  
      const config = {
          headers: {}
        };
  
      axios
      .get(
        "/courseName/",
        config
      )
      .then(
        res => { console.log(res.data)
        setCoursesList(res.data);
        },
      )
      .catch(err => console.log(err));
  }

    const handleClick = () => {
        setSet(0);
     }

     const handleCourseAdd = () => {
       console.log(courseValue)
      if (courseValue === "no change"){
          setCourses([...courses, {id: coursesList[0]._id, courseCode: coursesList[0].courseCode} ]) 
      }else{
        coursesList.forEach(courseSingle => {
              if (courseValue === courseSingle._id){
                setCourses([...courses, {id: courseValue, courseCode: courseSingle.courseCode} ])
              }
          })
      
      }
  }

    const handleCourseChange = e => {
      setCourseValue(e.target.value);
  }
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        name: degreeToAdd.name,
        courses: courses,

      };
      console.log(data)
      axios
      .post(
        "/adminroute/degree/add",
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        },
      )
      .catch(err => console.log(err));
      }
      
      const handleSingleChange = e =>{
        setDegreeToAdd({
            ...degreeToAdd,
            [e.target.name]: e.target.value
          });
    }
      useEffect(() => {
        getCoursesList();
      }, []);
    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <button  onClick={e => handleClick()}> 
                        <h4>
                            Back Again
                        </h4>
                            </button>
                          
                            
      <form  class="test" onSubmit={handleSubmit}  >
          <div>
            <div class="input-group">
              <input
                type="text"
                class="input100"
                name="name"
                placeholder='Name'
                value={degreeToAdd.name}
                onChange={handleSingleChange}>
              </input>
            </div>
            {courses.map((course,index2) =>(
            <div key={index2}>
              <h5>{course.courseCode}</h5></div>
          ))}
          <select class="selector" name="name" id="" onChange={handleCourseChange}>
              { coursesList.map((courseList,indexCourse) =>(
                <option key={indexCourse} value={courseList._id}>{courseList.courseTitle}</option>           
                ))}  
          </select> 
          <div class="sel">
              <button class="btnnew" type="button" onClick={() => handleCourseAdd()}>Add Degree Courses</button>
            </div>
            </div> 
            <div class="wrap-contact100-form-btn">
                  <button className='btnnew' type='submit' >
                    Add
                  </button>
                  </div>
              </form>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DegreeAdd
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
     const handleCourseDelete = (index) => {
      const values = [...courses];
          values.splice(index, 1);
          setCourses(values);
  }

  const handleCourseChange2 = (index, e) =>{
    const value = [...courses];
    value[index][e.target.name] = e.target.value;
    setCourses(value);
  }
     const handleCourseAdd = () => {
       console.log(courseValue)
      if (courseValue === "no change"){
          setCourses([...courses, {id: coursesList[0]._id, courseCode: coursesList[0].courseCode, startYear:'',endYear:''} ]) 
      }else{
        coursesList.forEach(courseSingle => {
              if (courseValue === courseSingle._id){
                setCourses([...courses, {id: courseValue, courseCode: courseSingle.courseCode , startYear:'',endYear:''} ])
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
        res => { console.log("Degree added.")
          alert('Degree added.')
          window.location.href = '/admin/degree';
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
                          
                            
                        <form  class="page" onSubmit={handleSubmit}  >
          
            
          <div class="wrap-contact100-form-btn">
                  <button className='btnneww'  onClick={e => handleClick()}> 
                            Back Again
                            </button>
                            </div>
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
              <h5>{course.courseCode}</h5>
              <h6 className="generallabel">Start Period</h6>
              <input type="date" class="form-control" name="startYear" value ={course.startYear} onChange={e => handleCourseChange2(index2, e)}  ></input>
              <h6 className="generallabel">End Period</h6>
              <input type="date" class="form-control" name="endYear" value ={course.endYear} onChange={e => handleCourseChange2(index2, e)}></input>
              <button class="label1 theme-bg1 text-white f-12" type="button" onClick={() => handleCourseDelete(index2)}>delete <i class="fas fa-minus"></i></button></div>
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
                  <button className='btnneww' type='submit' >
                    Add Degree
                  </button>
              </form>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default DegreeAdd
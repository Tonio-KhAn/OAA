import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminDegreeEdit({degree, setDegree, setSet}) {
    const [degreeChange, setDegreeChange] = useState([]);
    const[ courses, setCourses] = useState([]);
    const[ coursesList, setCoursesList] = useState([]);
    const[ courseValue, setCourseValue] = useState("no change")

    const handleClick = (degreeId) => {
        setSet(1);
     }
     
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

     function loadDegrees(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/degree/" + degree._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setDegreeChange([res.data])
          setCourses(res.data.courses)
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...degreeChange];
      value[index][e.target.name] = e.target.value;
        setDegreeChange(value);
          console.log(degreeChange)
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        name: degreeChange[0].name,
        courses: courses,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/degreeUpdate/" + degree._id,
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        setDegree(res.data);
        },
      )
      .catch(err => console.log(err));
      }

      const handleCourseChange = e => {
        setCourseValue(e.target.value);
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
    useEffect(() => {
      loadDegrees();
      getCoursesList();
    }, []);

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            {degreeChange.map((value,index) =>(
                            
      <form key={index} class="page" onSubmit={handleSubmit}  >
          <div>
            
          <button className='btnneww' onClick={e => handleClick()}> 
                            Back Again
                            </button>
                <div class="input-group">
                <input
                    type="text"
                    class="input100 inp"
                    name="name"
                    placeholder='Name'
                    value={value.name}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>
           <div>
                            <h1 class='biglabel'>Courses</h1>
                            {courses.map((course,index2) =>(
                            <h5 class ='generallabel'key={index2}>{course.courseCode}</h5>
                            ))} 
                            </div>
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
                    Update
                  </button>
                  </div>
              </form>
              ))}  
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AdminDegreeEdit
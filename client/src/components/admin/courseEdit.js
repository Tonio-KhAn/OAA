import React,  { useState , useEffect }  from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function AdminCourseEdit({course, setCourse, setSet}) {
    const [courseChange, setCourseChange] = useState([]);
    

    const handleClick = (courseId) => {
        setSet(1);
     }

     function loadCourses(){
      
      const config = {
        headers: {}
      };
       
    
      axios
      .get(
        "/adminroute/course/" + course._id,
        config,
        
      )
      .then(
        res => { console.log(res.data)
          setCourseChange([res.data])
        },
      )
      .catch(err => console.log(err));
      }


     const handleSingleChange = (index, e) =>{
      const value = [...courseChange];
      value[index][e.target.name] = e.target.value;
        setCourseChange(value);
          console.log(courseChange)
    }

    const handleSubmit = e => {
      e.preventDefault();
      console.log("hello")

      const config = {
        headers: {}
      };
      
      const data = {
        courseCode: courseChange[0].courseCode,
        courseTitle: courseChange[0].courseTitle,
        courses: courseChange[0].courses,
      };
      console.log(data)
      axios
      .put(
        "/adminroute/courseUpdate/" + course._id,
        data,
        config
      )

      .then(
        res => { console.log(res.data)
        setCourse(res.data);
        },
      )
      .catch(err => console.log(err));
      }

     
    useEffect(() => {
      loadCourses();
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
                            {courseChange.map((value,index) =>(
                            
      <form key={index} class="page" onSubmit={handleSubmit}  >
          <div>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="courseCode"
                    placeholder='Course Code'
                    value={value.courseCode}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
                </div>
                <div class="input-group">
                <input
                    type="text"
                    class="input100"
                    name="courseTitle"
                    placeholder='Course Title'
                    value={value.courseTitle}
                    onChange={e => handleSingleChange(index, e)}>
                </input>
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

export default AdminCourseEdit
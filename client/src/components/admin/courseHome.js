import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function CourseHome({setCourse, setSet}) {
    const [values, setValues] = useState([]);

    function loadCourses(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/course/",
          config
        )
        .then(
          res => { console.log(res.data)
          setValues(res.data);
          },
        )
        .catch(err => console.log(err));
        }

        const handleClick = (value) => {
           setCourse(value);
           setSet(1);
        }

        useEffect(() => {
            loadCourses();
          }, []);
    return (
     <>
            <div >
                <ul>
                {values.map((value,index) =>(
                    <li key={index} value={value._id}>
                        <div class="card">
                            <button onClick={e => handleClick(value)}> 
                        <h1 class='biglabel'>
                            {value.courseTitle}
                        </h1>
                        <h4 class='generallabel'>
                        {value.courseCode}
                        </h4>
                            </button>
                        </div>
                    </li>
                ))}       
                </ul>
            </div>
        </>
    )
}

export default CourseHome
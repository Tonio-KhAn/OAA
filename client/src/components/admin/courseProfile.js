import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function CourseProfile({course, setSet, setCourse}) {
    const handleClick = () => {
        setCourse([]);
        setSet(0);
     }

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <button  onClick={e => handleClick()}> 
                        <h4>
                            Back
                        </h4>
                        
                            </button>
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Title</h1>
                            <h3>{course.courseTitle}</h3>
                            </div>
                            <div>
                            <h1>Course</h1>
                            <h3>{course.courseCode}</h3>
                            </div>
                            <div>
                            <h1>Skills</h1>
                            {course.skills.map((value,index) =>(
                            <h3 key={index}>{value.name}</h3>
                            ))} 
                            </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CourseProfile
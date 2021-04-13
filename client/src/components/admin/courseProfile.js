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
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Title:</h1>
                            <h3 class='generallabel'>{course.courseTitle}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Course:</h1>
                            <h3 class='generallabel'>{course.courseCode}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Skills:</h1>
                            {course.skills.map((value,index) =>(
                            <h3 class='generallabel' key={index}>{value.name}</h3>
                            ))} 
                            </div>
                            
                            <button className="btnneww" onClick={e => handleClick()}> 
                            Back
                        
                            </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CourseProfile
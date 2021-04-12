import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function DegreeProfile({degree, setSet, setDegree}) {
    const handleClick = () => {
        
        setDegree([]);
        setSet(0);
     }
     useEffect(() => {
      }, []);
      
    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Title</h1>
                            <h3  class='generallabel'>{degree.name}</h3>
                            </div>
                            
                            <div>
                            <h1 class='biglabel'>Courses</h1>
                            {degree.courses.map((value,index) =>(
                            <h3  class='generallabel' key={index}>{value.courseCode}</h3>
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

export default DegreeProfile
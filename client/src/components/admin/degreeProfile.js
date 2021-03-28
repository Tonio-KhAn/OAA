import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function DegreeProfile({degree, setSet, setDegree}) {
    const handleClick = () => {
        setDegree([]);
        setSet(0);
     }

    return (
     <>
            <div >
                <ul>
                    <li value="100">
                        <div class="card">
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Title</h1>
                            <h3>{degree.name}</h3>
                            </div>
                            
                            <div>
                            <h1>Courses</h1>
                            {degree.courses.map((value,index) =>(
                            <h3 key={index}>{value.name}</h3>
                            ))} 
                            </div>
                            
                            <button className="adminbackbtn" onClick={e => handleClick()}> 
                        <h4>
                            Back
                        </h4>
                        
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
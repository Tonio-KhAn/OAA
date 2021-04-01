import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function GradeProfile({grade, setSet, setGrade}) {
    const handleClick = () => {
        setGrade([]);
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
                            <h1>Grade</h1>
                            <h3>{grade.grade}</h3>
                            </div>
                            <div>
                            <h1>Amount</h1>
                            <h3>{grade.amount}</h3>
                            </div>
                            <button className="adminbackbtn"   onClick={e => handleClick()}> 
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

export default GradeProfile
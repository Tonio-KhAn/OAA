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
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Grade</h1>
                            <h3  class='generallabel'>{grade.grade}</h3>
                            </div>
                            <div>
                            <h1>Amount</h1>
                            <h3  class='generallabel'>{grade.amount}</h3>
                            </div>
                            <button className="adminbackbtn"   onClick={e => handleClick()}> 
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

export default GradeProfile
import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';

function JobProfile({job, setSet, setJob}) {
    const handleClick = () => {
        setJob([]);
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
                            <h3>{job.title}</h3>
                            </div>
                            <div>
                            <h1>Job</h1>
                            <h3>{job.title}</h3>
                            </div>
                          
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default JobProfile
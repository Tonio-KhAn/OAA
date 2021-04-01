import React from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import '../css/CreateJobs.css';

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
                            <div class="card" style={{ margin : "auto"}}>
                            <div>
                            <h1>Title</h1>
                            <h3>{job.title}</h3>
                            </div>
                            <div>
                            <h1>Company</h1>
                            <h3>{job.company}</h3>
                            </div>
                            <div>
                            <h1>Description</h1>
                            <h3>{job.description}</h3>
                            </div>
                            
                            <button className="adminbackbtn" onClick={e => handleClick()}> 
                        <h5>
                            Back
                        </h5>
                        
                            </button>
                          
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default JobProfile
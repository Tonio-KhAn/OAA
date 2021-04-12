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
                            <div class="page" style={{ margin : "auto"}}>
                            <div>
                            <h1 class='biglabel'>Title</h1>
                            <h3  class='generallabel'>{job.title}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Company</h1>
                            <h3  class='generallabel'>{job.company}</h3>
                            </div>
                            <div>
                            <h1 class='biglabel'>Description</h1>
                            <h3  class='generallabel'>{job.description}</h3>
                            </div>
                            
                            <button className="btnneww" onClick={e => handleClick()}> 
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
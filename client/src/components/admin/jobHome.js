import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function JobHome({setJob, setSet}) {
    const [values, setValues] = useState([]);

    function loadJobs(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/job/",
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
           setJob(value);
           setSet(1);
        }

        useEffect(() => {
            loadJobs();
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
                            {value.title}
                        </h1>
                            </button>
                        </div>
                    </li>
                ))}       
                </ul>
            </div>
        </>
    )
}

export default JobHome
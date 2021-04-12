import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function DegreeHome({setDegree, setSet}) {
    const [values, setValues] = useState([]);

    function loadDegrees(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/degree/",
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
           setDegree(value);
           setSet(1);
        }

        useEffect(() => {
            loadDegrees();
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
                            {value.name}
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

export default DegreeHome
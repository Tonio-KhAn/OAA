import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function GradeHome({setGrade, setSet}) {
    const [values, setValues] = useState([]);

    function loadGrades(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/grade/",
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
           setGrade(value);
           setSet(1);
        }

        useEffect(() => {
            loadGrades();
          }, []);
    return (
     <>
            <div >
                <ul>
                {values.map((value,index) =>(
                    <li key={index} value={value._id}>
                        <div class="card">
                            <button onClick={e => handleClick(value)}> 
                        <h1>
                            {value.grade}
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

export default GradeHome
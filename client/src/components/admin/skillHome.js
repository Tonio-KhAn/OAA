import React, { useState , useEffect } from 'react';
import {Link } from 'react-router-dom';
import '../../App.css';
import './adminCss.css';
import axios from "axios";

function SkillHome({setSkill, setSet}) {
    const [values, setValues] = useState([]);

    function loadSkills(){
      
        const config = {
          headers: {}
        };
      
      
        axios
        .get(
          "/adminroute/skill/",
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
           setSkill(value);
           setSet(1);
        }

        useEffect(() => {
            loadSkills();
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

export default SkillHome